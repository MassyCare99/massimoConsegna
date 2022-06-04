import { Directive } from '@angular/core';

import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Semplice funzione (Reactive Forms)
export function IbanValidator(control: FormControl): ValidationErrors | null {
  let check = false;
  //control?.value?.toString().length === 11 ?
  const regexp = new RegExp(
    '^(it|IT)[0-9]{2}[A-Za-z][0-9]{10}[0-9A-Za-z]{12}$'
  );
  check = regexp.test(control?.value);

  return check ? null : { noIban: 'Iban inserito non nel formato corretto' };
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[iban]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: IbanValidatorDirective,
      multi: true,
    },
  ],
})
export class IbanValidatorDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    return IbanValidator(control);
  }
}
