import type { TypeDB } from './TypeDB'

export interface Adaptor {
  init: (typeDB: TypeDB<any>) => Promise<void>
  read: () => Promise<any>
  write: (data: any) => Promise<void>
}

export class MemoryAdaptor implements Adaptor {
  data!: any

  async init(typeDB: TypeDB<any>) {
    this.data =
      typeDB.defaultValue || this.getDefaultValueFromSchema(typeDB.schema)
  }

  private getDefaultValueFromSchema(defaultValue: any) {
    return Object.keys(defaultValue).reduce(
      (carry, key) => ({
        ...carry,
        [key]: [],
      }),
      {} as any,
    )
  }

  async read(): Promise<any> {
    return this.data
  }

  async write(data: any): Promise<void> {
    this.data = data
  }
}
