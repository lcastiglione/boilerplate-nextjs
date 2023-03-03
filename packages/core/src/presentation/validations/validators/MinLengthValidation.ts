import { Either } from '@/core';
import { FieldValidation, InvalidFieldError } from '../common';

/**
 * Validación de longitud mínima del campo
 *
 */
export class MinLengthValidation implements FieldValidation {
  /**
   * @constructor
   * @param field - El nombre del campo a validar
   * @param minLength - La longitud mínima requerida
   */
  constructor(readonly field: string, private readonly minLength: number) {}
  /**
   * Valida si el campo tiene una longitud menor a la longitud mínima requerida
   *
   * @param input - El objeto que contiene el campo a validar
   * @returns - Un objeto Either con un InvalidFieldError en caso de error o un booleano true en caso de éxito
   */
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
