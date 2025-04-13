import { makeAddCompanyController } from './make-add-company-controller'
import { AddCompanyController } from '../../../../../presentation/controller/company/add-company/add-company-controller'

describe('makeAddCompanyController', () => {
  it('should return an instance of AddCompanyController', () => {
    const sut = makeAddCompanyController()
    expect(sut).toBeInstanceOf(AddCompanyController)
  })
})
