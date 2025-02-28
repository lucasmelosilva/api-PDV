import { Validation } from '../../../presentation/protocols/validation-protocol'
import { ValidationComposite } from '../../../presentation/helper/validator/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helper/validator/required-field-validation'
import { PasswordConfirmationValidation } from '../../../presentation/helper/validator/password-confirmation-validation'

export function makeSignUpValidation (fields: string[]): ValidationComposite {
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PasswordConfirmationValidation())
  return new ValidationComposite(validations)
}
