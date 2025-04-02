import { EmployerModel } from '../../../domain/models/employer-model'

export interface LoadEmployerByEmployerIdRepository {
  loadByEmployerId (employerId: string): Promise<EmployerModel>
}
