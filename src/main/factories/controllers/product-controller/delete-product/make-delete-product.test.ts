import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { DeleteProductController } from '../../../../../presentation/controller/product/delete-product/delete-product-controller'
import { makeDeleteProduct } from './make-delete-product'

describe('makeDeleteProductController', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('should return an instance of the DeleteProductController', () => {
    const sut = makeDeleteProduct()
    expect(sut).toBeInstanceOf(DeleteProductController)
  })
})
