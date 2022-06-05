import { Comune, Provincia2 } from './../../models/comune';
import { ComuniService } from './../../core/api/comuni.service';
import {
  map,
  Observable,
  combineLatest,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { CodFiscaleValidator } from 'src/app/shared/validators/codFiscale.validator';
import { InpsValidator } from 'src/app/shared/validators/inps.validator';
import { TaxesService } from 'src/app/core/api/taxes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INPSErrorStateMatcher } from './utility/inps.errorStateMatcher';

@Component({
  selector: 'mc-taxes',
  templateUrl: './taxes.component.html',
  styles: [
    `
      .taxesText {
        display: inline-block;
        margin-left: 10px;
        width: 220px;
      }

      .pannelloTotale {
        position: sticky;
        right: 25px;
        float: right;
        bottom: 20px;
        text-align: right;
      }
    `,
  ],
})
export class TaxesComponent implements OnInit {
  form!: FormGroup;

  @ViewChild('formM') formM: any;

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private snackBar: MatSnackBar,
    private comuniService: ComuniService
  ) {
    this.form = this.fb.group({
      codiceFiscale: this.fb.control('', [
        Validators.required,
        CodFiscaleValidator,
      ]),
      cognome: this.fb.control('', Validators.required),
      nome: this.fb.control('', Validators.required),
      dataDiNascita: this.fb.control('', Validators.required),
      sesso: this.fb.control('', Validators.required),
      provinciaDiNascita: this.fb.control('', Validators.required),
      comuneDiNascita: this.fb.control('', Validators.required),
      erario: this.fb.array([]),
      inps: this.fb.array([]),
    });

    this.totaliErarioCredito$ = this.form.valueChanges.pipe(
      map((value: any) => {
        let cont: number = 0;
        value.erario.forEach((r: any) => {
          cont = cont + +r.credito;
        });
        return cont;
      })
    );
    this.totaliErarioDebito$ = this.form.valueChanges.pipe(
      map((value: any) => {
        let cont: number = 0;
        value.erario.forEach((r: any) => {
          cont = cont + +r.debito;
        });
        return cont;
      })
    );

    this.totaliInpsCredito$ = this.form.valueChanges.pipe(
      map((value: any) => {
        let cont: number = 0;
        value.inps.forEach((r: any) => {
          cont = cont + +r.credito;
        });
        return cont;
      })
    );
    this.totaliInpsDebito$ = this.form.valueChanges.pipe(
      map((value: any) => {
        let cont: number = 0;
        value.inps.forEach((r: any) => {
          cont = cont + +r.debito;
        });
        return cont;
      })
    );
    this.totale$ = combineLatest([
      this.totaliErarioCredito$,
      this.totaliErarioDebito$,
      this.totaliInpsCredito$,
      this.totaliInpsDebito$,
    ]).pipe(
      map((value) => {
        let cont: number = 0;
        value.forEach((r: any) => {
          cont = cont + +r;
        });

        return cont;
      })
    );

    this.comuni$ = this.form.get('comuneDiNascita')!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((x) => this.comuniService.getComuni(x))
    );

    this.provincie$ = this.form.get('provinciaDiNascita')!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((x) => this.comuniService.getProvince(x))
    );
  }

  comuni$: Observable<any>;
  provincie$: Observable<Provincia2[]>;

  totaliErarioCredito$: Observable<number>;
  totaliErarioDebito$: Observable<number>;
  totaliInpsCredito$: Observable<number>;
  totaliInpsDebito$: Observable<number>;
  totale$: Observable<number>;

  ngOnInit(): void {}

  addErario() {
    let array = this.form.get('erario') as FormArray;
    const er = this.fb.group({
      codiceTributo: this.fb.control('', Validators.required),
      anno: this.fb.control('', Validators.required),
      debito: this.fb.control('', Validators.required),
      credito: this.fb.control('', Validators.required),
    });
    array.push(er);
  }

  removeErario(i: number) {
    let array = this.form.get('erario') as FormArray;
    array.removeAt(i);
  }

  inpsMatcher = new INPSErrorStateMatcher();

  addInps() {
    let array = this.form.get('inps') as FormArray;
    const er = this.fb.group(
      {
        codiceSede: this.fb.control('', Validators.required),
        causaleContributo: this.fb.control('', Validators.required),
        codiceInps: this.fb.control('', Validators.required),
        da: this.fb.control('', Validators.required),
        a: this.fb.control('', Validators.required),
        debito: this.fb.control('', Validators.required),
        credito: this.fb.control('', Validators.required),
      },
      { validator: InpsValidator }
    );
    array.push(er);
  }

  removeInps(i: number) {
    let array = this.form.get('inps') as FormArray;
    array.removeAt(i);
  }

  save() {
    this.taxesService.adddTaxes(this.form.value).subscribe((res) => {
      let snackBarRef = this.snackBar.open(
        'Inserimento avvenuto con successo',
        '',
        {
          duration: 3000,
        }
      );
      let array = this.form.get('erario') as FormArray;
      array.clear();
      array = this.form.get('inps') as FormArray;
      array.clear();
      this.form.reset();
      //usato il metodo seguente per ripulire gli errori che si generano dopo un .reset()
      this.formM.resetForm();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    });
  }

  get myForm() {
    return this.form.value;
  }
  get myErario() {
    return this.form.controls['erario'] as FormArray;
  }
  get myInps() {
    return this.form.controls['inps'] as FormArray;
  }
}
