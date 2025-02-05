import { ProductModel } from '../../../../domain/models/product-model'
import { LoadProduct } from '../../../../domain/usecase/product/load-product'
import { LoadProductByBarCodeRepository } from '../../../protocol/product/load-product-by-bar-code-repository'

export class DbLoadProductByBarCode implements LoadProduct {
  constructor (private readonly loadProductByBarCodeRepository: LoadProductByBarCodeRepository) {}

  async load (barCode: string): Promise<ProductModel> {
    const product = await this.loadProductByBarCodeRepository.loadByBarCode(barCode)
    return product
  }
}
