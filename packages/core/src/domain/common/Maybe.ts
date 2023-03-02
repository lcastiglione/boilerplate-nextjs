/**
 * Representa un valor que no está definido.
 */
type None = { tag: 'none' };

/**
 * Representa un valor que está definido y contiene un valor.
 * @template D Tipo del valor definido.
 */
type Some<D> = { tag: 'some'; someValue: D };

/**
 * Representa un valor que puede estar definido o vacío
 *
 * @template D Tipo del valor definido.
 */
type MaybeValue<D> = None | Some<D>;

/**
 * Clase que representa un valor que puede estar definido o vacío.
 *
 * @template D Tipo del valor definido.
 */
export class Maybe<D> {
  /**
   * Crea una instancia de Maybe.
   *
   * @param {MaybeValue<D>} value El valor contenido en la instancia.
   */
  private constructor(private readonly value: MaybeValue<D>) {}

  /**
   * Indica si el valor está definido.
   *
   * @returns {boolean} `true` si el valor está definido, de lo contrario `false`.
  */
  isDefined(): boolean {
    return this.value.tag === 'some';
  }

  /**
   * Indica si el valor no está definido.
   *
   * @returns {boolean} `true` si el valor no está definido, de lo contrario `false`.
  */
  isEmpty(): boolean {
    return this.value.tag === 'none';
  }

  /**
   * Realiza una operación en función de si el valor está definido o vacío.
   *
   * @template T Tipo de retorno de las funciones de callback.
   * @param leftFn Función de callback para ejecutar si el valor está vacío.
   * @param rightFn Función de callback para ejecutar si el valor está definido.
   * @returns El valor devuelto por la función de callback ejecutada.
   */
  fold<T>(leftFn: () => T, rightFn: (someValue: D) => T): T {
    switch (this.value.tag) {
      case 'none':
        return leftFn();
      case 'some':
        return rightFn(this.value.someValue);
    }
  }

  /**
   * Obtiene el valor contenido en la instancia. Si el valor está vacío, se lanza un error.
   *
   * @returns El valor contenido en la instancia.
   * @throws Si el valor está vacío y no se proporciona un mensaje de error.
   */
  get(): D {
    return this.getOrThrow();
  }

  /**
   * Obtiene el valor contenido en la instancia. Si el valor está vacío, devuelve el valor predeterminado proporcionado.
   *
   * @param defaultValue El valor predeterminado a devolver si el valor está vacío
   * @returns El valor contenido en la instancia o el valor predeterminado proporcionado si el valor está vacío
   */
  getOrElse(defaultValue: D): D {
    return this.fold(
      () => defaultValue,
      (someValue) => someValue
    );
  }

  /**
   * Aplica una función al valor contenido en la instancia, devolviendo una nueva instancia de Maybe con el resultado.
   *
   * @template T Tipo del valor contenido en la nueva instancia de Maybe.
   * @param f Función a aplicar al valor contenido en la instancia.
   * @returns Una nueva instancia de Maybe que contiene el resultado de la aplicación de la función f al valor contenido en la instancia actual.
   */
  flatMap<T>(f: (wrapped: D) => Maybe<T>): Maybe<T> {
    return this.fold(
      () => Maybe.none(),
      (someValue) => f(someValue)
    );
  }

  /**
   * Aplica una función al valor contenido en la instancia, devolviendo una nueva instancia de Maybe con el resultado.
   *
   * @template T Tipo del valor contenido en la nueva instancia de Maybe.
   * @param f Función a aplicar al valor contenido en la instancia
   * @returns Una nueva instancia de Maybe que contiene el resultado de la aplicación de la función f al valor contenido en la instancia actual.
   */
  map<T>(f: (wrapped: D) => T): Maybe<T> {
    return this.flatMap((data) => Maybe.fromValue(f(data)));
  }

  /**
   * Devuelve el valor contenido en la instancia, lanzando un error si la instancia está vacía.
   *
   * @param errorMessage Mensaje de error a lanzar si la instancia está vacía
   * @returns El valor contenido en la instancia
   * @throws Si la instancia está vacía y no se proporciona un mensaje de error, o si se proporciona un mensaje de error vacío.
   */
  getOrThrow(errorMessage?: string): D {
    const throwFn = () => {
      throw Error(errorMessage ? errorMessage : 'Value is empty');
    };

    return this.fold(
      () => throwFn(),
      (someValue) => someValue
    );
  }

  /**
   * Devuelve una nueva instancia de Maybe que contiene un valor.
   * @template D Tipo del valor contenido en la instancia.
   * @param value Valor contenido en la instancia.
   * @returns Una nueva instancia de Maybe que contiene el valor proporcionado.
   */
  static some<D>(value: D): Maybe<D> {
    if (!value) {
      throw Error('Provided value must not be empty');
    }
    return new Maybe({ tag: 'some', someValue: value });
  }

  /**
   * Devuelve una nueva instancia de Maybe que no contiene ningún valor.
   *
   * @template D Tipo del valor contenido en la instancia.
   * @returns Una nueva instancia de Maybe vacía.
   */
  static none<D>(): Maybe<D> {
    return new Maybe({ tag: 'none' });
  }

  /**
   * Devuelve una nueva instancia de Maybe a partir del valor proporcionado, que puede ser nulo o indefinido.
   *
   * @template D Tipo del valor contenido en la instancia.
   * @param value Valor a incluir en la nueva instancia de Maybe.
   * @returns Una nueva instancia de Maybe que contiene el valor proporcionado, o una instancia vacía si el valor es nulo o indefinido.
   */
  static fromValue<D>(value: D | undefined | null): Maybe<D> {
    return !value ? Maybe.none() : Maybe.some(value);
  }
}
