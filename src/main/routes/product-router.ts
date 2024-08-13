import { Router } from 'express'
import { uploadMiddleware } from '../adapters/multer/multer-adapter'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeProductCreate } from '../factories/product/make-product-create'

export default (router: Router): void => {
  router.post('/products', uploadMiddleware.single('image'), adapterRoute(makeProductCreate()))
}
