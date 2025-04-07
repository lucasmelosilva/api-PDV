import { DbAddCompany } from './db-add-company'
import { AddCompanyModel } from '../../../../domain/usecase/company/add-company'
import { Encrypter } from '../../../protocol/cryptography/encrypter'

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
}

function makeSut (): SutTypes {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddCompany(encrypterStub)
  return {
    sut,
    encrypterStub
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
})
