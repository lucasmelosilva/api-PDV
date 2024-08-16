import { Request, Response } from 'express'
import { Controller } from '../../../presentation/protocols/controller-protocol'
import { HttpRequest } from '../../../presentation/protocols/http-request-protocol'
import { HttpResponse } from '../../../presentation/protocols/http-response-protocol'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    let httpRequest: HttpRequest = { body: req.body }
    if (req.file) {
      const imageName = req.file.filename
      const updatedBody = { imageUrl: imageName, ...req.body, price: Number(req.body.price) }
      httpRequest = {
        body: updatedBody
      } satisfies HttpRequest
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.status === 200) {
      res.status(httpResponse.status).json(httpResponse.body)
    } else {
      res.status(httpResponse.status).json({
        error: httpResponse.body.message
      })
    }
  }
}
