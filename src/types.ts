// Utility type
declare type ValueOf<T> = T[keyof T]
declare type ElementType<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never

export class types {
  static get number(): number {
    return 0
  }

  static get string(): string {
    return ''
  }

  static get boolean(): boolean {
    return false
  }

  static nullable: {
    number?: number
    string?: string
    boolean?: boolean
  } = types
}
