import {
  RequiredFieldValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '../validators';
import { FieldValidation } from '../common/FieldValidation';

/**
 * Clase para construir reglas de validación para un campo.
 */
export class ValidationBuilder {
  /**
   * Constructor privado. Crea una instancia de ValidationBuilder.
   * @param fieldName - El nombre del campo que se está validando.
   * @param validations - Un array de validaciones de campo.
   */
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  /**
   * Método estático que devuelve una instancia de ValidationBuilder para el campo especificado.
   *
   * @param fieldName - El nombre del campo que se está validando.
   * @returns - Una nueva instancia de ValidationBuilder.
   */
  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  /**
   * Agrega una regla de validación de campo requerido a la instancia de ValidationBuilder.
   *
   * @returns - La instancia de ValidationBuilder actualizada.
   */
  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  /**
   * Agrega una regla de validación de longitud mínima a la instancia de ValidationBuilder.
   *
   * @param length - La longitud mínima requerida.
   * @returns - La instancia de ValidationBuilder actualizada.
   */
  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  /**
   * Agrega una regla de validación de comparación de campo a la instancia de ValidationBuilder.
   *
   * @param fieldToCompare - El nombre del campo con el que se debe comparar.
   * @returns - La instancia de ValidationBuilder actualizada.
   */
  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    );
    return this;
  }

  /**
   * Construye y devuelve un array de validaciones de campo.
   *
   * @returns - Un array de validaciones de campo construido a partir de las reglas especificadas.
   */
  build(): FieldValidation[] {
    return this.validations;
  }
}
