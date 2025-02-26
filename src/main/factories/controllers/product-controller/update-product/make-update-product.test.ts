import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { UpdateProductController } from '../../../../../presentation/controller/product/update-product/update-product-controller'
import { makeUpdateProduct } from './make-update-product'

describe('makeUpdateProductController', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('should return an instance of the UpdateProductController', () => {
    const sut = makeUpdateProduct()
    expect(sut).toBeInstanceOf(UpdateProductController)
  })
})
