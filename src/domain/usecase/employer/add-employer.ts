import { EmployerModel } from '../../models/employer-model'

type AddEmployerModel = Omit<EmployerModel, 'id'>

export interface AddEmployer {
  add (addEmployerModel: AddEmployerModel): Promise<EmployerModel>
}
