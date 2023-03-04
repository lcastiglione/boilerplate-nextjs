import { RequiredFieldValidation } from '@core/presentation/validations/validators';

describe('RequiredFieldValidation', () => {
  it('should return InvalidFieldError if field not exist', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      otherField: true,
    };
    const result = sut.validate(input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) => expect(err).toEqual({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field:'field',
      }),
      () => {}
    );
  });

  it('should return InvalidFieldError if field is empty', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: '',
    };
    const result = sut.validate(input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) => expect(err).toEqual({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field:'field',
      }),
      () => {}
    );
  });

  it('should return InvalidFieldError if field is null', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: null,
    };
    const result = sut.validate(input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) => expect(err).toEqual({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field:'field',
      }),
      () => {}
    );
  });

  it('should return InvalidFieldError if field is undefined', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: undefined,
    };
    const result = sut.validate(input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) => expect(err).toEqual({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field:'field',
      }),
      () => {}
    );
  });

  it('should return true if field is not empty', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: 'test',
    };
    const result = sut.validate(input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });
});
