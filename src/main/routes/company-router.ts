import { Router } from 'express'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeAddCompanyController } from '../factories/controllers/company-controller/add-company/make-add-company-controller'

export default (router: Router): void => {
  router.post('/companies', adapterRoute(makeAddCompanyController()))
}
