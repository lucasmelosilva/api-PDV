import { HttpRequest } from '../../protocols/http-request-protocol'
import { Validation } from '../../protocols/validation-protocol'

import { UpdateProductController } from './update-product-controller'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: UpdateProductController
  validationStub: Validation
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const sut = new UpdateProductController(validationStub)
  return {
    sut,
    validationStub
  }
}

function makeFakeHttpRequest (): HttpRequest {
  return {
    body: {
      id: 'any_id',
      name: 'any_name',
      barCode: 'any_bar_code',
      imageUrl: 'any_image_url',
      price: 1.99
    }
  }
}

describe('UpdateProductController', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })
})
