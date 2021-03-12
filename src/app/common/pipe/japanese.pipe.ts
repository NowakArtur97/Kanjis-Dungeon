import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
})
export class JapanesePipe implements PipeTransform {
  private mappings: Map<string, string> = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]);

  transform(value: string): string {
    console.log(value);
    return value;
  }
}
