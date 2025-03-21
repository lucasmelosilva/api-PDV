import { badRequest } from '../../../helper/http/bad-request'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { Validation } from '../../../protocols/validation-protocol'

import {
  Authentication,
  AuthenticationParams,
  AuthenticationResult
} from '../../../../domain/usecase/employer/authentication'

import { LoginEmployerController } from './login-employer-controller'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

function makeAuthenticationStub (): Authentication {
  class AuthenticationStub implements Authentication {
    async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
      return new Promise(resolve => resolve({
        accessToken: 'any_token',
        companyId: 'any_company_id',
        name: 'any_name'
      }))
    }
  }
  return new AuthenticationStub()
}

interface SutTypes {
  sut: LoginEmployerController
  validationStub: Validation
  authenticationStub: Authentication
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginEmployerController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
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

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(badRequest(error))
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(authSpy).toHaveBeenCalledWith(request.body)
  })
})
