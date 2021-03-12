import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
})
export class JapanesePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
