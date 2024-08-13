import { ProductNotFoundError } from '../../errors/product-not-found-error'
import { HttpResponse } from '../../protocols/http-response-protocol'

export const notFound = (barCode: string): HttpResponse => ({
  status: 404,
  body: {
    error: new ProductNotFoundError(barCode).message
  }
})
