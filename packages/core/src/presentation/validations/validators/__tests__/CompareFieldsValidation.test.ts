import { CompareFieldsValidation } from '@core/presentation/validations/validators';

describe('CompareFieldsValidation', () => {
  it('should return true if values are equal', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare');
    const input = {
      field: 'value',
      fieldToCompare: 'value',
    };
    const result = sut.validate(input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });

  it('should return InvalidFieldError if values are different', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare');
    const input = {
      field: 'value1',
      fieldToCompare: 'value2',
    };
    const result = sut.validate(input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) =>
        expect(err).toEqual({
          tag: 'InvalidFieldError',
          message: 'Invalid value',
          field:'field',
        }),
      () => {}
    );
  });
});
