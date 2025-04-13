import { Decrypter } from '../../data/protocol/cryptography/decrypter'
import { Encrypter } from '../../data/protocol/cryptography/encrypter'

import crypto from 'node:crypto'

export class CryptoAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly key: string,
    private readonly algorithm = 'aes-256-gcm'
  ) { }

  async decrypt (ciphertext: string): Promise<string> {
    const data = Buffer.from(ciphertext, 'hex')

    const
      ivSize = data.readUInt8(0)
    const iv = data.slice(1, ivSize + 1)
    const authTag = data.slice(ivSize + 1, ivSize + 17)

    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(this.key), iv)

    decipher.setAuthTag(authTag)

    return Buffer.concat([decipher.update(data.slice(ivSize + 17)), decipher.final()]).toString()
  }

  async encrypt (plaintext: string): Promise<string> {
    const iv = crypto.randomBytes(24)
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), iv)

    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
    const authTag = (cipher as crypto.CipherGCM).getAuthTag()
    const bufferLength = Buffer.alloc(1)

    bufferLength.writeUInt8(iv.length, 0)

    return Buffer.concat([bufferLength, iv, authTag, encrypted]).toString('hex')
  }
}
