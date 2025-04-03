import { AddProductController } from '../../../../../presentation/controller/product/add-product/add-product-controller'
import { Controller } from '../../../../../presentation/protocols/controller-protocol'
import { makeDbAddProduct } from '../../../db/product/db-add-product/make-db-add-product'
import { makeValidation } from '../../../validation/make-validation'

export const makeAddProduct = (): Controller => {
  const fields = ['name', 'barCode', 'imageUrl', 'price', 'companyId']
  const validationComposite = makeValidation(fields)
  const dbAddProduct = makeDbAddProduct()
  return new AddProductController(validationComposite, dbAddProduct)
}
