import { AddCompany } from '../../../../domain/usecase/company/add-company'
import { badRequest } from '../../../helper/http/bad-request'
import { conflict } from '../../../helper/http/conflict'
import { Controller } from '../../../protocols/controller-protocol'
import { HttpRequest } from '../../../protocols/http-request-protocol'
import { HttpResponse } from '../../../protocols/http-response-protocol'
import { Validation } from '../../../protocols/validation-protocol'

export class AddCompanyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCompany: AddCompany
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const error = this.validation.validate(body)
    if (error) {
      return badRequest(error)
    }
    await this.addCompany.add(body)
    return conflict()
  }
}
