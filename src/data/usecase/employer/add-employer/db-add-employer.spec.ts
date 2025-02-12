import { EmployerModel } from '../../../../domain/models/employer-model'
import { AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { AddEmployerRepository } from '../../../protocol/employer/add-employer-repository'
import { DbAddEmployer } from './db-add-employer'
import { Hasher } from '../../../protocol/cryptography/hasher'

function makeAddEmployerRepositoryStub (): AddEmployerRepository {
  class AddEmployerRepositoryStub implements AddEmployerRepository {
    async addEmployer (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password',
        employerId: 'any_employer_id'
      }))
    }
  }

  return new AddEmployerRepositoryStub()
}

function makeHasherStub (): Hasher {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

function makeFakeEmployer (): AddEmployerModel {
  return {
    name: 'any_name',
    password: 'any_password',
    employerId: 'any_employer_id'
  }
}

interface SutTypes {
  addEmployerRepositoryStub: AddEmployerRepository
  hasherStub: Hasher
  sut: DbAddEmployer
}

function makeSut (): SutTypes {
  const addEmployerRepositoryStub = makeAddEmployerRepositoryStub()
  const hasherStub = makeHasherStub()
  const sut = new DbAddEmployer(hasherStub, addEmployerRepositoryStub)

  return {
    addEmployerRepositoryStub,
    hasherStub,
    sut
  }
}

describe('DbAddEmployer', () => {
  it('should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const fakeEmployer = makeFakeEmployer()
    await sut.add(fakeEmployer)
    expect(hashSpy).toHaveBeenCalledWith(fakeEmployer.password)
  })

  it('should call AddEmployerRepository with correct values', async () => {
    const { sut, addEmployerRepositoryStub } = makeSut()
    const addEmployerSpy = jest.spyOn(addEmployerRepositoryStub, 'addEmployer')
    const fakeEmployer = makeFakeEmployer()
    await sut.add(fakeEmployer)
    expect(addEmployerSpy).toHaveBeenCalledWith({ ...fakeEmployer, password: 'hashed_password' })
  })

  it('should return null if AddEmployerRepository returns null', async () => {
    const { sut, addEmployerRepositoryStub } = makeSut()
    jest.spyOn(addEmployerRepositoryStub, 'addEmployer').mockReturnValueOnce(
      new Promise(resolve => resolve(null as unknown as EmployerModel))
    )
    const result = await sut.add(makeFakeEmployer())
    expect(result).toBeNull()
  })

  it('should return an employer when AddEmployerRepository success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(makeFakeEmployer())
    expect(result).toEqual({
      id: 'any_id',
      name: 'any_name',
      password: 'hashed_password',
      employerId: 'any_employer_id'
    })
  })

  it('should throw if AddEmployerRepository throws', async () => {
    const { sut, addEmployerRepositoryStub } = makeSut()
    jest.spyOn(addEmployerRepositoryStub, 'addEmployer').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.add(makeFakeEmployer())
    await expect(promise).rejects.toThrow()
  })
})
