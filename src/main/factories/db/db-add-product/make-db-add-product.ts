import { DbAddProduct } from '../../../../data/usecase/add-product/db-add-product'
import { AddProduct } from '../../../../domain/usecase/add-product'
import { makeProductMongoRepository } from '../../infra/make-product-mongo-repository'

export const makeDbAddProduct = (): AddProduct => (
  new DbAddProduct(makeProductMongoRepository())
)
