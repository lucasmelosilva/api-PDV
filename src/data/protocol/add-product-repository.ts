import { ProductModel } from '../../domain/models/product-model'
import { AddProductModel } from '../../domain/usecase/add-product'

export interface AddProductRepository {
  addProduct(product: AddProductModel): Promise<ProductModel>
}
