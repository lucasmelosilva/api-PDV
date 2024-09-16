export interface DeleteProductRepository {
  delete (barcode: string): Promise<void>
}
