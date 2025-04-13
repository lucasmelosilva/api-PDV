import { DbAddCompany } from '../../../../../data/usecase/company/add-company/db-add-company'
import { MongoHelper } from '../../../../../infra/helpers/mongo-helper'
import { makeDbAddCompany } from './make-db-add-company'

describe('makeDbAddCompany', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an instance of DbAddProduct', () => {
    const sut = makeDbAddCompany()
    expect(sut).toBeInstanceOf(DbAddCompany)
  })
})
