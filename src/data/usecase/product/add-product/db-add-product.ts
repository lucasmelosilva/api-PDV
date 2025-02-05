import { ProductModel } from '../../../../domain/models/product-model'
import { AddProduct, AddProductModel } from '../../../../domain/usecase/product/add-product'
import { AddProductRepository } from '../../../protocol/product/add-product-repository'

export class DbAddProduct implements AddProduct {
  constructor (private readonly addProductRepository: AddProductRepository) {}

  async add (addProductModel: AddProductModel): Promise<ProductModel> {
    const product: ProductModel = await this.addProductRepository.addProduct(addProductModel)
    return product
  }
}
