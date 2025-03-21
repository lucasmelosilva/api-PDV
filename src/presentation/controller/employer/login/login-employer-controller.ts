import { Controller } from 'presentation/protocols/controller-protocol'
import { HttpRequest } from 'presentation/protocols/http-request-protocol'
import { HttpResponse } from 'presentation/protocols/http-response-protocol'
import { Validation } from 'presentation/protocols/validation-protocol'

export class LoginEmployerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    this.validation.validate(body)
    return new Promise(resolve => resolve(null))
  }
}
