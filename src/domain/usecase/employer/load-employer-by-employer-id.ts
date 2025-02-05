import { EmployerModel } from '../../models/employer-model'

export interface LoadEmployerEmployerByEmployerId {
  loadByEmployerId (employerId: string): Promise<EmployerModel>
}
