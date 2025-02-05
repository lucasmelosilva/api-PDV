import { UpdateProductController } from '../../../../presentation/controller/update-product/update-product-controller'
import { Controller } from '../../../../presentation/protocols/controller-protocol'
import { makeDbUpdateProduct } from '../../db/product/db-update-product/make-db-update-product'
import { makeValidation } from '../../validation/make-validation'

export const makeUpdateProduct = (): Controller => {
  const fields = ['id', 'name', 'barCode', 'imageUrl', 'price']
  const validationComposite = makeValidation(fields)
  const dbUpdateProduct = makeDbUpdateProduct()
  return new UpdateProductController(validationComposite, dbUpdateProduct)
}
