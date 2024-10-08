import { LoadProduct } from '../../../domain/usecase/load-product'
import { notFound } from '../../helper/http/not-found'
import { ok } from '../../helper/http/ok'
import { serverError } from '../../helper/http/server-error'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'

export class LoadProductController implements Controller {
  constructor (private readonly loadProduct: LoadProduct) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { barcode } = httpRequest.params
      const product = await this.loadProduct.load(barcode as string)
      if (!product) {
        return notFound(barcode as string)
      }
      return ok(product)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
