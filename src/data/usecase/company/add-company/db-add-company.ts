import { AddCompanyRepository } from 'data/protocol/company/add-company-repository'
import { Encrypter } from 'data/protocol/cryptography/encrypter'
import { CompanyModel } from 'domain/models/company-model'
import { AddCompany, AddCompanyModel } from 'domain/usecase/company/add-company'

export class DbAddCompany implements AddCompany {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addCompanyRepository: AddCompanyRepository
  ) {}

  async add (addCompanyModel: AddCompanyModel): Promise<CompanyModel> {
    const encryptedValue = await this.encrypter.encrypt(addCompanyModel.cnpj)
    await this.addCompanyRepository.addCompany({ ...addCompanyModel, cnpj: encryptedValue })
    return null
  }
}
