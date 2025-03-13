import { LoadEmployerByEmployerIdRepository } from 'data/protocol/employer/load-employer-by-employer-id-repository'
import { Authentication, AuthenticationParams, AuthenticationResult } from 'domain/usecase/employer/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadEmployerByEmployerIdRepository: LoadEmployerByEmployerIdRepository
  ) {}

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
    await this.loadEmployerByEmployerIdRepository.loadByEmployerId(authenticationParams.employerId)
    return null
  }
}
