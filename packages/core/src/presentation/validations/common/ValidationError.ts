export interface RequiredFieldError {
  tag: string;
  message: string;
  field: string;
}

export interface InvalidFieldError {
  tag: string;
  message: string;
  field: string;
}

export type ValidationError = InvalidFieldError | RequiredFieldError;
