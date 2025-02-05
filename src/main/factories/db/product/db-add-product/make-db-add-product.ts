import { DbAddProduct } from '../../../../../data/usecase/product/add-product/db-add-product'
import { AddProduct } from '../../../../../domain/usecase/product/add-product'
import { makeProductMongoRepository } from '../../../infra/make-product-mongo-repository'

export const makeDbAddProduct = (): AddProduct => (
  new DbAddProduct(makeProductMongoRepository())
)
