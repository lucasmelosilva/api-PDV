import { DeleteProductController } from '../../../../presentation/controller/delete-product/delete-product-controller'
import { makeDbDeleteProduct } from '../../db/product/db-delete-product/make-db-delete-product'

export const makeDeleteProduct = (): DeleteProductController => {
  const dbDeleteProduct = makeDbDeleteProduct()
  return new DeleteProductController(dbDeleteProduct)
}
