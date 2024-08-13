import { HttpRequest } from '../../protocols/http-request-protocol'
import { LoadProduct } from '../../../domain/usecase/load-product'
import { ProductModel } from '../../../domain/models/product-model'
import { LoadProductController } from './load-product-controller'

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
})
