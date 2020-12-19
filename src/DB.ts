import { Adaptor } from './adaptors'
import { randomString } from 'remeda'
import { OmitUndefined } from './utils'
import { Schema } from './Schema'

export interface TypeDBConstruct<T> {
  adaptor: Adaptor
  schema: T
  defaultValue?: T
}

export class DB<T> {
  schema: Schema<T>
  data: T
  adaptor: Adaptor

  constructor(args: TypeDBConstruct<T>) {
    const schema = new Schema(args.schema)
    this.adaptor = args.adaptor
    this.schema = schema
    if (args.defaultValue) {
      this.data = args.defaultValue
    } else {
      this.data = schema.getInitialData()
    }
  }

  async init() {
    await this.adaptor.init(this)
    this.data = await this.adaptor.read()
  }

  table<K extends keyof T>(tableName: K) {
    // @ts-ignore
    return new Query<T[K]>(this.data[tableName], this.schema, tableName)
  }
}

export class Query<T> {
  table: T[]
  schema: Schema<T>
  filters: Array<(t: T) => boolean> = []
  tableName: string

  constructor(table: T[], schema: Schema<T>, tableName: string) {
    this.table = table
    this.schema = schema
    this.tableName = tableName
  }

  then<N>(callback: (data: T[]) => N) {
    const resolved = this.filters.reduce((res, filter) => {
      return res.filter(filter)
    }, this.table)
    callback(resolved)
  }

  insert(data: OmitUndefined<T>) {
    // @ts-ignore
    this.schema.validate({
      [this.tableName]: data,
    })

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
