import { RequiredFieldValidation } from '../../../presentation/helper/validator/required-field-validation'
import { ValidationComposite } from '../../../presentation/helper/validator/validation-composite'
import { Validation } from '../../../presentation/protocols/validation-protocol'

export const makeValidation = (fields: string[]): Validation => {
  const validations: Validation[] = []
  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
