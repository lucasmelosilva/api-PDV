import { Validation } from '../../../protocols/validation-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import {
  AddEmployer,
  AddEmployerModel
} from '../../../../domain/usecase/employer/add-employer'

import { badRequest } from '../../../helper/http/bad-request'
import { ok } from '../../../helper/http/ok'

import { SignUpEmployerController } from './signup-employer-controller'
import { EmployerModel } from '../../../../domain/models/employer-model'
import { ServerError } from '../../../errors/server-error'
import { serverError } from '../../../helper/http/server-error'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

function makeAddEmployerStub (): AddEmployer {
  class AddEmployerStub implements AddEmployer {
    async add (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        companyId: 'any_company_id',
        employerId: 'any_employer_id',
        name: 'any_name',
        password: 'any_password'
      }))
    }
  }

  return new AddEmployerStub()
}

interface SutTypes {
  sut: SignUpEmployerController
  validationStub: Validation
  addEmployerStub: AddEmployer
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const addEmployerStub = makeAddEmployerStub()
  const sut = new SignUpEmployerController(validationStub, addEmployerStub)
  return {
    sut,
    validationStub,
    addEmployerStub
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

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const error = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(badRequest(error))
  })

  it('should call AddEmployer with correct values', async () => {
    const { sut, addEmployerStub } = makeSut()
    const addSpy = jest.spyOn(addEmployerStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      password: 'any_password',
      employerId: 'any_employer_id',
      companyId: 'any_company_id'
    })
  })

  it('should return 200 if AddEmployer success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok({
      id: 'any_id',
      companyId: 'any_company_id',
      employerId: 'any_employer_id',
      name: 'any_name',
      password: 'any_password'
    }))
  })

  it('should return 500 if AddEmployer throws', async () => {
    const { sut, addEmployerStub } = makeSut()
    jest.spyOn(addEmployerStub, 'add').mockImplementationOnce(
      () => {
        throw new ServerError('any-stack')
      }
    )
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError(new ServerError('any-stack')))
  })
})
