import { Encrypter } from 'data/protocol/cryptography/encrypter'
import { HashComparer } from 'data/protocol/cryptography/hash-comparer'
import { LoadEmployerByEmployerIdRepository } from 'data/protocol/employer/load-employer-by-employer-id-repository'
import { UpdateEmployerAccessTokenRepository } from 'data/protocol/employer/update-employer-access-token-repository'
import { Authentication, AuthenticationParams, AuthenticationResult } from 'domain/usecase/employer/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadEmployerByEmployerIdRepository: LoadEmployerByEmployerIdRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateEmployerAccessTokenRepository: UpdateEmployerAccessTokenRepository
  ) {}

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
    const employer = await this.loadEmployerByEmployerIdRepository.loadByEmployerId(authenticationParams.employerId)
    if (employer) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, employer.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(employer.id)
        const isSave = await this.updateEmployerAccessTokenRepository.updateAccessToken(employer.id, accessToken)
        if (isSave) {
          return {
            name: employer.name,
            companyId: employer.companyId,
            accessToken
          }
        }
      }
    }
    return null
  }
}
