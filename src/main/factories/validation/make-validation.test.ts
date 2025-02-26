import { ValidationComposite } from '../../../presentation/helper/validator/validation-composite'
import { makeValidation } from './make-validation'

describe('makeUpdateProductController', () => {
  it('should return an instance of the ValidationComposite', () => {
    const sut = makeValidation(['any_field'])
    expect(sut).toBeInstanceOf(ValidationComposite)
  })
})
