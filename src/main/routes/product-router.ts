import { Router } from 'express'
import { uploadMiddleware } from '../adapters/multer/multer-adapter'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { makeAddProduct } from '../factories/controllers/product-controller/add-product/make-add-product'
import { makeLoadProduct } from '../factories/controllers/product-controller/load-product/make-load-product'
import { makeDeleteProduct } from '../factories/controllers/product-controller/delete-product/make-delete-product'
import { makeUpdateProduct } from '../factories/controllers/product-controller/update-product/make-update-product'

export default (router: Router): void => {
  router.post('/products', uploadMiddleware.single('image'), adapterRoute(makeAddProduct()))
  router.get('/products/:barcode', adapterRoute(makeLoadProduct()))
  router.delete('/products/:barcode', adapterRoute(makeDeleteProduct()))
  router.put('/products', adapterRoute(makeUpdateProduct()))
}
