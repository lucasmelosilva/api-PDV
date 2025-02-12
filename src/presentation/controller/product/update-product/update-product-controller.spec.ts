import { badRequest } from '../../../helper/http/bad-request'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { Validation } from '../../../protocols/validation-protocol'

import { UpdateProductController } from './update-product-controller'
import { UpdateProduct, UpdateProductModel } from '../../../../domain/usecase/product/update-product'
import { ProductModel } from '../../../../domain/models/product-model'
import { ok } from '../../../helper/http/ok'

function makeValidationStub (): Validation {
  class ValidationStub implements Validation {
    validate (value: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

function makeUpdateProductStub (): UpdateProduct {
  class UpdateProductStub implements UpdateProduct {
    async update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        name: 'updated_name',
        barCode: 'any_bar_code',
        imageUrl: 'any_image_url',
        price: 1.99
      }))
    }
  }

  return new UpdateProductStub()
}

interface SutTypes {
  sut: UpdateProductController
  validationStub: Validation
  updateProductStub: UpdateProduct
}

function makeSut (): SutTypes {
  const validationStub = makeValidationStub()
  const updateProductStub = makeUpdateProductStub()
  const sut = new UpdateProductController(validationStub, updateProductStub)
  return {
    sut,
    validationStub,
    updateProductStub
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

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const err = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(err)
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(badRequest(err))
  })

  it('should call UpdateProduct with correct values', async () => {
    const { sut, updateProductStub } = makeSut()
    const updateSpy = jest.spyOn(updateProductStub, 'update')
    const request = makeFakeHttpRequest()
    await sut.handle(request)
    const { id, ...product } = request.body
    expect(updateSpy).toHaveBeenCalledWith(id, product)
  })

  it('should return updated product on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(ok({
      id: 'any_id',
      name: 'updated_name',
      barCode: 'any_bar_code',
      imageUrl: 'any_image_url',
      price: 1.99
    }))
  })
})
