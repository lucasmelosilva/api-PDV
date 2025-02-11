import { EmployerModel } from '../../../domain/models/employer-model'
import { AddEmployerModel } from '../../../domain/usecase/employer/add-employer'

export interface AddEmployerRepository {
  addEmployer (addEmployerModel: AddEmployerModel): Promise<EmployerModel>
}
