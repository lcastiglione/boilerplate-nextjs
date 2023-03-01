/**
 * Tipo genérico de una situación de error. Representa el valor del lado izquierdo de un tipo "Either".
 */
type Left<L> = { tag: 'left'; leftValue: L };

/**
 * Tipo genérico se una situación satisfactoria. Representa el valor del lado derecho de un tipo "Either".
 */
type Right<R> = { tag: 'right'; rightValue: R };

/**
 * Representa un tipo de datos que puede ser uno de dos valores posibles: un valor izquierdo de tipo L, o un valor derecho de tipo R.
 */
type EitherValue<L, R> = Left<L> | Right<R>;

/**
 * La clase Either representa un valor de tipo EitherValue, que puede ser un valor izquierdo de tipo L, o un valor derecho de tipo R.
 */
export class Either<L, R> {
  /**
   * Constructor privado de la clase Either. Se utiliza para asegurarse de que los valores de Either solo pueden ser creados a través de los métodos left() y right().
   *
   */
  private constructor(private readonly value: EitherValue<L, R>) {}

  /**
   * Verifica si el valor actual es satisfactorio o no.
   *
   * @returns 'true' si el valor actual contiene un error.
   */
  isLeft(): boolean {
    return this.value.tag === 'left';
  }

  /**
   * Verifica si el valor actual es satisfactorio o no.
   *
   * @returns 'true' si el valor actual es satisfactorio.
   */
  isRight(): boolean {
    return this.value.tag === 'right';
  }

  /**
   *Recibe dos funciones, ejecutará la primera función en caso de Left y la segunda función en caso de Right, recibiendo el valor de ambos casos por parámetro.
   *
   * @param leftFn Función para manejar errores.
   * @param rightFn Función para manejar valores satisfactorios.
   * @returns El valor de ejecutar la función `leftFn` o `rightFn`.
   */
  fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
    switch (this.value.tag) {
      case 'left':
        return leftFn(this.value.leftValue);
      case 'right':
        return rightFn(this.value.rightValue);
    }
  }

  /**
   * Si el valor del Either es Left pero se ingresa un valor por default, se devuleve el valor por default. Si ya hay un valor satisfactorio, se omite el valor por default. Se usa para que en caso de error, no envie un error sino que use el valor por defecto.
   *
   * @param defaultValue Valor por default para el lado derecho (satisfactorio)
   * @returns Un valor por defecto pasado por parametro en caso de Left, sino sino el valor de Right.
   */
  getOrElse(defaultValue: R): R {
    return this.fold(
      () => defaultValue,
      (someValue) => someValue
    );
  }

  /**
   * Transforma un valor Right a través de una función de mapeo que se pasa por parámetro.
   *
   * @param fn Función que transforma el valor de Right
   * @returns Objeto Either con el valor transformado o un error si no existe valor Right para transformar.
   */
  map<T>(fn: (r: R) => T): Either<L, T> {
    return this.flatMap((r) => Either.right(fn(r)));
  }

  /**
   * Transforma un valor Right a través de una función de mapeo que se pasa por parámetro. `flat` hace referencia a que 'aplana' el resultado porque devuelve el objeto contenido en el objeto Either resultante del mapeo.
   *
   * @param fn Función que transforma el valor de Right
   * @returns El valor de Right transformador o un error si no existe valor Right para transformar.
   */
  flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
    return this.fold(
      (leftValue) => Either.left(leftValue),
      (rightValue) => fn(rightValue)
    );
  }

  /**
   * Si el valor del Either es Left pero se ingresa un mensaje de error por default, se devuleve el valor por default. Si ya hay un valor satisfactorio, se omite el valor por default. Se usa para que en caso de error, no envie un error sino que use el valor por defecto.
   *
   * @param errorMessage Mensaje de error por default para el lado derecho (satisfactorio)
   * @returns Un valor por defecto pasado por parametro en caso de Left, sino sino el valor de Right.
   */
  getOrThrow(errorMessage?: string): R {
    const throwFn = () => {
      throw Error(
        errorMessage
          ? errorMessage
          : 'An error has ocurred: ' + JSON.stringify(this.value)
      );
    };

    return this.fold(
      () => throwFn(),
      (rightValue) => rightValue
    );
  }

  /**
   * Crea un tipo Either en caso de error.
   *
   * @param value Valor Left
   * @returns Nuevo objeto Either con el valor Left cargado.
   */
  static left<L, R>(value: L) {
    return new Either<L, R>({ tag: 'left', leftValue: value });
  }

  /**
   * Crea un tipo Either en caso de éxito.
   *
   * @param value Valor Right
   * @returns Nuevo objeto Either con el valor Right cargado.
   */
  static right<L, R>(value: R) {
    return new Either<L, R>({ tag: 'right', rightValue: value });
  }
}
