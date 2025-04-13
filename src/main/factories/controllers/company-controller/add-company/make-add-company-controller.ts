import { makeValidation } from '../../../validation/make-validation'
import { AddCompanyController } from '../../../../../presentation/controller/company/add-company/add-company-controller'
import { makeDbAddCompany } from '../../../db/company/db-add-company/make-db-add-company'

export function makeAddCompanyController (): AddCompanyController {
  return new AddCompanyController(makeValidation(['cnpj', 'name']), makeDbAddCompany())
}
