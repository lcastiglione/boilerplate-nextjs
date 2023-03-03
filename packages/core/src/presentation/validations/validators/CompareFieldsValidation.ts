import { Either } from '@/domain/common/Either';
import { FieldValidation, InvalidFieldError } from '../common';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: any): Either<InvalidFieldError, boolean> {
    return input[this.field] !== input[this.fieldToCompare]
      ? Either.left({
        tag: 'InvalidFieldError',
        message: 'Invalid value',
        field: this.field,
      })
      : Either.right(true);
  }
}
