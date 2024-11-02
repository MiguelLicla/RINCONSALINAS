import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export class CustomValidators {
  // Validación personalizada para asegurar que al menos un sector tenga FlagActivo = true
  // static atLeastOneSectorActive(controlActivo:string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const formArray = control as FormArray;
  //     const isValid = formArray.controls.some((group: AbstractControl) => group.get(controlActivo)?.value === true);
  //     if(control.pristine){
  //       return  { atLeastOneSectorActive: false } ;
  //     }
  //     else{
  //       return isValid ? { atLeastOneSectorActive: false } : { atLeastOneSectorActive: true };
  //     }
  //   };
  // }

  static atLeastOneSectorActive(controlActivo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      const isValid = formArray.controls.some((group: AbstractControl) => group.get(controlActivo)?.value === true);

      return isValid ? null : { atLeastOneSectorActive: true };
    };
  }
  
}


