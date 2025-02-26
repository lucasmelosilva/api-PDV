import { DbAddProduct } from '../../../../../data/usecase/product/add-product/db-add-product'
import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { makeDbAddProduct } from './make-db-add-product'

describe('makeDbUpdateProduct', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of DbAddProduct', () => {
    const sut = makeDbAddProduct()
    expect(sut).toBeInstanceOf(DbAddProduct)
  })
})
