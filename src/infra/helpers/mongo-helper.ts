import { Collection, MongoClient } from 'mongodb'
import { ProductModel } from '../../domain/models/product-model'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  getCollection (collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  },

  async insertAndFind (data: any, collectionName: string): Promise<any> {
    const collection = this.getCollection(collectionName)
    const { insertedId } = await collection.insertOne(data)
    return collection.findOne({ _id: insertedId })
  },

  map (product: any): ProductModel {
    if (!product) return null
    const { _id, ...productWithoutId } = product
    return { id: _id.toString(), ...productWithoutId }
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
