import { Either, RequiredFieldValidation } from '@/core';
describe('RequiredFieldValidation', () => {
  it('should return InvalidFieldError if field is empty', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: '',
    };
    const result = sut.validate(input);
    expect(result).toEqual(
      Either.left({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field: 'field',
      })
    );
  });

  it('should return InvalidFieldError if field is null', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: null,
    };
    const result = sut.validate(input);
    expect(result).toEqual(
      Either.left({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field: 'field',
      })
    );
  });

  it('should return InvalidFieldError if field is undefined', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {};
    const result = sut.validate(input);
    expect(result).toEqual(
      Either.left({
        tag: 'InvalidFieldError',
        message: 'Obligatory field',
        field: 'field',
      })
    );
  });

  it('should return true if field is not empty', () => {
    const sut = new RequiredFieldValidation('field');
    const input = {
      field: 'test',
    };
    const result = sut.validate(input);
    expect(result).toEqual(Either.right(true));
  });
});
