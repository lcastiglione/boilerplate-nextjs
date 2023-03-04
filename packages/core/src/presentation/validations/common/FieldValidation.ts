import { Either } from "@core/domain/common"
import { ValidationError } from "@core/presentation/validations/common"

/**
 * Interfaz que representa una regla de validación para un campo.
 *
 */
export interface FieldValidation {
  /**
  * Nombre del campo que se está validando.
  */
  field: string
  /**
   * Función que valida un valor de entrada y devuelve un monad Either que contiene un ValidationError o un booleano.
   */
  validate: (input: any) => Either<ValidationError, boolean>
}
