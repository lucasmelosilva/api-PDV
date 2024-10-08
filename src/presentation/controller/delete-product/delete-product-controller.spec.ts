import { HttpRequest } from '../../protocols/http-request-protocol'
import { DeleteProduct } from '../../../domain/usecase/delete-product'

import { serverError } from '../../helper/http/server-error'
import { ok } from '../../helper/http/ok'

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

  it('should return 500 if DeleteProduct throws', async () => {
    const { sut, deleteProductStub } = makeSut()
    jest.spyOn(deleteProductStub, 'delete').mockImplementationOnce(async () => {
      throw new Error()
    })
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(ok('tudo certo'))
  })
})
