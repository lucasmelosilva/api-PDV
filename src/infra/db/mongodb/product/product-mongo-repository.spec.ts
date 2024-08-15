import { ProductMongoRepository } from './product-mongo-repository'
import { MongoHelper } from '../../../helpers/mongo-helper'
import { Collection } from 'mongodb'

let productCollection: Collection

describe('ProductMongoRepository', () => {
  beforeAll(async () => {
    const url: string = process.env.MONGO_URL || ''
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    productCollection = MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
  })

  describe('add()', () => {
    it('should return a product on success', async () => {
      const sut = new ProductMongoRepository()
      const result = await sut.addProduct({
        name: 'any_name',
        barCode: 'any_bar_code',
        imageUrl: 'any_image_url',
        price: 212.32
      })
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
      expect(result.name).toBe('any_name')
      expect(result.barCode).toBe('any_bar_code')
      expect(result.imageUrl).toBe('any_image_url')
      expect(result.price).toBe(212.32)
    })
  })

  describe('loadByBarCode()', () => {
    it('should return null if product does not exist', async () => {
      const sut = new ProductMongoRepository()
      const result = await sut.loadByBarCode('7711889900')
      expect(result).toBeFalsy()
    })
  })
})
