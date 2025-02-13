import { ProductMongoRepository } from '../../../infra/db/mongodb/product/product-mongo-repository'
import { makeProductMongoRepository } from './make-product-mongo-repository'
import { MongoHelper } from '../../../infra/helpers/mongo-helper'

describe('makeProductMongoRepository', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of ProductMongoRepository', () => {
    const sut = makeProductMongoRepository()
    expect(sut).toBeInstanceOf(ProductMongoRepository)
  })
})
