import { EmployerModel } from '../../../../domain/models/employer-model'
import { AddEmployer, AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { Hasher } from '../../../protocol/cryptography/hasher'
import { AddEmployerRepository } from '../../../protocol/employer/add-employer-repository'

export class DbAddEmployer implements AddEmployer {
  constructor (
    private readonly hasher: Hasher,
    private readonly addEmployerRepository: AddEmployerRepository
  ) {}

  async add (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
    const { password } = addEmployerModel
    const hashedPassword = await this.hasher.hash(password)
    const result = await this.addEmployerRepository.addEmployer({ ...addEmployerModel, password: hashedPassword })
    return result
  }
}
