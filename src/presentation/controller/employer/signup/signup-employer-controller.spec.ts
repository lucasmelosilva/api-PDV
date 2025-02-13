import { Validation } from '../../../protocols/validation-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'

import { SignUpEmployerController } from './signup-employer-controller'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: SignUpEmployerController
  validationStub: Validation
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const sut = new SignUpEmployerController(validationStub)
  return {
    sut,
    validationStub
  }
}

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      name: 'any_name',
      password: 'any_password',
      passwordToConfirm: 'any_password',
      employerId: 'any_employer_id',
      companyId: 'any_company_id'
    }
  }
}

describe('SignUpEmployerController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })
})
