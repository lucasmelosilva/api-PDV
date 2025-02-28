import { InvalidParamError } from '../../errors/invalid-param-error'

import { PasswordConfirmationValidation } from './password-confirmation-validation'

describe('PasswordConfirmation Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const sut = new PasswordConfirmationValidation()
    const error = sut.validate({ password: 'any_password', passwordConfirmation: 'another_password' })
    expect(error).toEqual(new InvalidParamError('password'))
  })

  it('should return null if validation succeeds', () => {
    const sut = new PasswordConfirmationValidation()
    const error = sut.validate({ password: 'valid_password', passwordConfirmation: 'valid_password' })
    expect(error).toBeNull()
  })
})
