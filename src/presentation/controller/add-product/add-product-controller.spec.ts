import { HttpRequest } from '../../protocols/http-request-protocol'
import { AddProduct, AddProductModel } from '../../../domain/usecase/add-product'
import { Validation } from '../../protocols/validation-protocol'

import { AddProductController } from './add-product-controller'
import { ProductModel } from '../../../domain/models/product-model'
import { serverError } from '../../helper/http/server-error'
import { ServerError } from '../../errors/server-error'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

function makeAddProductStub (): AddProduct {
  class AddProductStub implements AddProduct {
    async add (addProductModel: AddProductModel): Promise<ProductModel> {
      return await new Promise(resolve => resolve({
        id: 'any-id',
        name: 'any-name',
        barCode: 'any-bar-code',
        imageUrl: 'any-image-url',
        price: 23.1
      }))
    }
  }

  return new AddProductStub()
}

function makeFakeHttpRequest (): HttpRequest {
  return {
    body: {
      name: 'any_name',
      barCode: 'any_bar_code',
      imageUrl: 'any_image_url',
      price: 12.30
    }
  }
}

interface SutTypes {
  sut: AddProductController
  validationStub: Validation
  addProductStub: AddProduct
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const addProductStub = makeAddProductStub()
  const sut = new AddProductController(validationStub, addProductStub)
  return {
    sut,
    validationStub,
    addProductStub
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

  it('should call AddProduct with correct parameters', async () => {
    const { sut, addProductStub } = makeSut()
    const addSpy = jest.spyOn(addProductStub, 'add')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith(request.body)
  })

  it('should return 200 when AddProduct success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual({
      status: 200,
      body: {
        id: 'any-id',
        name: 'any-name',
        barCode: 'any-bar-code',
        imageUrl: 'any-image-url',
        price: 23.1
      }
    })
  })

  it('should return 500 if any AddProduct throws', async () => {
    const { sut, addProductStub } = makeSut()
    jest.spyOn(addProductStub, 'add').mockImplementationOnce(() => {
      throw new ServerError('any-stack')
    })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(serverError(new ServerError('any-stack')))
  })
})
