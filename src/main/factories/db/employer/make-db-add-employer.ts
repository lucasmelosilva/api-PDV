import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { DbAddEmployer } from '@/data/usecase/employer/add-employer/db-add-employer'
import { makeEmployerMongoRepository } from '@/main/factories/infra/employer-mongo-repository/make-employer-mongo-repository'

export function makeDbAddEmployer (): any {
  const bcryptAdapter = new BcryptAdapter(12)
  const employerMongoRepository = makeEmployerMongoRepository()
  return new DbAddEmployer(bcryptAdapter, employerMongoRepository)
}
