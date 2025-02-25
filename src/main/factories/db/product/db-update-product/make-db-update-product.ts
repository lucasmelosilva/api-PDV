import { DbUpdateProduct } from '../../../../../data/usecase/product/update-product/db-update-product'
import { UpdateProduct } from '../../../../../domain/usecase/product/update-product'
import { makeProductMongoRepository } from '../../../infra/product-mongo-repository/make-product-mongo-repository'

export const makeDbUpdateProduct = (): UpdateProduct => (
  new DbUpdateProduct(makeProductMongoRepository())
)
