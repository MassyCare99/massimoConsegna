import { Directive } from '@angular/core';

import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Semplice funzione (Reactive Forms)
export function amountValidator(control: FormControl): ValidationErrors | null {
  return isNumber(control?.value) ? null : { notEqual: true };
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[amount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: AmountValidatorDirective,
      multi: true,
    },
  ],
})
export class AmountValidatorDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    return amountValidator(control);
  }
}
function isNumber(value: string | number): boolean {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
}
