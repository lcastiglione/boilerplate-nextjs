import { Either } from '@/core';
import { FieldValidation } from '../common/FieldValidation';
import { ValidationError } from '../common/ValidationError';

/**
 * Interfaz para una validación que se puede aplicar a un campo.
 *
 */
interface Validation {
  validate: (fieldName: string, input: object) => Either<ValidationError[], boolean>;
}

/**
 * Clase que representa una colección de validaciones que se aplican a los campos de un formulario.
 *
 */
export class ValidationComposite implements Validation {
  /**
   * Constructor privado. Crea una nueva instancia de ValidationComposite.
   *
   * @param - Una lista de validaciones que se aplicarán a los campos.
   */
  private constructor(private readonly validators: FieldValidation[]) {}

  /**
   * Método estático que construye una instancia de ValidationComposite a partir de una lista de validaciones.
   *
   * @param validators - Una lista de validaciones que se aplicarán a los campos.
   * @returns - Una nueva instancia de ValidationComposite.
   */
  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  /**
   * Método para validar un campo.
   *
   * @param fieldName - El nombre del campo a validar.
   * @param input - Un objeto que contiene los valores de los campos.
   * @returns - Un objeto Either que contiene la lista de errores de validación o un booleano que indica si la validación pasó.
   */
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
