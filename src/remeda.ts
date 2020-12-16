export * from 'remeda'
import * as R from 'remeda'

export function insert<T>(data: T | T[]) {
  return function _insert(table: Partial<T>) {
    const createdAt = new Date()
    const _data = {
      id: R.randomString(16),
      createdAt,
      updatedAt: createdAt,
      ...data,
    }
    // @ts-ignore
    table.push(_data)
    return _data
  }
}
