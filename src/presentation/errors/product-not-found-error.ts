export class ProductNotFoundError extends Error {
  constructor (barCode: string) {
    super(`Product not found: ${barCode}`)
    this.name = 'ProductNotFoundError'
  }
}
