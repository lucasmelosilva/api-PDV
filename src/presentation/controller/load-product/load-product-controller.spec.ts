import { HttpRequest } from '../../protocols/http-request-protocol'
import { LoadProduct } from '../../../domain/usecase/load-product'
import { ProductModel } from '../../../domain/models/product-model'
import { LoadProductController } from './load-product-controller'
import { notFound } from '../../helper/http/not-found'
import { ok } from '../../helper/http/ok'
import { ServerError } from '../../errors/server-error'
import { serverError } from '../../helper/http/server-error'

function makeLoadProductStub (): LoadProduct {
  class LoadProductStub implements LoadProduct {
    async load (barCode: string): Promise<ProductModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        barCode: 'any_bar_code',
        imageUrl: 'any_image_url',
        price: 1.99
      }))
    }
  }

  return new LoadProductStub()
}

interface SutTypes {
  sut: LoadProductController
  loadProductStub: LoadProduct
}

function makeSut (): SutTypes {
  const loadProductStub = makeLoadProductStub()
  const sut = new LoadProductController(loadProductStub)
  return {
    sut,
    loadProductStub
  }
}

function mockFakeRequest (): HttpRequest {
  return {
    body: {
      barCode: 'any_bar_code'
    }
  }
}

describe('LoadProductController', () => {
  it('should call LoadProduct with correct values', async () => {
    const { sut, loadProductStub } = makeSut()
    const loadSpy = jest.spyOn(loadProductStub, 'load')
    const request = mockFakeRequest()
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith(request.body.barCode)
  })

  it('should return 404 if LoadProduct not found', async () => {
    const { sut, loadProductStub } = makeSut()
    jest.spyOn(loadProductStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(notFound('any_bar_code'))
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name',
      barCode: 'any_bar_code',
      imageUrl: 'any_image_url',
      price: 1.99
    }))
  })

  it('should return 500 if any AddProduct throws', async () => {
    const { sut, loadProductStub } = makeSut()
    jest.spyOn(loadProductStub, 'load').mockImplementationOnce(() => {
      throw new ServerError('any-stack')
    })
    const response = await sut.handle(mockFakeRequest())
    expect(response).toEqual(serverError(new ServerError('any-stack')))
  })
})
