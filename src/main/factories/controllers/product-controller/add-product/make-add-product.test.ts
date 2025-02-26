import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { AddProductController } from '../../../../../presentation/controller/product/add-product/add-product-controller'
import { makeAddProduct } from './make-add-product'

describe('makeUpdateProductController', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('should return an instance of the AddProductController', () => {
    const sut = makeAddProduct()
    expect(sut).toBeInstanceOf(AddProductController)
  })
})
