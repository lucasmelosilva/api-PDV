import { AddProductController } from '../../../../presentation/controller/add-product/add-product-controller'
import { Controller } from '../../../../presentation/protocols/controller-protocol'
import { makeDbAddProduct } from '../../db/db-add-product/make-db-add-product'
import { makeValidation } from '../../validation/make-validation'

export const makeAddProduct = (): Controller => {
  const fields = ['name', 'barCode', 'imageUrl', 'price']
  const validationComposite = makeValidation(fields)
  const dbAddProduct = makeDbAddProduct()
  return new AddProductController(validationComposite, dbAddProduct)
}
