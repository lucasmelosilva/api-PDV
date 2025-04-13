import { HttpResponse } from '../../protocols/http-response-protocol'

export const conflict = (): HttpResponse => ({
  status: 409,
  body: {}
})
