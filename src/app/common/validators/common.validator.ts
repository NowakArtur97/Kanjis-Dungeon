import { FormControl, ValidationErrors } from '@angular/forms';

export default class CommonValidators {
  static equals = (expected: string) => ({
    value,
  }: FormControl): ValidationErrors =>
    expected.toLowerCase() !== value.toLowerCase() ? { equals: true } : null;

  static includes = (array: any[]) => ({
    value,
  }: FormControl): ValidationErrors =>
    array &&
    array.findIndex(
      (item) => (value + '').toLowerCase() === item.toLowerCase()
    ) === -1 &&
    JSON.stringify(array.slice().sort()) !==
      JSON.stringify((value + '').toLowerCase().split(',').sort())
      ? { includes: true }
      : null;
}
