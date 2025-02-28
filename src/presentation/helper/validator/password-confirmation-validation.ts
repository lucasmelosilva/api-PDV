import { Validation } from '../../protocols/validation-protocol'

export class PasswordConfirmationValidation implements Validation {
  validate (value: any): Error | null {
    if (value.password !== value.passwordConfirmation) {
      return new Error('Invalid param: password')
    }
    return null
  }
}
