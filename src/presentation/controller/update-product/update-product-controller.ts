import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'
import { Validation } from '../../protocols/validation-protocol'

export class UpdateProductController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { body } = request
    this.validation.validate({ ...body })
    return new Promise(resolve => resolve(null))
  }
}
