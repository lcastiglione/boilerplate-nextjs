import { Either } from '../Either';
import { EitherAsync } from '../EitherAsync';

//TODO: Revisar bien porque alunos test no están bien hechos y otros faltan
describe('EitherAsync', () => {
  describe('map', () => {
    it('should apply the function to the right value and return a new EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.right(2))
        .map((x) => x * 2)
        .run();

      expect(result).toEqual(Either.right(4));
    });

    it('should return a new EitherAsync with the same left value if called on a left EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.left('error'))
        .map((x) => (x as number) * 2)
        .run();

      expect(result).toEqual(Either.left('error'));
    });
  });

  describe('flatMap', () => {
    /*
    it('should apply the function to the right value and return the resulting EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.right(2))
        .flatMap((x) => EitherAsync.fromEither(Either.right(x * 2)))
        .run();

      expect(result).toEqual(Either.right(4));
    });

    it('should return a new EitherAsync with the same left value if called on a left EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.left('error'))
        .flatMap((x) => EitherAsync.fromEither(Either.right(x * 2)))
        .run();

      expect(result).toEqual(Either.left('error'));
    });
    */
  });

  describe('mapLeft', () => {
    it('should apply the function to the left value and return a new EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.left('error'))
        .mapLeft((x) => x.toUpperCase())
        .run();

      expect(result).toEqual(Either.left('ERROR'));
    });

    it('should return a new EitherAsync with the same right value if called on a right EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.right(2))
        .mapLeft((x) => (x as string).toUpperCase())
        .run();

      expect(result).toEqual(Either.right(2));
    });
  });

  describe('flatMapLeft', () => {
    /*
    it('should apply the function to the left value and return the resulting EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.left('error'))
        .flatMapLeft((x) =>
          EitherAsync.fromEither(Either.left(x.toUpperCase()))
        )
        .run();

      expect(result).toEqual(Either.left('ERROR'));
    });

    it('should return a new EitherAsync with the same right value if called on a right EitherAsync', async () => {
      const result = await EitherAsync.fromEither(Either.right(2))
        .flatMapLeft((x) =>
          EitherAsync.fromEither(Either.left(x.toUpperCase()))
        )
        .run();

      expect(result).toEqual(Either.right(2));
    });
    */
  });

  describe('run', () => {
    it('should return the underlying Promise', async () => {
      const promise = Promise.resolve(Either.right(2));
      const eitherAsync = EitherAsync.fromPromise(promise);

      const result = await eitherAsync.run();

      expect(result).toEqual(Either.right(2));
    });
  });

  describe('fromEither', () => {
    it('should return a new EitherAsync with the same value', async () => {
      const either = Either.right(2);
      const result = await EitherAsync.fromEither(either).run();

      expect(result).toEqual(either);
    });
  });

  describe('fromPromise', () => {
    it('should return an EitherAsync instance with a resolved Either if the promise resolves with a right Either', async () => {
      const rightValue = 42;
      const promise = Promise.resolve(Either.right<number, number>(rightValue));
      const eitherAsync = EitherAsync.fromPromise(promise);

      const result = await eitherAsync.run();

      expect(result.isRight()).toBe(true);
      expect(result.getOrElse(0)).toBe(rightValue);
    });

    it('should return an EitherAsync instance with a resolved Either if the promise resolves with a left Either', async () => {
      const leftValue = 'Something went wrong';
      const promise = Promise.resolve(Either.left<string, number>(leftValue));
      const eitherAsync = EitherAsync.fromPromise<string, number>(promise);

      const result: Either<string, number> = await eitherAsync.run();

      expect(result.isLeft()).toBe(true);
      expect(
        result.fold(
          () => 0,
          (l) => l
        )
      ).toBe(0);
    });

    it('should return an EitherAsync instance with a rejected Either if the promise rejects with an error', async () => {
      const errorMessage = 'Something went terribly wrong';
      const promise = Promise.reject(new Error(errorMessage));
      const eitherAsync = EitherAsync.fromPromise(promise);

      try {
        await eitherAsync.run();
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe(errorMessage);
        }
        console.log('No se está ejecutando el error: ', error);
      }
    });
  });
});
