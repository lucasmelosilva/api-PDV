import { DbAuthentication } from '../../../../../data/usecase/employer/authentication/db-authentication'

import { makeDbAuthentication } from './make-db-authentication'

describe('MakeDbAuthentication', () => {
  it('should return an instance of DbAuthentication', () => {
    const sut = makeDbAuthentication()
    expect(sut).toBeInstanceOf(DbAuthentication)
  })
})
