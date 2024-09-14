export interface DeleteProduct {
  delete (barcode: string): Promise<void>
}
