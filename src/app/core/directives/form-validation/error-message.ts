export interface ErrorMessage {
  error: string;
  format?: FormatErrorFunction;
}

export type FormatErrorFunction = (label?: string, error?: any) => string;

export const DEFAULT_ERRORS: ErrorMessage[] = [
  {
    error: "required",
    format: label => `${label} es requerido`
  },
  {
    error: "pattern",
    format: label => `${label} es invalido`
  },
  {
    error: "minlength",
    format: (label, error) =>
      `${label} no debe tener menos de ${error.requiredLength} caracteres`
  },
  {
    error: "maxlength",
    format: (label, error) =>
      `${label} no debe tener más de ${error.requiredLength} caracteres`
  },
  {
    error: "requiredTrue",
    format: (label, error) => `${label} es requerido`
  },
  {
    error: "email",
    format: (label, error) => `Dirección de correo electrónico no válida`
  },
  {
    error: "max",
    format: (label, error) => `${label} no debe ser mayor que ${error.max}`
  },
  {
    error: "min",
    format: (label, error) => `${label} no debe ser menor que ${error.min}`
  },
  // {
  //   error: "customPattern",
  //   format: (label, error) => `${label} no debe aaaaaaaa customPattern`
  // }
];
