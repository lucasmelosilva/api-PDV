import { HttpResponse } from '../../protocols/http-response-protocol'

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error
})
