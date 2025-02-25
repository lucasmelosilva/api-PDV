import { DbDeleteProduct } from '../../../../../data/usecase/product/delete-product/db-delete-product'
import { DeleteProduct } from '../../../../../domain/usecase/product/delete-product'
import { makeProductMongoRepository } from '../../../infra/product-mongo-repository/make-product-mongo-repository'

export const makeDbDeleteProduct = (): DeleteProduct => (
  new DbDeleteProduct(makeProductMongoRepository())
)
