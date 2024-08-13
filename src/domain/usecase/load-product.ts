import { ProductModel } from '../models/product-model'

export interface LoadProduct {
  load (barCode: string): Promise<ProductModel>
}
