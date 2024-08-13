import { ProductModel } from '../../domain/models/product-model'
import { LoadProduct } from '../../domain/usecase/load-product'
import { LoadProductByBarCodeRepository } from '../protocol/load-product-by-bar-code-repository'

export class DbLoadProductByBarCode implements LoadProduct {
  constructor (private readonly loadProductByBarCodeRepository: LoadProductByBarCodeRepository) {}

  async load (barCode: string): Promise<ProductModel> {
    await this.loadProductByBarCodeRepository.loadByBarCode(barCode)
    return new Promise(resolve => resolve(null))
  }
}
