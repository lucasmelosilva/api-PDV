import { badRequest } from '../../../helper/http/bad-request'
import { Controller } from '../../../protocols/controller-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { HttpResponse } from '../../../protocols/http-response-protocol'
import { Validation } from '../../../protocols/validation-protocol'

export class SignUpEmployerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return new Promise(resolve => resolve(null))
  }
}
