import { AddEmployerRepository } from '../../../../data/protocol/employer/add-employer-repository'
import { EmployerModel } from '../../../../domain/models/employer-model'
import { AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { MongoHelper } from '../../../helpers/mongo-helper'

export class EmployerMongoRepository implements AddEmployerRepository {
  async addEmployer (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
    const result = await MongoHelper.insertAndFind(addEmployerModel, 'employers')
    return MongoHelper.map(result)
  }
}
