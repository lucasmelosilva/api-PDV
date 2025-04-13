import { AddCompanyRepository } from '../../../../data/protocol/company/add-company-repository'
import { CompanyModel } from '../../../../domain/models/company-model'
import { AddCompanyModel } from '../../../../domain/usecase/company/add-company'
import { MongoHelper } from '../../../helpers/mongo-helper'

export class CompanyMongoRepository implements AddCompanyRepository {
  async addCompany (addCompanyModel: AddCompanyModel): Promise<CompanyModel> {
    const result = await MongoHelper.insertAndFind(addCompanyModel, 'companies')
    return MongoHelper.map(result)
  }
}
