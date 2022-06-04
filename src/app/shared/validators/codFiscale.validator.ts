import { Directive } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Semplice funzione (Reactive Forms)
export function CodFiscaleValidator(
  control: AbstractControl
): ValidationErrors | null {
  let check = false;
  //control?.value?.toString().length === 11 ?
  const regexp = new RegExp(
    '^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$'
  );
  check = regexp.test(control?.value);

  return check
    ? null
    : { nocodFiscale: 'codFiscale inserito non nel formato corretto' };
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[codFiscale]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: CodFiscaleValidatorDirective,
      multi: true,
    },
  ],
})
export class CodFiscaleValidatorDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    return CodFiscaleValidator(control);
  }
}
