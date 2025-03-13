import { HashComparer } from 'data/protocol/cryptography/hash-comparer'
import { LoadEmployerByEmployerIdRepository } from 'data/protocol/employer/load-employer-by-employer-id-repository'
import { Authentication, AuthenticationParams, AuthenticationResult } from 'domain/usecase/employer/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadEmployerByEmployerIdRepository: LoadEmployerByEmployerIdRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
    const employer = await this.loadEmployerByEmployerIdRepository.loadByEmployerId(authenticationParams.employerId)
    if (employer) {
      await this.hashComparer.compare(authenticationParams.password, employer.password)
    }
    return null
  }
}
