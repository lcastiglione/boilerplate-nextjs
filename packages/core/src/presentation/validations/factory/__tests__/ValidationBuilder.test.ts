import {
  CompareFieldsValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder,
} from '@/core';

describe('ValidationBuilder', () => {
  describe('field', () => {
    test('should return a ValidationBuilder', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      expect(validationBuilder).toBeInstanceOf(ValidationBuilder);
    });

    test('should set the fieldName property', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      expect(validationBuilder['fieldName']).toBe('test_field');
    });
  });

  describe('required', () => {
    test('should add a RequiredFieldValidation to the validations array', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      validationBuilder.required();
      expect(validationBuilder['validations']).toEqual([
        new RequiredFieldValidation('test_field'),
      ]);
    });

    test('should return the ValidationBuilder instance', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      const result = validationBuilder.required();
      expect(result).toBe(validationBuilder);
    });
  });

  describe('min', () => {
    test('should add a MinLengthValidation to the validations array', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      validationBuilder.min(3);
      expect(validationBuilder['validations']).toEqual([
        new MinLengthValidation('test_field', 3),
      ]);
    });

    test('should return the ValidationBuilder instance', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      const result = validationBuilder.min(3);
      expect(result).toBe(validationBuilder);
    });
  });

  describe('sameAs', () => {
    test('should add a CompareFieldsValidation to the validations array', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      validationBuilder.sameAs('other_field');
      expect(validationBuilder['validations']).toEqual([
        new CompareFieldsValidation('test_field', 'other_field'),
      ]);
    });

    test('should return the ValidationBuilder instance', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      const result = validationBuilder.sameAs('other_field');
      expect(result).toBe(validationBuilder);
    });
  });

  describe('build', () => {
    test('should return an array of validations', () => {
      const validationBuilder = ValidationBuilder.field('test_field');
      const result = validationBuilder
        .required()
        .min(3)
        .sameAs('other_field')
        .build();
      expect(result).toEqual([
        new RequiredFieldValidation('test_field'),
        new MinLengthValidation('test_field', 3),
        new CompareFieldsValidation('test_field', 'other_field'),
      ]);
    });
  });
});
