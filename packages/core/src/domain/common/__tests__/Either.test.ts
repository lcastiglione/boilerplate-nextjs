import { Either } from '../Either'

export interface ApiFailure {
  kind: 'ApiFailure'
  statusCode: number
}

export interface UnexpectedFailure {
  kind: 'UnexpectedFailure'
  error: Error
}

export interface AnonymousUserFailure {
  kind: 'AnonymousUserFailure'
}

type ProcessFailure = ApiFailure | UnexpectedFailure | AnonymousUserFailure

function createApiFailure(code: number): Either<ApiFailure, number> {
  return Either.left({ kind: 'ApiFailure', statusCode: code })
}

describe('Either Class', () => {
  describe('isLeft and isRight', () => {
    it('should return isLeft equal to true for a left value', () => {
      const result = Either.left({ kind: 'error' })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
    })

    it('should return isRight equal to true for a right value', () => {
      const result = Either.right(5)

      expect(result.isRight()).toBeTruthy()
      expect(result.isLeft()).toBeFalsy()
    })
  })

  describe('fold', () => {
    it('should return expected left for a left value', () => {
      const result = Either.left({ kind: 'error1' })

      result.fold(
        (error) => expect(error.kind).toEqual('error1'),
        () => fail('should be error')
      )
    })

    it('should return expected right for a right value', () => {
      const result = Either.right(5)

      result.fold(
        (error) => fail(error),
        (value) => expect(value).toEqual(5)
      )
    })
  })

  describe('getOrElse', () => {
    it('should getOrElse return default value for left', () => {
      const result = Either.left({ kind: 'error1' })

      expect(result.getOrElse(0)).toEqual(0)
    })

    it('should getOrElse return a right value for right', () => {
      const result = Either.right(5)

      expect(result.getOrElse(0)).toEqual(5)
    })
  })

  describe('map', () => {
    it('should return fail mapped value for a left initial value', () => {
      const result: Either<ProcessFailure, number> = createApiFailure(404)
      const mappedResult = result.map((value) => value * 2)

      mappedResult.fold(
        (error) => expect(error.kind).toEqual('ApiFailure'),
        () => fail('should be error')
      )
    })

    it('should return success mapped value for a initial valid value', () => {
      const result = Either.right(5)
      const mappedResult = result.map((value) => value * 2)

      mappedResult.fold(
        (error) => fail(error),
        (value) => expect(value).toEqual(10)
      )
    })
  })

  describe('flatmap', () => {
    it('should return first error after flatmap for a left initial value', () => {
      const result: Either<ProcessFailure, number> = createApiFailure(404)
      const mappedResult = result.flatMap((value) => Either.right(value * 2))

      mappedResult.fold(
        (error) => expect(error.kind).toEqual('ApiFailure'),
        () => fail('should be error')
      )
    })

    it('should return success mapped value after flatmap for a initial valid value', () => {
      const result = Either.right(5)
      const mappedResult = result.flatMap((value) => Either.right(value * 2))

      mappedResult.fold(
        (error) => fail(error),
        (value) => expect(value).toEqual(10)
      )
    })
  })

  describe('getOrThrow', () => {
    it('should throw an error when called on a left value', () => {
      const leftValue = Either.left('error message')
      expect(() => leftValue.getOrThrow()).toThrow('An error has ocurred: {"kind":"left","leftValue":"error message"}')
    })

    it('should return the right value when called on a right value', () => {
      const rightValue = Either.right(42)
      expect(rightValue.getOrThrow()).toEqual(42)
    })

    it('should throw a custom error message when one is provided and called on a left value', () => {
      const leftValue = Either.left('error message')
      expect(() => leftValue.getOrThrow('custom error message')).toThrow(
        'custom error message'
      )
    })
  })
})
