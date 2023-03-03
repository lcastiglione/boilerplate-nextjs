import { Either } from '@/core';
import { FieldValidation } from '../common/FieldValidation';
import { ValidationError } from '../common/ValidationError';

interface Validation {
  validate: (fieldName: string, input: object) => Either<ValidationError[], boolean>;
}

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: object): Either<ValidationError[], boolean> {
    const validators = this.validators.filter((v) => v.field === fieldName);
    const errors: ValidationError[] = [];
    validators.map((v) =>
      v.validate(input).fold(
        (error) => errors.push(error),
        () => null
      )
    );
    return errors.length > 0 ? Either.left(errors) : Either.right(true);
  }
}
