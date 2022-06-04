import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattaDate',
})
export class FormattaDatePipe implements PipeTransform {
  transform(value: Date, formato: 'dd/mm/yyyy' | 'mm/dd/yyyy'): string {
    if (!formato) {
      formato = 'dd/mm/yyyy';
    }
    if (formato === 'dd/mm/yyyy') {
      return this.dateToStringddMM(value);
    } else {
      return this.dateToStringddMM(value);
    }
  }

  dateToStringddMM(d: Date): string {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month, year].join('/');
  }
  dateToStringMMdd(d: Date): string {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [month, day, year].join('/');
  }
}
