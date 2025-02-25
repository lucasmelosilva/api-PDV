import { makeEmployerMongoRepository } from './make-employer-mongo-repository'
import { EmployerMongoRepository } from '../../../../infra/db/mongodb/employer/employer-mongo-repository'

describe('makeEmployerMongoRepository', () => {
  it('should return an instance of the EmployerMongoRepository', () => {
    const sut = makeEmployerMongoRepository()
    expect(sut).toBeInstanceOf(EmployerMongoRepository)
  })
})
