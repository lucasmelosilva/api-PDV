import { DeleteProduct } from '../../../domain/usecase/delete-product'
import { ok } from '../../helper/http/ok'
import { serverError } from '../../helper/http/server-error'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'

export class DeleteProductController implements Controller {
  constructor (
    private readonly deleteProduct: DeleteProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteProduct.delete(httpRequest.params.barcode as string)
      return ok('tudo certo')
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
