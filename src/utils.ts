import { PickByValue } from 'utility-types'

export type OmitUndefined<T> = PickByValue<
  T,
  number | string | Date | boolean
> &
  Partial<T>
