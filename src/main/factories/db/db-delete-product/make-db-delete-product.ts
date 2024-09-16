import { DbDeleteProduct } from '../../../../data/usecase/delete-product/db-delete-product'
import { DeleteProduct } from '../../../../domain/usecase/delete-product'
import { makeProductMongoRepository } from '../../infra/make-product-mongo-repository'

export const makeDbDeleteProduct = (): DeleteProduct => (
  new DbDeleteProduct(makeProductMongoRepository())
)
