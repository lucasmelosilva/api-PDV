import { EmployerModel } from '../../models/employer-model'

type UpdateEmployerModel = Omit<EmployerModel, 'id'>

export interface UpdateEmployer {
  add (employerId: string, updateEmployerModel: UpdateEmployerModel): Promise<EmployerModel>
}
