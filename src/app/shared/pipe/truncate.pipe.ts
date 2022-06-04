import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: false,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: boolean[]): string {
    if (args[0]) {
      return '';
    } else {
      return value.substring(0, 6);
    }
  }
}
