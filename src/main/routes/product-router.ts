import { Router } from 'express'
import { uploadMiddleware } from '../adapters/multer/multer-adapter'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeAddProduct } from '../factories/product/add-product/make-add-product'
import { makeLoadProduct } from '../factories/product/load-product/make-load-product'
import { makeDeleteProduct } from '../factories/product/delete-product/make-delete-product'

export default (router: Router): void => {
  router.post('/products', uploadMiddleware.single('image'), adapterRoute(makeAddProduct()))
  router.get('/products/:barcode', adapterRoute(makeLoadProduct()))
  router.delete('/products/:barcode', adapterRoute(makeDeleteProduct()))
}
