import type { DB } from './DB'

export interface Adaptor {
  init: (typeDB: DB<any>) => Promise<void>
  read: () => Promise<any>
  write: (data: any) => Promise<void>
}

export class MemoryAdaptor implements Adaptor {
  data!: any

  async init(typeDB: DB<any>) {
    this.data = typeDB.data
  }

  async read(): Promise<any> {
    return this.data
  }

  async write(data: any): Promise<void> {
    this.data = data
  }
}
