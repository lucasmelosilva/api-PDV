import { AddProductRepository } from '../../../../data/protocol/add-product-repository'
import { LoadProductByBarCodeRepository } from '../../../../data/protocol/load-product-by-bar-code-repository'
import { ProductModel } from '../../../../domain/models/product-model'
import { AddProductModel } from '../../../../domain/usecase/add-product'
import { MongoHelper } from '../../../helpers/mongo-helper'

export class ProductMongoRepository implements AddProductRepository, LoadProductByBarCodeRepository {
  async loadByBarCode (barCode: string): Promise<ProductModel> {
    const productCollection = MongoHelper.getCollection('products')
    const result = await productCollection.findOne({ barCode })
    return MongoHelper.map(result)
  }

  async addProduct (product: AddProductModel): Promise<ProductModel> {
    const result = await MongoHelper.insertAndFind(product, 'products')
    return MongoHelper.map(result)
  }
}
