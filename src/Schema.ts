import { OmitUndefined } from './utils'
import { nullable } from './types'
import assert from 'assert'

export class Schema<T> {
  types: T

  constructor(types: T) {
    this.types = types
  }

  getInitialData() {
    return Object.keys(this.types).reduce(
      (carry, key) => ({
        ...carry,
        [key]: [],
      }),
      {} as any,
    )
  }

  validate(data: Partial<{ [k in keyof T]: OmitUndefined<T[k]> }>) {
    Object.keys(data).forEach((key: any) => {
      // @ts-ignore
      Object.keys(this.types[key]).map((column) => {
        // @ts-ignore
        const type = this.types[key][column]
        if (!(type instanceof nullable)) {
          // @ts-ignore
          assert(data[key][column], 'The value should not be null')
        }
      })
    })
  }
}
