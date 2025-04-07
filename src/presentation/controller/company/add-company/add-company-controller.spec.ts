import { HttpRequest } from '../../../protocols/http-request-protocol'
import { Validation } from '../../../protocols/validation-protocol'

import { AddCompanyController } from './add-company-controller'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: AddCompanyController
  validationStub: Validation
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const sut = new AddCompanyController(validationStub)
  return {
    sut,
    validationStub
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
})
