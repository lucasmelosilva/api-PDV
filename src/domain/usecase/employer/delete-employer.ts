export interface DeleteEmployer {
  delete (employerId: string): Promise<void>
}
