import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    readdirSync(`${__dirname}/../routes`).map(async file => {
      if (!file.includes('.test.')) {
        (await import(`../routes/${file}`)).default(router)
      }
    })
  }
}
