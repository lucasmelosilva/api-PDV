import { EmployerModel } from '../../../../domain/models/employer-model'
import { AuthenticationParams } from '../../../../domain/usecase/employer/authentication'
import { LoadEmployerByEmployerIdRepository } from '../../../protocol/employer/load-employer-by-employer-id-repository'
import { UpdateEmployerAccessTokenRepository } from '../../../protocol/employer/update-employer-access-token-repository'
import { HashComparer } from '../../../protocol/cryptography/hash-comparer'
import { Encrypter } from '../../../protocol/cryptography/encrypter'

import { DbAuthentication } from './db-authentication'

function makeHashComparer (): HashComparer {
  class HashComparerStub implements HashComparer {
    async compare (plaitext: string, digest: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

function makeUpdateEmployerAccessTokenRepository (): UpdateEmployerAccessTokenRepository {
  class UpdateEmployerAccessTokenRepositoryStub implements UpdateEmployerAccessTokenRepository {
    async updateAccessToken (id: any, accessToken: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UpdateEmployerAccessTokenRepositoryStub()
}

function makeEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (plaintext: string): Promise<string> {
      return new Promise(resolve => resolve('encrypted_value'))
    }
  }
  return new EncrypterStub()
}

function makeLoadEmployerByEmployerIdRepository (): LoadEmployerByEmployerIdRepository {
  class LoadEmployerByEmployerIdRepositoryStub implements LoadEmployerByEmployerIdRepository {
    async loadByEmployerId (employerId: string): Promise<EmployerModel> {
      return new Promise(resolve => resolve({
        companyId: 'any_company_id',
        employerId: 'dasdweqjojo1qew',
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password'
      }))
    }
  }

  return new LoadEmployerByEmployerIdRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadEmployerByEmployerIdRepositoryStub: LoadEmployerByEmployerIdRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateEmployerAccessTokenRepositoryStub: UpdateEmployerAccessTokenRepository
}

function makeSut (): SutTypes {
  const loadEmployerByEmployerIdRepositoryStub = makeLoadEmployerByEmployerIdRepository()
  const hashComparerStub = makeHashComparer()
  const encrypterStub = makeEncrypter()
  const updateEmployerAccessTokenRepositoryStub = makeUpdateEmployerAccessTokenRepository()
  const sut = new DbAuthentication(
    loadEmployerByEmployerIdRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateEmployerAccessTokenRepositoryStub
  )

  return {
    sut,
    loadEmployerByEmployerIdRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateEmployerAccessTokenRepositoryStub
  }
}

function makeFakeAuth (): AuthenticationParams {
  return {
    employerId: 'any_employer_id',
    password: 'any_password'
  }
}

describe('DbAuthentication', () => {
  it('should call LoadEmployerByEmployerIdRepository with correct values', async () => {
    const { sut, loadEmployerByEmployerIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadEmployerByEmployerIdRepositoryStub, 'loadByEmployerId')
    const authParams = makeFakeAuth()
    await sut.auth(authParams)
    expect(loadSpy).toHaveBeenCalledWith(authParams.employerId)
  })

  it('should return null if LoadEmployerByEmployerIdRepository fails', async () => {
    const { sut, loadEmployerByEmployerIdRepositoryStub } = makeSut()
    jest.spyOn(loadEmployerByEmployerIdRepositoryStub, 'loadByEmployerId')
      .mockReturnValueOnce(new Promise(resolve => resolve(null as any)))
    const result = await sut.auth(makeFakeAuth())
    expect(result).toBeNull()
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const authParams = makeFakeAuth()
    await sut.auth(authParams)
    expect(compareSpy).toHaveBeenCalledWith(authParams.password, 'hashed_password')
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const result = await sut.auth(makeFakeAuth())
    expect(result).toBeNull()
  })

  it('should call Encrypt if HashComparer succeeds', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const authParams = makeFakeAuth()
    await sut.auth(authParams)
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  it('should call UpdateEmployerAccessToken if Encrypter succeeds', async () => {
    const { sut, updateEmployerAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateEmployerAccessTokenRepositoryStub, 'updateAccessToken')
    const authParams = makeFakeAuth()
    await sut.auth(authParams)
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'encrypted_value')
  })
})
