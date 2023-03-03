import { Either } from '@/core';
import { FieldValidation, RequiredFieldError } from '../common';

/**
 * Clase que implementa la validación de un campo requerido
 *
 */
export class RequiredFieldValidation implements FieldValidation {
  /**
   * @constructor
   * @param field - El nombre del campo a validar
   */
  constructor(readonly field: string) {}

  /**
   * Método que valida si un campo está vacío o nulo
   *
   * @param input - El valor del campo a validar
   * @returns - Retorna un Either con un RequiredFieldError si el campo es vacío o nulo, o un boolean true si la validación es correcta
   */
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
