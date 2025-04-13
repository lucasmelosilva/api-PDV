import { CompanyModel } from 'domain/models/company-model'
import { AddCompanyModel } from 'domain/usecase/company/add-company'

export interface AddCompanyRepository {
  addCompany (addCompanyModel: AddCompanyModel): Promise<CompanyModel>
}
