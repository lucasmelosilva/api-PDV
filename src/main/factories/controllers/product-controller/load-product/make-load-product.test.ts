import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { LoadProductController } from '../../../../../presentation/controller/product/load-product/load-product-controller'
import { makeLoadProduct } from './make-load-product'

describe('makeLoadProductController', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of the LoadProductController', () => {
    const sut = makeLoadProduct()
    expect(sut).toBeInstanceOf(LoadProductController)
  })
})
