import { ProductModel } from '../../../domain/models/product-model'
import { UpdateProduct, UpdateProductModel } from '../../../domain/usecase/update-product'
import { UpdateProductRepository } from '../../protocol/update-product-repository'

export class DbUpdateProduct implements UpdateProduct {
  constructor (
    private readonly updateProductRepository: UpdateProductRepository
  ) {}

  async update (id: string, updateProductModel: UpdateProductModel): Promise<ProductModel> {
    await this.updateProductRepository.update(id, updateProductModel)
    return null
  }
}
