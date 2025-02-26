import { DbUpdateProduct } from '../../../../../data/usecase/product/update-product/db-update-product'
import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { makeDbUpdateProduct } from './make-db-update-product'

describe('makeDbUpdateProduct', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of DbUpdateProduct', () => {
    const sut = makeDbUpdateProduct()
    expect(sut).toBeInstanceOf(DbUpdateProduct)
  })
})
