import { DbAddEmployer } from '../../../../data/usecase/employer/add-employer/db-add-employer'

import { makeDbAddEmployer } from './make-db-add-employer'

describe('MakeDbAddEmployer', () => {
  it('should return an instance of AddEmployer', () => {
    const sut = makeDbAddEmployer()
    expect(sut).toBeInstanceOf(DbAddEmployer)
  })
})
