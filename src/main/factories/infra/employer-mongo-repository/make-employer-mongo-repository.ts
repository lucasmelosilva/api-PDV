import { EmployerMongoRepository } from '../../../../infra/db/mongodb/employer/employer-mongo-repository'

export function makeEmployerMongoRepository (): EmployerMongoRepository {
  return new EmployerMongoRepository()
}
