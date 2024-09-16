import { DbLoadProductByBarCode } from '../../../../data/usecase/db-load-product-by-bar-code'
import { LoadProduct } from '../../../../domain/usecase/load-product'
import { ProductMongoRepository } from '../../../../infra/db/mongodb/product/product-mongo-repository'

export const makeDbLoadProduct = (): LoadProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProductByBarCode(productMongoRepository)
}
