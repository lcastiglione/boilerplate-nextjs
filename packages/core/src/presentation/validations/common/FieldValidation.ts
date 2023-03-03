import { Either } from "@/domain/common/Either"
import { ValidationError } from "./ValidationError"

export interface FieldValidation {
  field: string
  validate: (input: any) => Either<ValidationError, boolean>
}
