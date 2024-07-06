import { HttpRequest } from '../../protocols/http-request-protocol'
import { Validation } from '../../protocols/validation-protocol'

import { ProductCreateController } from './product-create-controller'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

function makeFakeHttpRequest (): HttpRequest {
  return {
    body: {
      id: 'any_id',
      name: 'any_name',
      barCode: 'any_bar_code',
      imageUrl: 'any_image_url',
      price: 12.30
    }
  }
}

interface SutTypes {
  sut: ProductCreateController
  validationStub: Validation
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const sut = new ProductCreateController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('ProductCreate Controller', () => {
  it('should call Validation with correct parameters', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
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
})
