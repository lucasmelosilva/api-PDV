import { Router } from 'express'
import { uploadMiddleware } from '../adapters/multer/multer-adapter'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeProductCreate } from '../factories/product/product-create/make-product-create'
import { makeLoadProduct } from '../factories/product/load-product/make-load-product'

export default (router: Router): void => {
  router.post('/products', uploadMiddleware.single('image'), adapterRoute(makeProductCreate()))
  router.post('/products/load', adapterRoute(makeLoadProduct()))
}
