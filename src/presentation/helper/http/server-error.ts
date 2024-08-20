import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../protocols/http-response-protocol'

export const serverError = (error: Error): HttpResponse => ({
  status: 500,
  body: new ServerError(error.stack)
})
