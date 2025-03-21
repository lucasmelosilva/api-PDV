import { badRequest } from '../../../helper/http/bad-request'
import { unauthorized } from '../../../helper/http/unauthorized'
import { serverError } from '../../../helper/http/server-error'
import { ok } from '../../../helper/http/ok'
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
    try {
      const { body } = httpRequest
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.authentication.auth(body)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
