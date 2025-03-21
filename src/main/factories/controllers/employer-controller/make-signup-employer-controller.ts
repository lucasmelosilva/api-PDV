import { SignUpEmployerController } from '../../../../presentation/controller/employer/signup/signup-employer-controller'
import { makeDbAddEmployer } from '../../db/employer/db-add-employer/make-db-add-employer'
import { makeSignUpValidation } from '../../validation/make-signup-validation'

export function makeSignupEmployerController (): SignUpEmployerController {
  const validation = makeSignUpValidation(['companyId', 'employerId', 'name', 'password', 'passwordConfirmation'])
  return new SignUpEmployerController(validation, makeDbAddEmployer())
}
