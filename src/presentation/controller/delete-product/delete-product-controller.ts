import { DeleteProduct } from '../../../domain/usecase/delete-product'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'

export class DeleteProductController implements Controller {
  constructor (
    private readonly deleteProduct: DeleteProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.deleteProduct.delete(httpRequest.params.barcode as string)

    return new Promise(resolve => resolve(null))
  }
}
