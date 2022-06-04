import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Semplice funzione (Reactive Forms)
export function equelFieldValidator(
  control: FormGroup
): ValidationErrors | null {
  return control?.controls['password']?.value ===
    control?.controls['password2']?.value
    ? null
    : { notEqual: 'le password non coincidono' };
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[equalField]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: EqualFieldValidatorDirective,
      multi: true,
    },
  ],
})
export class EqualFieldValidatorDirective implements Validator {
  validate(control: FormGroup): ValidationErrors | null {
    return equelFieldValidator(control);
  }
}
