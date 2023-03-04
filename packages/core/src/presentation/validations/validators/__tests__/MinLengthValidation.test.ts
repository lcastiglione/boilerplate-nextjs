import { MinLengthValidation } from '@core/presentation/validations/validators';

describe('MinLengthValidation', () => {
  const field = 'myField';
  const minLength = 5;
  const sut = new MinLengthValidation(field, minLength);

  it('should return left if field length is less than minLength', () => {
    const input = { [field]: '1234' };
    const result= sut.validate(input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) =>
        expect(err).toEqual({
          tag: 'InvalidFieldError',
          message: 'Invalid value',
          field,
        }),
      () => {}
    );
  });

  it('should return right if field length is equal to minLength', () => {
    const input = { [field]: '12345' };
    const result = sut.validate(input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });

  it('should return right if field length is greater than minLength', () => {
    const input = { [field]: '123456' };
    const result = sut.validate(input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });

  it('should return right if field is null', () => {
    const input = { [field]: null };
    const result = sut.validate(input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });

  it('should return right if field is undefined', () => {
    const input = {};
    const result = sut.validate(input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });
});
