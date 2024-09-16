import { DbDeleteProduct } from '../../../../data/usecase/db-delete-product'
import { DeleteProduct } from '../../../../domain/usecase/delete-product'
import { ProductMongoRepository } from '../../../../infra/db/mongodb/product/product-mongo-repository'

export const makeDbDeleteProduct = (): DeleteProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbDeleteProduct(productMongoRepository)
}
