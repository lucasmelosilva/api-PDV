import { UpdateProduct } from '../../../domain/usecase/update-product'
import { badRequest } from '../../helper/http/bad-request'
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

    await this.updateProduct.update(id, product)

    return null
  }
}
