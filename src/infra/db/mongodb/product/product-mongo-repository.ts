import { AddProductRepository } from '../../../../data/protocol/add-product-repository'
import { ProductModel } from '../../../../domain/models/product-model'
import { AddProductModel } from '../../../../domain/usecase/add-product'
import { MongoHelper } from '../../../helpers/mongo-helper'

export class ProductMongoRepository implements AddProductRepository {
  async addProduct (product: AddProductModel): Promise<ProductModel> {
    const result = await MongoHelper.insertAndFind(product, 'products')
    return MongoHelper.map(result)
  }
}
