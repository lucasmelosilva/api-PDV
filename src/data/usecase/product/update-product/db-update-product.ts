import { ProductModel } from '../../../../domain/models/product-model'
import { UpdateProduct, UpdateProductModel } from '../../../../domain/usecase/product/update-product'
import { UpdateProductRepository } from '../../../protocol/product/update-product-repository'

export class DbUpdateProduct implements UpdateProduct {
  constructor (
    private readonly updateProductRepository: UpdateProductRepository
  ) {}

  async update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel> {
    const updatedProduct = await this.updateProductRepository.update(id, updateProductModel)
    return updatedProduct
  }
}
