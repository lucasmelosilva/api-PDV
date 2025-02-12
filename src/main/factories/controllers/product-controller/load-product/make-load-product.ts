import { makeDbLoadProduct } from '../../../db/product/db-load-product/make-db-load-product'
import { LoadProductController } from '../../../../../presentation/controller/product/load-product/load-product-controller'
import { Controller } from '../../../../../presentation/protocols/controller-protocol'

export const makeLoadProduct = (): Controller => {
  const dbLoadProductByBarCode = makeDbLoadProduct()
  return new LoadProductController(dbLoadProductByBarCode)
}
