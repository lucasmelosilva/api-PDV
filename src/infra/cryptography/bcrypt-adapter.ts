import { HashComparer } from 'data/protocol/cryptography/hash-comparer'
import { Hasher } from '../../data/protocol/cryptography/hasher'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number | string) {}

  async hash (plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt)
  }

  async compare (plaitext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaitext, digest)
  }
}
