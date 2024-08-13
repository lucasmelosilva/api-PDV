import { LoadProduct } from '../../../domain/usecase/load-product'
import { notFound } from '../../helper/http/not-found'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'

export class LoadProductController implements Controller {
  constructor (private readonly loadProduct: LoadProduct) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { barCode } = httpRequest.body
    const product = await this.loadProduct.load(barCode as string)
    if (!product) {
      return notFound(barCode as string)
    }
    return new Promise(resolve => resolve(null))
  }
}
