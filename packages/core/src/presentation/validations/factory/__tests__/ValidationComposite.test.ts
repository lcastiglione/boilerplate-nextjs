import {
  Either,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/core';

describe('ValidationComposite', () => {
  test('should return an empty array if all validations pass', () => {
    const sut = ValidationComposite.build([
      new RequiredFieldValidation('field1'),
      new RequiredFieldValidation('field2'),
    ]);
    const input = { field1: 'value1', field2: 'value2' };
    const result = sut.validate('field1', input);
    expect(result).toEqual(Either.right(true));
  });

  test('should return a list of errors if any validation fails', () => {
    const sut = ValidationComposite.build([
      new RequiredFieldValidation('field1'),
      new RequiredFieldValidation('field2'),
    ]);
    const input = { field1: '', field2: 'value2' };
    const result = sut.validate('field1', input);
    expect(result).toEqual(
      Either.left([
        {
          field: 'field1',
          message: 'Obligatory field',
          tag: 'InvalidFieldError',
        },
      ])
    );
  });

  test('should return a list of errors for multiple failing validations', () => {
    const sut = ValidationComposite.build([
      new RequiredFieldValidation('field1'),
      new MinLengthValidation('field2', 3),
    ]);
    const input = { field1: '', field2: 'v' };
    const result = sut.validate('field1', input);
    expect(result).toEqual(
      Either.left([
        {
          field: 'field1',
          message: 'Obligatory field',
          tag: 'InvalidFieldError',
        },
        { field: 'field2', message: 'Invalid value', tag: 'InvalidFieldError' },
      ])
    );
  });
});
