import { ProductCreateController } from '../../../../presentation/controller/product-create/product-create-controller'
import { Controller } from '../../../../presentation/protocols/controller-protocol'
import { makeDbAddProduct } from '../../db/db-add-product/make-db-add-product'
import { makeValidation } from '../../validation/make-validation'

export const makeProductCreate = (): Controller => {
  const fields = ['name', 'barCode', 'imageUrl', 'price']
  const validationComposite = makeValidation(fields)
  const dbAddProduct = makeDbAddProduct()
  return new ProductCreateController(validationComposite, dbAddProduct)
}
