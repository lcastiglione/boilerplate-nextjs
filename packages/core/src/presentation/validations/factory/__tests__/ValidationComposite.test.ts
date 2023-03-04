import { ValidationComposite } from '@core/presentation/validations/factory';
import {
  MinLengthValidation,
  RequiredFieldValidation,
  CompareFieldsValidation,
} from '@core/presentation/validations/validators';

describe('ValidationComposite', () => {
  test('should return an empty array if all validations pass', () => {
    const sut = ValidationComposite.build([
      new RequiredFieldValidation('field1'),
      new RequiredFieldValidation('field2'),
    ]);
    const input = { field1: 'value1', field2: 'value2' };
    const result = sut.validate('field1', input);
    expect(result.isRight()).toBe(true);
    result.fold(
      () => {},
      (value) => expect(value).toBeTruthy()
    );
  });

  test('should return a list of errors if any validation fails', () => {
    const sut = ValidationComposite.build([
      new RequiredFieldValidation('field1'),
      new RequiredFieldValidation('field2')
    ]);
    const input = { field1: '', field2: 'value2' };
    const result = sut.validate('field1', input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) => {
        expect(err.length).toEqual(1);
        expect(err).toEqual([
          {
            tag: 'InvalidFieldError',
            message: 'Obligatory field',
            field: 'field1',
          },
        ]);
        return;
      },
      () => {}
    );
  });

  test('should return a list of errors for multiple failing validations', () => {
    const sut = ValidationComposite.build([
      new RequiredFieldValidation('field1'),
      new MinLengthValidation('field1', 3),
      new CompareFieldsValidation('field1', 'field2')
    ]);
    const input = { field1: '',field2:'r'};
    const result = sut.validate('field1', input);
    expect(result.isLeft()).toBe(true);
    result.fold(
      (err) => {
        expect(err.length).toEqual(3);
        expect(err).toEqual([

          {
            tag: 'InvalidFieldError',
            message: 'Obligatory field',
            field: 'field1',
          },
          {
            tag: 'InvalidFieldError',
            message: 'Invalid value',
            field: 'field1',
          },
          {
            tag: 'InvalidFieldError',
            message: 'Invalid value',
            field:'field1',
          }
        ]);
        return;
      },
      () => {}
    );
  });
});
