import { ProductModel } from '../../../domain/models/product-model'

import { UpdateProductModel } from '../../../domain/usecase/product/update-product'

export interface UpdateProductRepository {
  update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel>
}
