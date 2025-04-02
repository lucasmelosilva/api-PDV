import { LoginEmployerController } from '../../../../../presentation/controller/employer/login/login-employer-controller'

import { makeLoginEmployerController } from './make-login-employer-controller'
describe('makeLoginEmployerController', () => {
  it('should return instance of LoginEmployerController', () => {
    const sut = makeLoginEmployerController()
    expect(sut).toBeInstanceOf(LoginEmployerController)
  })
})
