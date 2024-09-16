import { DeleteProduct } from '../../domain/usecase/delete-product'
import { DeleteProductRepository } from '../protocol/delete-product-repository'

export class DbDeleteProduct implements DeleteProduct {
  constructor (private readonly deleteProductRepository: DeleteProductRepository) {}

  async delete (barcode: string): Promise<void> {
    await this.deleteProductRepository.delete(barcode)
  }
}
