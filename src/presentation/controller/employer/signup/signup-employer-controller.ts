import { AddEmployer } from '../../../../domain/usecase/employer/add-employer'
import { badRequest } from '../../../helper/http/bad-request'
import { ok } from '../../../helper/http/ok'
import { Controller } from '../../../protocols/controller-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { HttpResponse } from '../../../protocols/http-response-protocol'
import { Validation } from '../../../protocols/validation-protocol'

export class SignUpEmployerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addEmployer: AddEmployer
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    const { passwordToConfirm, ...toAdd } = httpRequest.body
    const result = await this.addEmployer.add(toAdd)
    return ok(result)
  }
}
