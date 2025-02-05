import { EmployerModel } from '../../models/employer-model'

export interface LoadAllEmployers {
  loadAll (): Promise<EmployerModel[]>
}
