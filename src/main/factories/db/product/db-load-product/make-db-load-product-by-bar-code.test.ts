import { DbLoadProductByBarCode } from '../../../../../data/usecase/product/load-product/db-load-product-by-bar-code'
import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { makeDbLoadProductByBarCode } from './make-db-load-product-by-bar-code'

describe('makeDbUpdateProduct', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of DbLoadProduct', () => {
    const sut = makeDbLoadProductByBarCode()
    expect(sut).toBeInstanceOf(DbLoadProductByBarCode)
  })
})
