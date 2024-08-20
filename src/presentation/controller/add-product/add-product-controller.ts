import { ProductModel } from '../../../domain/models/product-model'
import { AddProduct } from '../../../domain/usecase/add-product'
import { badRequest } from '../../helper/http/bad-request'
import { ok } from '../../helper/http/ok'
import { Controller } from '../../protocols/controller-protocol'
import { HttpRequest } from '../../protocols/http-request-protocol'
import { HttpResponse } from '../../protocols/http-response-protocol'
import { Validation } from '../../protocols/validation-protocol'

export class AddProductController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request.body)
    if (error) return badRequest(error)
    const product: ProductModel = request.body

    const addedProduct = await this.addProduct.add(product)
    return ok(addedProduct)
  }
}
