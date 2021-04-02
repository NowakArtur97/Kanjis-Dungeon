import { FormControl, ValidationErrors } from '@angular/forms';

export default class CommonValidators {
  static equals = (expected: any) => ({
    value,
  }: FormControl): ValidationErrors =>
    expected !== value ? { equals: true } : null;

  static includes = (array: any[]) => ({
    value,
  }: FormControl): ValidationErrors =>
    array && !array.includes(value + '') ? { includes: true } : null;
}
