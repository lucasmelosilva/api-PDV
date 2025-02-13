import { DbDeleteProduct } from '../../../../../data/usecase/product/delete-product/db-delete-product'
import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { makeDbDeleteProduct } from './make-db-delete-product'

describe('makeDbUpdateProduct', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of DbDeleteProduct', () => {
    const sut = makeDbDeleteProduct()
    expect(sut).toBeInstanceOf(DbDeleteProduct)
  })
})
