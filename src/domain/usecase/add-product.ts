import { ProductModel } from '../models/product-model'

export type AddProductModel = Omit<ProductModel, 'id'>

export interface AddProduct {
  add: (addProductModel: AddProductModel) => Promise<ProductModel>
}
