import { ProductModel } from '../../../../domain/models/product-model'
import { UpdateProductModel } from '../../../../domain/usecase/product/update-product'
import { UpdateProductRepository } from '../../../protocol/product/update-product-repository'

import { DbUpdateProduct } from './db-update-product'

function makeFakeProduct (): UpdateProductModel {
  return {
    name: 'any-name',
    barCode: 'any-bar-code',
    imageUrl: 'any-image-url',
    price: 23.1,
    companyId: 'any-company-id'
  }
}

function makeUpdateProductRepositoryStub (): UpdateProductRepository {
  class UpdateProductRepositoryStub implements UpdateProductRepository {
    async update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel> {
      return new Promise(resolve => resolve({
        id: 'any-id',
        name: 'updated-name',
        barCode: 'updated-bar-code',
        imageUrl: 'updated-image-url',
        price: 23.1,
        companyId: 'any-company-id'
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

  it('should throw if UpdateProductRepository throws', async () => {
    const { sut, updateProductRepositoryStub } = makeSut()
    jest.spyOn(updateProductRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update('any_id', makeFakeProduct())
    await expect(promise).rejects.toThrow()
  })

  it('should return an updated product on success', async () => {
    const { sut } = makeSut()
    const updatedProduct = await sut.update('any-id', makeFakeProduct())
    expect(updatedProduct).toEqual({
      id: 'any-id',
      name: 'updated-name',
      barCode: 'updated-bar-code',
      imageUrl: 'updated-image-url',
      price: 23.1,
      companyId: 'any-company-id'
    })
  })
})
