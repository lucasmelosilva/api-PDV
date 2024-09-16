import { DeleteProductRepository } from '../protocol/delete-product-repository'
import { DbDeleteProduct } from './db-delete-product'

function makeDeleteProductRepositoryStub (): DeleteProductRepository {
  class DeleteProductRepositoryStub implements DeleteProductRepository {
    async delete (barcode: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new DeleteProductRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteProduct
  deleteProductRepositoryStub: DeleteProductRepository
}

function makeSut (): SutTypes {
  const deleteProductRepositoryStub = makeDeleteProductRepositoryStub()
  const sut = new DbDeleteProduct(deleteProductRepositoryStub)
  return {
    sut,
    deleteProductRepositoryStub
  }
}

describe('DbDeleteProduct', () => {
  it('should call DeleteProductRepository with correct values', async () => {
    const { sut, deleteProductRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteProductRepositoryStub, 'delete')
    await sut.delete('any_bar_code')
    expect(deleteSpy).toHaveBeenCalledWith('any_bar_code')
  })
})
