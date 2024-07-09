import { HttpResponse } from '../../protocols/http-response-protocol'

export const ok = (value: any): HttpResponse => ({
  status: 200,
  body: value
})
