import { Either } from "@/core"
import { ValidationError } from "./ValidationError"

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
