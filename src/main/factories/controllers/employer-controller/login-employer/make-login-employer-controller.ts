import { makeValidation } from '../../../../../main/factories/validation/make-validation'
import { LoginEmployerController } from '../../../../../presentation/controller/employer/login/login-employer-controller'
import { makeDbAuthentication } from '../../../../../main/factories/db/employer/db-authentication/make-db-authentication'

export function makeLoginEmployerController (): LoginEmployerController {
  const fields = []
  const validation = makeValidation(fields)
  const dbAuthentication = makeDbAuthentication()
  return new LoginEmployerController(validation, dbAuthentication)
}
