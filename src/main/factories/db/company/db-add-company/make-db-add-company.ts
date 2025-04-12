import { AddCompany } from '../../../../../domain/usecase/company/add-company'
import { DbAddCompany } from '../../../../../data/usecase/company/add-company/db-add-company'
import { CryptoAdapter } from '../../../../../infra/cryptography/crypto-adapter'
import { makeCompanyMongoRepository } from '../../../../../main/factories/infra/company-mongo-repository/make-company-mongo-repository'

export const makeDbAddCompany = (): AddCompany => {
  const cryptoAdapter = new CryptoAdapter(process.env.CRYPTOGRAPH_KEY)
  return new DbAddCompany(cryptoAdapter, makeCompanyMongoRepository())
}
