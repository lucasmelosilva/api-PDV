export interface EmployerModel {
  id: string
  name: string
  password: string
  employerId: string
  companyId: string
  role: 'manager' | 'cashier' | 'super'
}
