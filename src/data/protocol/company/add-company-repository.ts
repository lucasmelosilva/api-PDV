import { CompanyModel } from 'domain/models/company-model'
import { AddCompanyModel } from 'domain/usecase/company/add-company'

export interface AddCompanyRepository {
  add (addCompanyModel: AddCompanyModel): Promise<CompanyModel>
}
