import { Either } from '@/domain/common/Either';
import { FieldValidation, RequiredFieldError } from '../common';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: any): Either<RequiredFieldError, boolean> {
    return input[this.field]
      ? Either.left({
          tag: 'InvalidFieldError',
          message: 'Obligatory field',
          field: this.field,
        })
      : Either.right(true);
  }
}
