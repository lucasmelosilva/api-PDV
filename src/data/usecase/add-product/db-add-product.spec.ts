import { ProductModel } from '../../../domain/models/product-model'
import { AddProductModel } from '../../../domain/usecase/add-product'
import { AddProductRepository } from '../../protocol/add-product-repository'

import { DbAddProduct } from './db-add-product'

function makeAddProductRepositoryStub (): AddProductRepository {
  class AddProductRepositoryStub implements AddProductRepository {
    async addProduct (product: AddProductModel): Promise<ProductModel> {
      return await new Promise(resolve => resolve({
        id: 'any-id',
        name: 'any-name',
        barCode: 'any-bar-code',
        imageUrl: 'any-image-url',
        price: 23.1
      }))
    }
  }
  return new AddProductRepositoryStub()
}

interface SutTypes {
  sut: DbAddProduct
  addProductRepositoryStub: AddProductRepository
}

function makeSut (): SutTypes {
  const addProductRepositoryStub = makeAddProductRepositoryStub()
  const sut = new DbAddProduct(addProductRepositoryStub)

  return {
    sut,
    addProductRepositoryStub
  }
}

function makeFakeProduct (): AddProductModel {
  return {
    name: 'any-name',
    barCode: 'any-bar-code',
    imageUrl: 'any-image-url',
    price: 23.1
  }
}

describe('DbAddProduct', () => {
  it('should call AddProductRepository with correct value', async () => {
    const { sut, addProductRepositoryStub } = makeSut()
    const addProductSpy = jest.spyOn(addProductRepositoryStub, 'addProduct')
    const product = makeFakeProduct()
    await sut.add(product)
    expect(addProductSpy).toHaveBeenCalledWith(product)
  })

  it('should return null if AddProductRepository returns null', async () => {
    const { sut, addProductRepositoryStub } = makeSut()
    jest.spyOn(addProductRepositoryStub, 'addProduct').mockReturnValueOnce(new Promise(resolve => resolve(null as unknown as ProductModel)))
    const product = makeFakeProduct()
    const result = await sut.add(product)
    expect(result).toBeNull()
  })

  it('should return an product when addProductRepository success', async () => {
    const { sut } = makeSut()
    const product = makeFakeProduct()
    const result = await sut.add(product)
    expect(result).toEqual({
      id: 'any-id',
      name: 'any-name',
      barCode: 'any-bar-code',
      imageUrl: 'any-image-url',
      price: 23.1
    })
  })

  it('should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositoryStub } = makeSut()
    jest.spyOn(addProductRepositoryStub, 'addProduct').mockImplementationOnce(() => {
      throw new Error()
    })
    const product = makeFakeProduct()
    const promise = sut.add(product)
    await expect(promise).rejects.toThrow()
  })
})
