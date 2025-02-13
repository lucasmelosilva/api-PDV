import { Collection } from 'mongodb'
import { AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { MongoHelper } from '../../../helpers/mongo-helper'
import { EmployerMongoRepository } from './employer-mongo-repository'

function makeFakeEmployer (): AddEmployerModel {
  return {
    name: 'any_name',
    password: 'any_password',
    employerId: 'any_employer_id',
    companyId: 'any_company_id'
  }
}
let employerCollection: Collection

describe('EmployerMongoRepository', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    employerCollection = MongoHelper.getCollection('employers')
    await employerCollection.deleteMany({})
  })

  describe('addEmployer()', () => {
    it('should return an employer on success', async () => {
      const sut = new EmployerMongoRepository()
      const result = await sut.addEmployer(makeFakeEmployer())
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toBe('any_name')
      expect(result.password).toBe('any_password')
      expect(result.employerId).toBe('any_employer_id')
      expect(result.companyId).toBe('any_company_id')
    })
  })
})
