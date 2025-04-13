import { makeCompanyMongoRepository } from './make-company-mongo-repository'
import { CompanyMongoRepository } from '../../../../infra/db/mongodb/company/company-mongo-repository'

describe('makeCompanyMongoRepository', () => {
  it('should return an instance of the CompanyMongoRepository', () => {
    const sut = makeCompanyMongoRepository()
    expect(sut).toBeInstanceOf(CompanyMongoRepository)
  })
})
