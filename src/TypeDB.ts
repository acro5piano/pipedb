import { Adaptor } from './adaptors'
import { randomString } from 'remeda'
import { PickByValue } from 'utility-types'

export interface TypeDBConstruct<T> {
  adaptor: Adaptor
  schema: T
  defaultValue?: T
}

export class TypeDB<T> {
  schema: T
  data: T
  adaptor: Adaptor
  defaultValue?: T

  constructor(args: TypeDBConstruct<T>) {
    this.adaptor = args.adaptor
    this.schema = args.schema
    this.data = args.schema
    this.defaultValue = args.defaultValue
  }

  async init() {
    await this.adaptor.init(this)
    this.data = await this.adaptor.read()
  }

  table<K extends keyof T>(tableName: K) {
    // @ts-ignore
    return new Query<T[K]>(this.data[tableName])
  }
}

type OmitUndefined<T> = PickByValue<T, number | string | Date | boolean> &
  Partial<T>

export class Query<T> {
  table: T[]
  filters: Array<(t: T) => boolean> = []

  constructor(table: T[]) {
    this.table = table
  }

  then<N>(callback: (data: T[]) => N) {
    const resolved = this.filters.reduce((res, filter) => {
      return res.filter(filter)
    }, this.table)
    callback(resolved)
  }

  insert(data: OmitUndefined<T>) {
    const createdAt = new Date()
    const _data = {
      id: randomString(16),
      createdAt,
      updatedAt: createdAt,
      ...data,
    }
    // @ts-ignore
    this.table.push(_data)
    return _data
  }

  whereNotNull(field: keyof T) {
    this.filters.push((x) => x[field] !== null && x[field] !== undefined)
    return this
  }

  async first() {
    const resolved = this.filters.reduce((res, filter) => {
      return res.filter(filter)
    }, this.table)
    return resolved[0]
  }
}
