import { HttpResponse } from '../../protocols/http-response-protocol'
import { UnauthorizedError } from '../../errors/unauthorized-error'

export const unauthorized = (): HttpResponse => ({
  status: 401,
  body: new UnauthorizedError()
})
