import { DbAddCompany } from './db-add-company'
import { AddCompanyModel } from '../../../../domain/usecase/company/add-company'
import { Encrypter } from '../../../protocol/cryptography/encrypter'
import { AddCompanyRepository } from '../../../protocol/company/add-company-repository'
import { CompanyModel } from '../../../../domain/models/company-model'

function makeAddCompanyRepository (): AddCompanyRepository {
  class AddCompanyRepositoryStub implements AddCompanyRepository {
    async addCompany (addCompanyModel: AddCompanyModel): Promise<CompanyModel> {
      return new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        cnpj: 'encrypted_value'
      }))
    }
  }

  return new AddCompanyRepositoryStub()
}

function makeEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (plaintext: string): Promise<string> {
      return new Promise(resolve => resolve('encrypted_value'))
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddCompany
  encrypterStub: Encrypter
  addCompanyRepositoryStub: AddCompanyRepository
}

function makeSut (): SutTypes {
  const encrypterStub = makeEncrypter()
  const addCompanyRepositoryStub = makeAddCompanyRepository()
  const sut = new DbAddCompany(encrypterStub, addCompanyRepositoryStub)
  return {
    sut,
    encrypterStub,
    addCompanyRepositoryStub
  }
}

function makeFakeCompany (): AddCompanyModel {
  return {
    name: 'any_name',
    cnpj: 'any_cnpj'
  }
}

describe('DbAddCompany', () => {
  it('should call Encrypter with correct values', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const fakeCompany = makeFakeCompany()
    await sut.add(fakeCompany)
    expect(encryptSpy).toHaveBeenCalledWith(fakeCompany.cnpj)
  })

  it('should return null if Encrypter fails', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise(resolve => resolve(null as any)))
    const result = await sut.add(makeFakeCompany())
    expect(result).toBeNull()
  })

  it('should calls AddCompanyRepository with correct values', async () => {
    const { sut, addCompanyRepositoryStub } = makeSut()
    const addCompanySpy = jest.spyOn(addCompanyRepositoryStub, 'addCompany')
    const fakeCompany = makeFakeCompany()
    await sut.add(fakeCompany)
    expect(addCompanySpy).toHaveBeenCalledWith({ ...fakeCompany, cnpj: 'encrypted_value' })
  })
})
