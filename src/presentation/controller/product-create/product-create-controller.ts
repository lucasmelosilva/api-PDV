import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'
import { Validation } from '../../protocols/validation-protocol'

export class ProductCreateController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(request.body)
    return null
  }
}
