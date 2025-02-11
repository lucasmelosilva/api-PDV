import { EmployerModel } from '../../../../domain/models/employer-model'
import { AddEmployer, AddEmployerModel } from '../../../../domain/usecase/employer/add-employer'
import { AddEmployerRepository } from '../../../protocol/employer/add-employer-repository'

export class DbAddEmployer implements AddEmployer {
  constructor (
    private readonly addEmployerRepository: AddEmployerRepository
  ) {}

  async add (addEmployerModel: AddEmployerModel): Promise<EmployerModel> {
    await this.addEmployerRepository.addEmployer(addEmployerModel)
    return new Promise(resolve => resolve(null))
  }
}
