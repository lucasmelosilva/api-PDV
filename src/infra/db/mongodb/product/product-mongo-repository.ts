import { ObjectId } from 'mongodb'
import { AddProductRepository } from '../../../../data/protocol/add-product-repository'
import { DeleteProductRepository } from '../../../../data/protocol/delete-product-repository'
import { LoadProductByBarCodeRepository } from '../../../../data/protocol/load-product-by-bar-code-repository'
import { UpdateProductRepository } from '../../../../data/protocol/update-product-repository'
import { ProductModel } from '../../../../domain/models/product-model'
import { AddProductModel } from '../../../../domain/usecase/add-product'
import { UpdateProductModel } from '../../../../domain/usecase/update-product'
import { MongoHelper } from '../../../helpers/mongo-helper'

export class ProductMongoRepository implements AddProductRepository, LoadProductByBarCodeRepository, DeleteProductRepository, UpdateProductRepository {
  private readonly productCollection = MongoHelper.getCollection('products')

  async loadByBarCode (barCode: string): Promise<ProductModel> {
    const result = await this.productCollection.findOne({ barCode })
    return MongoHelper.map(result)
  }

  async addProduct (product: AddProductModel): Promise<ProductModel> {
    const result = await MongoHelper.insertAndFind(product, 'products')
    return MongoHelper.map(result)
  }

  async delete (barCode: string): Promise<void> {
    await this.productCollection.deleteOne({ barCode })
  }

  async update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel> {
    const result = await this.productCollection.findOneAndUpdate({
      _id: new ObjectId(id)

    }, {
      $set: {
        ...updateProductModel
      }
    }, {
      returnDocument: 'after'
    })
    return MongoHelper.map(result)
  }
}
