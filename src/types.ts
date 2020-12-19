type LiteralType = 'number' | 'string' | 'boolean'

export class types {
  type: LiteralType

  constructor(type: LiteralType) {
    this.type = type
  }

  static number(): number {
    return new types('number') as any
  }

  static string(): string {
    return new types('string') as any
  }

  static boolean(): boolean {
    return new types('boolean') as any
  }

  static nullable() {
    return nullable
  }
}

export class nullable {
  type: LiteralType

  constructor(type: LiteralType) {
    this.type = type
  }

  static number(): number | undefined {
    return new nullable('number') as any
  }

  static string(): string | undefined {
    return new nullable('string') as any
  }

  static boolean(): boolean | undefined {
    return new nullable('boolean') as any
  }
}
