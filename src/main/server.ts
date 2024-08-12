import { MongoHelper } from '../infra/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('../main/config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }, (error) => console.log(error))
