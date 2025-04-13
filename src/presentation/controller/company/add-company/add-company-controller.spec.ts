import { HttpRequest } from '../../../protocols/http-request-protocol'
import { Validation } from '../../../protocols/validation-protocol'
import { AddCompany, AddCompanyModel } from '../../../../domain/usecase/company/add-company'
import { CompanyModel } from '../../../../domain/models/company-model'

import { AddCompanyController } from './add-company-controller'
import { conflict } from '../../../helper/http/conflict'
import { ok } from '../../../helper/http/ok'
import { serverError } from '../../../helper/http/server-error'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

function makeAddCompanyStub (): AddCompany {
  class AddCompanyStub implements AddCompany {
    async add (addCompanyModel: AddCompanyModel): Promise<CompanyModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        cnpj: 'any_cnpj'
      }))
    }
  }
  return new AddCompanyStub()
}

interface SutTypes {
  sut: AddCompanyController
  validationStub: Validation
  addCompanyStub: AddCompany
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const addCompanyStub = makeAddCompanyStub()
  const sut = new AddCompanyController(validationStub, addCompanyStub)
  return {
    sut,
    validationStub,
    addCompanyStub
  }
}

function makeFakeHttpRequest (): HttpRequest {
  return {
    body: {
      name: 'any_name',
      cnpj: 'any_cnpj'
    }
  }
}

describe('AddCompanyController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith({ ...request.body })
  })

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any error'))
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual({
      status: 400,
      body: new Error('any error')
    })
  })

  it('should call AddCompany with correct values', async () => {
    const { sut, addCompanyStub } = makeSut()
    const addSpy = jest.spyOn(addCompanyStub, 'add')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({ ...request.body })
  })

  it('should return 409 if AddCompany returns null', async () => {
    const { sut, addCompanyStub } = makeSut()
    jest.spyOn(addCompanyStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null as any)))
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(conflict())
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(ok({
      id: 'any_id',
      name: 'any_name',
      cnpj: 'any_cnpj'
    }))
  })

  it('should return 500 if AddCompany throws', async () => {
    const { sut, addCompanyStub } = makeSut()
    jest.spyOn(addCompanyStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error('any_error')))
    )
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
