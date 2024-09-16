import { DbAddProduct } from '../../../../data/usecase/add-product/db-add-product'
import { AddProduct } from '../../../../domain/usecase/add-product'
import { ProductMongoRepository } from '../../../../infra/db/mongodb/product/product-mongo-repository'

export const makeDbAddProduct = (): AddProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbAddProduct(productMongoRepository)
}
