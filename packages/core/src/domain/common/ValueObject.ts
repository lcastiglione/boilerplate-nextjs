interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  constructor(protected props: T) {
    const baseProps: any = {
      ...props,
    }
    this.props = baseProps
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (vo.props === undefined) {
      return false
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }

  public clone(): ValueObject<T> {
    const clonedProps: T = JSON.parse(JSON.stringify(this.props))
    return new (this.constructor as any)(clonedProps)
  }
}
