import { CompanyModel } from '../../models/company-model'

export type AddCompanyModel = Omit<CompanyModel, 'id'>

export interface AddCompany {
  add (addCompanyModel: AddCompanyModel): Promise<CompanyModel>
}
