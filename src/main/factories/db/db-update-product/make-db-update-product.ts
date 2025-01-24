import { DbUpdateProduct } from '../../../../data/usecase/update-product/db-update-product'
import { UpdateProduct } from '../../../../domain/usecase/update-product'
import { makeProductMongoRepository } from '../../infra/make-product-mongo-repository'

export const makeDbUpdateProduct = (): UpdateProduct => (
  new DbUpdateProduct(makeProductMongoRepository())
)
