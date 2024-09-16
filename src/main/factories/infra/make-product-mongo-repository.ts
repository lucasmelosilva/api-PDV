import { ProductMongoRepository } from '../../../infra/db/mongodb/product/product-mongo-repository'

export const makeProductMongoRepository = (): ProductMongoRepository => (
  new ProductMongoRepository()
)
