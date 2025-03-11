import { LoadEmployerByEmployerIdRepository } from 'data/protocol/employer/load-employer-by-employer-id-repository'
import { AddEmployerRepository } from '../../../../data/protocol/employer/add-employer-repository'
import { EmployerModel } from '../../../../domain/models/employer-model'
import { AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { MongoHelper } from '../../../helpers/mongo-helper'
import { UpdateEmployerAccessTokenRepository } from 'data/protocol/employer/update-employer-access-token-repository'

export class EmployerMongoRepository implements
  AddEmployerRepository,
  LoadEmployerByEmployerIdRepository,
  UpdateEmployerAccessTokenRepository {
  async addEmployer (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
    const result = await MongoHelper.insertAndFind(addEmployerModel, 'employers')
    return MongoHelper.map(result)
  }

  async loadByEmployerId (employerId: string): Promise<EmployerModel> {
    const collectionEmployers = MongoHelper.getCollection('employers')
    const result = await collectionEmployers.findOne({ employerId })
    return MongoHelper.map(result)
  }

  async updateAccessToken (id: any, accessToken: string): Promise<boolean> {
    const employerCollection = MongoHelper.getCollection('employers')
    const result = await employerCollection.updateOne({ _id: id }, { $set: { accessToken } })
    if (result.modifiedCount > 0) {
      return true
    }
    return false
  }
}
