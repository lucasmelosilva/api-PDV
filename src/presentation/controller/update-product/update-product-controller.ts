import { UpdateProduct } from '../../../domain/usecase/product/update-product'
import { badRequest } from '../../helper/http/bad-request'
import { ok } from '../../helper/http/ok'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'
import { Validation } from '../../protocols/validation-protocol'

export class UpdateProductController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateProduct: UpdateProduct
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { body } = request
    const error = this.validation.validate({ ...body })
    if (error) return badRequest(error)

    const { id, ...product } = body
    const result = await this.updateProduct.update(id, product)
    return ok(result)
  }
}
