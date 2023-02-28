/**
 * Interfaz que define un índice de propiedad genérico para el la clase `ValueObject`.
 */
interface ValueObjectProps {
  [index: string]: any;
}

/**
 * Clase que define un `ValueObject` genérico que puede ser extendido para implementar objetos específicos.
 *
 * @param T - El tipo de las propiedades del objeto de valor.
 */
export abstract class ValueObject<T extends ValueObjectProps> {
  /**
   * Crea una nueva instancia de un `ValueObject`.
   *
   * @param props - Las propiedades del `ValueObject`.
   */
  constructor(protected props: T) {
    const baseProps: any = {
      ...props,
    };
    this.props = baseProps;
  }

  /**
   * Crea una nueva instancia de un `ValueObject`.
   *
   * @param props - Las propiedades del `ValueObject`.
   * @returns Una nueva instancia de un `ValueObject`.
   * @throws Un error si una subclase no implementa `create`.
   */
  public static create(props: ValueObjectProps): ValueObject<ValueObjectProps> {
    throw new Error('create not defined');
  }

  /**
   * Determina si este `ValueObject` es igual a otro.
   *
   * @param vo - El `ValueObject` a comparar.
   * @returns `true` si los value objects son iguales; de lo contrario, `false`.
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (!vo || !(vo instanceof ValueObject)) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  /**
   * Crea una copia de este `ValueObject`.
   *
   * @returns Un nuevo `ValueObject` que es una copia de este `ValueObject`.
   */
  public clone(): ValueObject<T> {
    const clonedProps: T = JSON.parse(JSON.stringify(this.props));
    return new (this.constructor as any)(clonedProps);
  }
}
