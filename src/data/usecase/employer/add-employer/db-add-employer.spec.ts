import { EmployerModel } from '../../../../domain/models/employer-model'
import { AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { AddEmployerRepository } from '../../../protocol/employer/add-employer-repository'
import { DbAddEmployer } from './db-add-employer'

function makeAddEmployerRepositoryStub (): AddEmployerRepository {
  class AddEmployerRepositoryStub implements AddEmployerRepository {
    async addEmployer (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'any_password',
        employerId: 'any_employer_id'
      }))
    }
  }

  return new AddEmployerRepositoryStub()
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
  sut: DbAddEmployer
}

function makeSut (): SutTypes {
  const addEmployerRepositoryStub = makeAddEmployerRepositoryStub()
  const sut = new DbAddEmployer(addEmployerRepositoryStub)

  return {
    addEmployerRepositoryStub,
    sut
  }
}

describe('DbAddEmployer', () => {
  it('should call AddEmployerRepository with correct values', async () => {
    const { sut, addEmployerRepositoryStub } = makeSut()
    const addEmployerSpy = jest.spyOn(addEmployerRepositoryStub, 'addEmployer')
    const fakeEmployer = makeFakeEmployer()
    await sut.add(fakeEmployer)
    expect(addEmployerSpy).toHaveBeenCalledWith(fakeEmployer)
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
      password: 'any_password',
      employerId: 'any_employer_id'
    })
  })
})
