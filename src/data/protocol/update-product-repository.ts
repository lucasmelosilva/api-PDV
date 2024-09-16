import { ProductModel } from '../../domain/models/product-model'

import { UpdateProductModel } from '../../domain/usecase/update-product'

export interface UpdateProductRepository {
  update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel>
}
