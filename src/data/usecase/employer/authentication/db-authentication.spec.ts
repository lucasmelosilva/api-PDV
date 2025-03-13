import { EmployerModel } from '../../../../domain/models/employer-model'
import { AuthenticationParams } from '../../../../domain/usecase/employer/authentication'
import { LoadEmployerByEmployerIdRepository } from '../../../protocol/employer/load-employer-by-employer-id-repository'
import { HashComparer } from '../../../protocol/cryptography/hash-comparer'

import { DbAuthentication } from './db-authentication'

function makeHashComparer (): HashComparer {
  class HashComparerStub implements HashComparer {
    async compare (plaitext: string, digest: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
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
}

function makeSut (): SutTypes {
  const loadEmployerByEmployerIdRepositoryStub = makeLoadEmployerByEmployerIdRepository()
  const hashComparerStub = makeHashComparer()
  const sut = new DbAuthentication(loadEmployerByEmployerIdRepositoryStub, hashComparerStub)

  return {
    sut,
    loadEmployerByEmployerIdRepositoryStub,
    hashComparerStub
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
})
