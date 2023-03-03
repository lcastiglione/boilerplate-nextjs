import { Either } from '@/core';
import { FieldValidation, InvalidFieldError } from '../common';

/**
 * Validación de campo que compara dos campos para verificar si sus valores son iguales.
 */
export class CompareFieldsValidation implements FieldValidation {
  /**
   * Crea una nueva instancia de CompareFieldsValidation.
   * @param field El nombre del campo a validar.
   * @param fieldToCompare El nombre del campo con el que se comparará el valor del campo a validar.
   */
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  /**
   * Valida si el valor del campo a validar es igual al valor del campo con el que se compara.
   *
   * @param input El objeto que contiene los valores de los campos a validar.
   * @returns Un objeto Either con un valor booleano que indica si la validación fue exitosa o un ValidationError si la validación falló.
   */
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
