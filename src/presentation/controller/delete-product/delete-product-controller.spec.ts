import { HttpRequest } from '../../protocols/http-request-protocol'
import { DeleteProduct } from '../../../domain/usecase/delete-product'

import { DeleteProductController } from './delete-product-controller'

function makeFakeRequest (): HttpRequest {
  return {
    body: {},
    params: {
      barcode: 'any_bar_code'
    }
  }
}

function makeDeleteProductStub (): DeleteProduct {
  class DeleteProductStub implements DeleteProduct {
    async delete (barcode: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new DeleteProductStub()
}

interface SutTypes {
  sut: DeleteProductController
  deleteProductStub: DeleteProduct
}

function makeSut (): SutTypes {
  const deleteProductStub = makeDeleteProductStub()
  const sut = new DeleteProductController(deleteProductStub)

  return {
    sut,
    deleteProductStub
  }
}

describe('DeleteProduct Controller', () => {
  it('should call DeleteProduct with correct value', async () => {
    const { sut, deleteProductStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProductStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith('any_bar_code')
  })
})
