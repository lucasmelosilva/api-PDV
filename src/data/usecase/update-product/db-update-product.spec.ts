import { ProductModel } from '../../../domain/models/product-model'
import { UpdateProductModel } from '../../../domain/usecase/update-product'
import { UpdateProductRepository } from '../../protocol/update-product-repository'

import { DbUpdateProduct } from './db-update-product'

function makeFakeProduct (): UpdateProductModel {
  return {
    name: 'any-name',
    barCode: 'any-bar-code',
    imageUrl: 'any-image-url',
    price: 23.1
  }
}

function makeUpdateProductRepositoryStub (): UpdateProductRepository {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    async update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve({
        id: 'any-id',
        ...makeFakeProduct()
      }))
    }
  }

  return new UpdateProductRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateProduct
  updateProductRepositoryStub: UpdateProductRepository
}

function makeSut (): SutTypes {
  const updateProductRepositoryStub = makeUpdateProductRepositoryStub()
  const sut = new DbUpdateProduct(updateProductRepositoryStub)
  return {
    sut,
    updateProductRepositoryStub
  }
}

describe('DbUpdateProduct', () => {
  it('should call UpdateProductRepository with correct values', async () => {
    const { sut, updateProductRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateProductRepositoryStub, 'update')
    const id = 'any-id'
    const product = makeFakeProduct()
    await sut.update(id, product)
    expect(updateSpy).toHaveBeenCalledWith(id, product)
  })
})
