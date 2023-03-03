import { Either } from '@/domain/common/Either';
import { FieldValidation, InvalidFieldError } from '../common';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: any): Either<InvalidFieldError, boolean> {
    return input[this.field]?.length < this.minLength
      ? Either.left({
          tag: 'InvalidFieldError',
          message: 'Invalid value',
          field: this.field,
        })
      : Either.right(true);
  }
}
