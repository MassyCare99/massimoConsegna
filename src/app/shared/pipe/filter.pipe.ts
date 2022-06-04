import { Contact } from './../../models/Contact';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Contact[], ...args: string[]): Contact[] {

    return value.filter(p => p.name.includes(args[0]))

  }

}
