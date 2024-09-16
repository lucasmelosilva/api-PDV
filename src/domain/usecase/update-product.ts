import { ProductModel } from '../models/product-model'

export type UpdateProductModel = Omit<ProductModel, 'id'>

export interface UpdateProduct {
  update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel>
}
