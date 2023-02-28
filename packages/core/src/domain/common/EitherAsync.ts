import { Either } from './Either';
/**
 * La clase EitherAsync representa un valor de tipo EitherValue en forma asincrónica, que puede ser un valor izquierdo de tipo L, o un valor derecho de tipo R.
 */
export class EitherAsync<L, R> {
  /**
   * Constructor privado de la clase EitherAsync. Crear a través de una promesa un nuevo objeto Either
   *
   * @param promiseValue Una función que devuelve una promesa con un valor `Either`.
   */
  private constructor(
    private readonly promiseValue: () => Promise<Either<L, R>>
  ) {}

  /**
   * Convierte el valor de Right a través de la función que se pasa por parámetro en forma asincrónica.
   *
   * @param fn Una función que procesa el valor de `Right`.
   * @returns Devuelve un objeto `EitherAsync` que contiene el resultado de la aplicación de la función `fn`. Si no existe un valor `Right`, devuelve un objeto `Either` con un error.
   */
  map<T>(fn: (r: R) => T): EitherAsync<L, T> {
    return this.flatMap(async (r) => Either.right(fn(r)));
  }

  /**
   * Mismo funcionamiento que `map` pero para valores `Either` anidados.
   *
   * @param fn Una función que procesa el valor de `Right`.
   * @returns Devuelve un objeto `EitherAsync` que contiene el resultado de la aplicación de la función `fn`. Si no existe un valor `Right`, devuelve un objeto `Either` con un error.
   */
  flatMap<T>(fn: (right: R) => Promise<Either<L, T>>): EitherAsync<L, T> {
    return new EitherAsync<L, T>(async () => {
      const value = await this.promiseValue();

      return value.fold(
        async (rightValue) => Either.left<L, T>(rightValue),
        (rightValue) => fn(rightValue)
      );
    });
  }

  /**
   * Mismo funcionamiento que `flatMap` pero para valores `Left`.
   *
   * @param fn Una función que procesa el valor de `Left`.
   * @returns Devuelve un objeto `EitherAsync` que contiene el resultado de la aplicación de la función `fn`. Si no existe un valor `Left`, devuelve un objeto `Either` con un error.
   */
  flatMapLeft<T>(fn: (left: L) => Promise<Either<T, R>>): EitherAsync<T, R> {
    return new EitherAsync<T, R>(async () => {
      const value = await this.promiseValue();

      return value.fold(
        (leftValue) => fn(leftValue),
        async (rightValue) => Either.right<T, R>(rightValue)
      );
    });
  }

  /**
   * Mismo funcionamiento que `map` pero para valores `Left`.
   *
   * @param fn Una función que procesa el valor de `Left`.
   * @returns Devuelve un objeto `EitherAsync` que contiene el resultado de la aplicación de la función `fn`. Si no existe un valor `Left`, devuelve un objeto `Either` con un error.
   */
  mapLeft<T>(fn: (l: L) => T): EitherAsync<T, R> {
    return this.flatMapLeft(async (l) => Either.left(fn(l)));
  }

  /**
 * Ejecuta la promesa subyacente y devuelve el resultado. Si la promesa se resuelve con un valor izquierdo, devolverá una instancia de `Either` con el valor izquierdo, de lo contrario, devolverá una instancia de `Either` con el valor derecho.
 *
 * @returns Una promesa que se resuelve en un objeto Either que contiene el valor izquierdo o derecho.
 */
  run(): Promise<Either<L, R>> {
    return this.promiseValue();
  }

  /**
 * Crea una instancia de `EitherAsync` a partir de un objeto `Either`.
 *
 * @param value El objeto `Either` a partir del cual se creará una instancia de `EitherAsync`.
 * @returns Una nueva instancia de `EitherAsync` creada a partir del objeto `Either` proporcionado.
 */
  static fromEither<L, R>(value: Either<L, R>): EitherAsync<L, R> {
    return new EitherAsync<L, R>(() => Promise.resolve(value));
  }

  /**
 * Crea una instancia de `EitherAsync` a partir de una promesa que resuelve en un objeto `Either`.
 *
 * @param value La promesa que resuelve en un objeto `Either`.
 * @returns Una nueva instancia de `EitherAsync` creada a partir de la promesa proporcionada.
 */
  static fromPromise<L, R>(value: Promise<Either<L, R>>): EitherAsync<L, R> {
    return new EitherAsync<L, R>(() => value);
  }
}
