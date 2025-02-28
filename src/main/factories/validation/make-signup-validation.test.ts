import { ValidationComposite } from '../../../presentation/helper/validator/validation-composite'
import { makeSignUpValidation } from './make-signup-validation'

describe('makeUpdateProductController', () => {
  it('should return an instance of the ValidationComposite', () => {
    const sut = makeSignUpValidation(['any_field'])
    expect(sut).toBeInstanceOf(ValidationComposite)
  })
})
