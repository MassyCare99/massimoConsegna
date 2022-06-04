import { TransferValidatorDirective } from './transfer.validator';
import { IbanValidatorDirective } from './iban.validator';
import { EqualFieldValidatorDirective } from './equal-fields.validator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountValidatorDirective } from './amount.validator';
import { CardIdValidatorDirective } from './card-id.validators';

@NgModule({
  declarations: [
    EqualFieldValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    TransferValidatorDirective,
    CardIdValidatorDirective,
  ],
  imports: [CommonModule],
  exports: [
    EqualFieldValidatorDirective,
    AmountValidatorDirective,
    IbanValidatorDirective,
    TransferValidatorDirective,
    CardIdValidatorDirective,
  ],
})
export class ValidatorsModule {}
