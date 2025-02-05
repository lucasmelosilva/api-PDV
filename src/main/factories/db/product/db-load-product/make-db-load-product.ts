import { DbLoadProductByBarCode } from '../../../../../data/usecase/product/load-product/db-load-product-by-bar-code'
import { LoadProduct } from '../../../../../domain/usecase/product/load-product'
import { makeProductMongoRepository } from '../../../infra/make-product-mongo-repository'

export const makeDbLoadProduct = (): LoadProduct => (
  new DbLoadProductByBarCode(makeProductMongoRepository())
)
