import { Either } from '../Either';
import { EitherAsync } from '../EitherAsync';

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
    it('should transform the right value of EitherAsync and return a new instance of EitherAsync', async () => {
      const initialEitherAsync = EitherAsync.fromEither<string, number>(
        Either.right(5)
      );
      const fn = (x: number): Promise<Either<string, number>> =>
        EitherAsync.fromEither<string, number>(Either.right(x * 2)).run();

      const expectedEitherAsync = EitherAsync.fromEither<string, number>(
        Either.right(10)
      );

      const resultEitherAsync = initialEitherAsync.flatMap(fn);

      expect(await resultEitherAsync.run()).toEqual(
        await expectedEitherAsync.run()
      );
    });

    it('should return the same left value if the EitherAsync is left', async () => {
      const initialEitherAsync = EitherAsync.fromEither<string, number>(
        Either.left('error')
      );
      const fn = (x: number): Promise<Either<string, number>> =>
        EitherAsync.fromEither<string, number>(Either.right(x * 2)).run();

      const expectedEitherAsync = EitherAsync.fromEither<string, number>(
        Either.left('error')
      );

      const resultEitherAsync = initialEitherAsync.flatMap(fn);

      expect(await resultEitherAsync.run()).toEqual(
        await expectedEitherAsync.run()
      );
    });
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
    it('should transform the left value of EitherAsync and return a new instance of EitherAsync', async () => {
      const initialEitherAsync = EitherAsync.fromEither<string, number>(
        Either.left('error')
      );
      const fn = (x: string): Promise<Either<string, number>> =>
        EitherAsync.fromEither<string, number>(Either.left(`[${x}]`)).run();

      const expectedEitherAsync = EitherAsync.fromEither<string, number>(
        Either.left('[error]')
      );

      const resultEitherAsync = initialEitherAsync.flatMapLeft(fn);

      expect(await resultEitherAsync.run()).toEqual(
        await expectedEitherAsync.run()
      );
    });

    it('should return the same right value if the EitherAsync is right', async () => {
      const initialEitherAsync = EitherAsync.fromEither<string, number>(
        Either.right(5)
      );
      const fn = (x: string): Promise<Either<string, number>> =>
        EitherAsync.fromEither<string, number>(Either.left(`[${x}]`)).run();

      const expectedEitherAsync = EitherAsync.fromEither<string, number>(
        Either.right(5)
      );

      const resultEitherAsync = initialEitherAsync.flatMapLeft(fn);

      expect(await resultEitherAsync.run()).toEqual(
        await expectedEitherAsync.run()
      );
    });
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
      } catch (error: any) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
