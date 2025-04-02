import { Router } from 'express'
import { makeSignupEmployerController } from '../factories/controllers/employer-controller/signup-employer/make-signup-employer-controller'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeLoginEmployerController } from '../factories/controllers/employer-controller/login-employer/make-login-employer-controller'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupEmployerController()))
  router.post('/login', adapterRoute(makeLoginEmployerController()))
}
