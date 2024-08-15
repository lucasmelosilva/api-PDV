import { makeDbLoadProduct } from '../../db/db-load-product/db-load-product'
import { LoadProductController } from '../../../../presentation/controller/load-product/load-product-controller'
import { Controller } from '../../../../presentation/protocols/controller-protocol'

export const makeLoadProduct = (): Controller => {
  const dbLoadProductByBarCode = makeDbLoadProduct()
  return new LoadProductController(dbLoadProductByBarCode)
}
