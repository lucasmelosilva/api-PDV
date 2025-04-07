import { Collection } from 'mongodb'
import { MongoHelper } from '../../../helpers/mongo-helper'
import { AddCompanyModel } from '../../../../domain/usecase/company/add-company'

import { CompanyMongoRepository } from './company-mongo-repository'

let companyCollection: Collection

function makeFakeCompany (): AddCompanyModel {
  return {
    name: 'any_name',
    cnpj: 'encrypted_value'
  }
}

function makeSut (): CompanyMongoRepository {
  return new CompanyMongoRepository()
}

describe('CompanyMongoRepository', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    companyCollection = MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
  })

  describe('addCompany()', () => {
    it('should return a company on success', async () => {
      const sut = makeSut()
      const result = await sut.addCompany(makeFakeCompany())
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toBe('any_name')
      expect(result.cnpj).toBe('encrypted_value')
    })
  })
})
