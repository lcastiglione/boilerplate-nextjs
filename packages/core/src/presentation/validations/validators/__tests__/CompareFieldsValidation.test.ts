import { Either } from '@/core';
import { CompareFieldsValidation } from './../CompareFieldsValidation';

describe('CompareFieldsValidation', () => {
  it('should return true if values are equal', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare');
    const input = {
      field: 'value',
      fieldToCompare: 'value',
    };
    const result = sut.validate(input);
    expect(result).toEqual(Either.right(true));
  });

  it('should return InvalidFieldError if values are different', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare');
    const input = {
      field: 'value1',
      fieldToCompare: 'value2',
    };
    const result = sut.validate(input);
    expect(result).toEqual(
      Either.left({
        tag: 'InvalidFieldError',
        message: 'Invalid value',
        field: 'field',
      })
    );
  });
});
