import { makeDbLoadProductByBarCode } from '../../../db/product/db-load-product/make-db-load-product-by-bar-code'
import { LoadProductController } from '../../../../../presentation/controller/product/load-product/load-product-controller'
import { Controller } from '../../../../../presentation/protocols/controller-protocol'

export const makeLoadProduct = (): Controller => {
  const dbLoadProductByBarCode = makeDbLoadProductByBarCode()
  return new LoadProductController(dbLoadProductByBarCode)
}
