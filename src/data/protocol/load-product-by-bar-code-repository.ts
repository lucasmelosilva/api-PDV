import { ProductModel } from '../../domain/models/product-model'

export interface LoadProductByBarCodeRepository {
  loadByBarCode (barCode: string): Promise<ProductModel>
}
