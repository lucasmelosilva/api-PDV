import { SignUpEmployerController } from '../../../../../presentation/controller/employer/signup/signup-employer-controller'

import { makeSignupEmployerController } from './make-signup-employer-controller'

describe('makeSignupEmployerController', () => {
  it('should make SignupEmployerController', () => {
    const sut = makeSignupEmployerController()
    expect(sut).toBeInstanceOf(SignUpEmployerController)
  })
})
