import { EmployerModel } from '../../../../domain/models/employer-model'
import { AuthenticationParams } from '../../../../domain/usecase/employer/authentication'
import { LoadEmployerByEmployerIdRepository } from '../../../protocol/employer/load-employer-by-employer-id-repository'

import { DbAuthentication } from './db-authentication'

function makeLoadEmployerByEmployerIdRepository (): LoadEmployerByEmployerIdRepository {
  class LoadEmployerByEmployerIdRepositoryStub implements LoadEmployerByEmployerIdRepository {
    async loadByEmployerId (employerId: string): Promise<EmployerModel> {
      return new Promise(resolve => resolve({
        companyId: 'any_company_id',
        employerId: 'dasdweqjojo1qew',
        id: 'any_id',
        name: 'any_name',
        password: 'any_password'
      }))
    }
  }

  return new LoadEmployerByEmployerIdRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadEmployerByEmployerIdRepositoryStub: LoadEmployerByEmployerIdRepository
}

function makeSut (): SutTypes {
  const loadEmployerByEmployerIdRepositoryStub = makeLoadEmployerByEmployerIdRepository()
  const sut = new DbAuthentication(loadEmployerByEmployerIdRepositoryStub)

  return {
    sut,
    loadEmployerByEmployerIdRepositoryStub
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
})
