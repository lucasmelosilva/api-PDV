import { Collection } from 'mongodb'
import { AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { MongoHelper } from '../../../helpers/mongo-helper'
import { EmployerMongoRepository } from './employer-mongo-repository'

function makeFakeEmployer (): AddEmployerModel {
  return {
    name: 'any_name',
    password: 'any_password',
    employerId: 'any_employer_id',
    companyId: 'any_company_id',
    role: 'cashier'
  }
}

function makeSut (): EmployerMongoRepository {
  return new EmployerMongoRepository()
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
      const sut = makeSut()
      const result = await sut.addEmployer(makeFakeEmployer())
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toBe('any_name')
      expect(result.password).toBe('any_password')
      expect(result.employerId).toBe('any_employer_id')
      expect(result.companyId).toBe('any_company_id')
    })
  })

  describe('loadByEmployerId()', () => {
    it('should return an employer loaded by employerId', async () => {
      const employers = [
        makeFakeEmployer(),
        Object.assign(
          makeFakeEmployer(),
          { name: 'John Smith', employerId: '12345' }
        )
      ]
      await employerCollection.insertMany(employers)

      const sut = makeSut()
      const result = await sut.loadByEmployerId('12345')
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toBe('John Smith')
      expect(result.password).toBe('any_password')
      expect(result.employerId).toBe('12345')
      expect(result.companyId).toBe('any_company_id')
    })
  })

  describe('updateAccessToken()', () => {
    it('should return false on fail', async () => {
      const sut = makeSut()
      const result = await sut.updateAccessToken('any_id', 'any_accessToken')
      expect(result).toBeFalsy()
    })

    it('should return true on success', async () => {
      const { insertedId } = await employerCollection.insertOne(makeFakeEmployer())
      const employerBeforeUpdate = await employerCollection.findOne({ _id: insertedId })
      expect(employerBeforeUpdate?.accessToken).toBeFalsy()

      const sut = makeSut()
      const result = await sut.updateAccessToken(insertedId, 'any_accessToken')
      expect(result).toBeTruthy()

      const employerAfterUpdate = await employerCollection.findOne({ _id: insertedId })
      expect(employerAfterUpdate?.accessToken).toBe('any_accessToken')
    })
  })
})
