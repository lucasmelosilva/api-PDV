import { Router } from 'express'
import { uploadMiddleware } from '../adapters/multer/multer-adapter'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeAddProduct } from '../factories/product/add-product/make-add-product'
import { makeLoadProduct } from '../factories/product/load-product/make-load-product'

export default (router: Router): void => {
  router.post('/products', uploadMiddleware.single('image'), adapterRoute(makeAddProduct()))
  router.post('/products/load', adapterRoute(makeLoadProduct()))
}
