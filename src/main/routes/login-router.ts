import { Router } from 'express'
import { makeSignupEmployerController } from '../factories/controllers/employer-controller/make-signup-employer-controller'
import { adapterRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignupEmployerController()))
}
