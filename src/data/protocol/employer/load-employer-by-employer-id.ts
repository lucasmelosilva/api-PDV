import { EmployerModel } from '../../../domain/models/employer-model'

export interface LoadEmployerByEmployerId {
  loadByEmployerId (employerId: string): Promise<EmployerModel>
}
