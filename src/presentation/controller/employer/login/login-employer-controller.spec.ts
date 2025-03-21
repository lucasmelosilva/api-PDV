import { HttpRequest } from '../../../protocols/http-request-protocol'
import { Validation } from '../../../protocols/validation-protocol'

import { LoginEmployerController } from './login-employer-controller'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: LoginEmployerController
  validationStub: Validation
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const sut = new LoginEmployerController(validationStub)
  return {
    sut,
    validationStub
  }
}

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      employerId: 'any_employer_id',
      password: 'any_password'
    }
  }
}

describe('LoginEmployerController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })
})
