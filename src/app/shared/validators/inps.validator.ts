import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Semplice funzione (Reactive Forms)
export function InpsValidator(
  control: AbstractControl
): ValidationErrors | null {
  const myform: FormGroup = control as FormGroup;

  if (
    myform?.controls['da']?.value !== '' &&
    myform?.controls['a']?.value !== ''
  ) {
    console.log(
      new Date(myform?.controls['da']?.value) <
        new Date(myform?.controls['a']?.value)
    );
    return new Date(myform?.controls['da']?.value) <
      new Date(myform?.controls['a']?.value)
      ? null
      : {
          inps: 'La data di inizio deve essere precedente alla data di fine',
        };
  }
  return null;
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[inps]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: InpsValidatorDirective,
      multi: true,
    },
  ],
})
export class InpsValidatorDirective implements Validator {
  validate(control: FormGroup): ValidationErrors | null {
    return InpsValidator(control);
  }
}
