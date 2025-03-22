import { makeEmployerMongoRepository } from '../../../../../main/factories/infra/employer-mongo-repository/make-employer-mongo-repository'
import { DbAuthentication } from '../../../../../data/usecase/employer/authentication/db-authentication'
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter'

export function makeDbAuthentication (): DbAuthentication {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter('bjb&&#!HUĸæ³²³ððđ°?vb9v9b9u24in#T@&T!*!@HUUDU@*')
  const repository = makeEmployerMongoRepository()
  return new DbAuthentication(repository, bcryptAdapter, jwtAdapter, repository)
}
