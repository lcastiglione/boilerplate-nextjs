/**
 * Interfaz que representa un error de campo requerido.
 *
 * @interface
 */
export interface RequiredFieldError {
  /**
   * Etiqueta que identifica el tipo de error.
   */
  tag: string;
  /**
   * Mensaje que describe el error.
   */
  message: string;
  /**
   * Nombre del campo que causó el error.
   */
  field: string;
}

/**
 * Interfaz que representa un error de campo inválido.
 *
 * @interface
 */
export interface InvalidFieldError {
  /**
   * Etiqueta que identifica el tipo de error.
   */
  tag: string;
  /**
   * Mensaje que describe el error.
   */
  message: string;
  /**
   * Nombre del campo que causó el error.
   */
  field: string;
}

/**
 * Tipo que representa un error de validación, que puede ser un RequiredFieldError o un InvalidFieldError.
 */
export type ValidationError = InvalidFieldError | RequiredFieldError;
