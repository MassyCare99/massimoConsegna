import { CardsService } from '../../core/api/cards.service';
import { Directive, Injectable } from '@angular/core';

import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  FormControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';

//Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({
  selector: '[transfer]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useClass: TransferValidatorDirective,
      multi: true,
    },
  ],
})
export class TransferValidatorDirective implements AsyncValidator {
  constructor(private transferValidator: TransferValidator) {}
  validate(
    control: FormControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    const validator = this.transferValidator.validate();
    return validator(control);
  }
}

@Injectable({ providedIn: 'root' })
export class TransferValidator {
  constructor(private cardsService: CardsService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.cardsService.getCards().pipe(
        map((res) => {
          const index = res.findIndex(
            (card) => card._id === control.value.cardId
          );
          if (res[index]) {
            return res[index].amount < control.value.amount
              ? { noAmount: 'Credito Insufficiente' }
              : null;
          } else {
            return null;
          }
        })
      );
    };
  }
}
