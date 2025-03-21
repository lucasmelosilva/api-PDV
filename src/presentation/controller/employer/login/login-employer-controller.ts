import { badRequest } from '../../../helper/http/bad-request'
import { Controller } from '../../../protocols/controller-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { HttpResponse } from '../../../protocols/http-response-protocol'
import { Validation } from '../../../protocols/validation-protocol'
import { Authentication } from '../../../../domain/usecase/employer/authentication'

export class LoginEmployerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const error = this.validation.validate(body)
    if (error) {
      return badRequest(error)
    }
    await this.authentication.auth(body)

    return null
  }
}
