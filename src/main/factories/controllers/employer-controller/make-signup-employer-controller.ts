import { SignUpEmployerController } from '@/presentation/controller/employer/signup/signup-employer-controller'
import { makeValidation } from '../../validation/make-validation'
import { makeDbAddEmployer } from '../../db/employer/make-db-add-employer'

export function makeSignupEmployerController (): SignUpEmployerController {
  const validation = makeValidation(['companyId', 'employerId', 'name', 'password', 'passwordConfirmation'])
  return new SignUpEmployerController(validation, makeDbAddEmployer())
}
