import { CompanyMongoRepository } from '../../../../infra/db/mongodb/company/company-mongo-repository'

export function makeCompanyMongoRepository (): CompanyMongoRepository {
  return new CompanyMongoRepository()
}
