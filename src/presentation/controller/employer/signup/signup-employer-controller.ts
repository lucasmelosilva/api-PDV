import { Controller } from '../../../protocols/controller-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { HttpResponse } from '../../../protocols/http-response-protocol'
import { Validation } from '../../../protocols/validation-protocol'

export class SignUpEmployerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
