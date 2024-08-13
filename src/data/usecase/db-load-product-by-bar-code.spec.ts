import { ProductModel } from '../../domain/models/product-model'
import { LoadProductByBarCodeRepository } from '../protocol/load-product-by-bar-code-repository'
import { DbLoadProductByBarCode } from './db-load-product-by-bar-code'

function makeLoadProductByBarCodeRepositoryStub (): LoadProductByBarCodeRepository {
  class LoadProductByBarCodeRepositoryStub implements LoadProductByBarCodeRepository {
    async loadByBarCode (barCode: string): Promise<ProductModel> {
      return await new Promise(resolve => resolve({
        id: 'any-id',
        name: 'any-name',
        barCode: 'any-bar-code',
        imageUrl: 'any-image-url',
        price: 23.1
      }))
    }
  }
  return new LoadProductByBarCodeRepositoryStub()
}

interface SutTypes {
  sut: DbLoadProductByBarCode
  loadProductByBarCodeRepositoryStub: LoadProductByBarCodeRepository
}

function makeSut (): SutTypes {
  const loadProductByBarCodeRepositoryStub = makeLoadProductByBarCodeRepositoryStub()
  const sut = new DbLoadProductByBarCode(loadProductByBarCodeRepositoryStub)

  return {
    sut,
    loadProductByBarCodeRepositoryStub
  }
}

describe('DbLoadProductByBarCode', () => {
  it('should call LoadProductByBarCodeRepository with correct value', async () => {
    const { sut, loadProductByBarCodeRepositoryStub } = makeSut()
    const loadByBarCodeSpy = jest.spyOn(loadProductByBarCodeRepositoryStub, 'loadByBarCode')
    await sut.load('any-bar-code')
    expect(loadByBarCodeSpy).toHaveBeenCalledWith('any-bar-code')
  })
})
