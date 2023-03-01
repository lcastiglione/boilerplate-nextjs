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
   * Transforma un valor Right a través de una función de mapeo que se pasa por parámetro en forma asincrónica.
   *
   * @param fn Función que transforma el valor de Right
   * @returns Objeto EitherAsync con el valor transformado o un error si no existe valor Right para transformar.
   */
  map<T>(fn: (r: R) => T): EitherAsync<L, T> {
    return this.flatMap(async (r) => Either.right(fn(r)));
  }

 /**
   * Transforma un valor Right a través de una función de mapeo que se pasa por parámetro. `flat` hace referencia a que 'aplana' el resultado porque devuelve el objeto contenido en el objeto Either resultante del mapeo.
   *
   * @param fn Función que transforma el valor de Right
   * @returns El valor de Right transformador o un error si no existe valor Right para transformar.
   */
  flatMap<T>(fn: (right: R) => Promise<Either<L, T>>): EitherAsync<L, T> {
    return new EitherAsync<L, T>(async () => {
      const value = await this.promiseValue();

      return value.fold(
        async (leftValue) => Either.left<L, T>(leftValue),
        (rightValue) => fn(rightValue)
      );
    });
  }

   /**
   * Transforma un valor Left a través de una función de mapeo que se pasa por parámetro. `flat` hace referencia a que 'aplana' el resultado porque devuelve el objeto contenido en el objeto Either resultante del mapeo.
   *
   * @param fn Función que transforma el valor de Left.
   * @returns El valor de Left transformador o un error si no existe valor Left para transformar.
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
   * Transforma un valor Left a través de una función de mapeo que se pasa por parámetro en forma asincrónica.
   *
   * @param fn Función que transforma el valor de Left
   * @returns Objeto EitherAsync con el valor transformado o un error si no existe valor Left para transformar.
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
