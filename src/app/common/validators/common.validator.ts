import { FormControl, ValidationErrors } from '@angular/forms';

export default class CommonValidators {
  // TODO: Remove if not used
  static notBlank = ({ value }: FormControl): ValidationErrors =>
    !value || value.length === 0 || !value.trim() ? { notBlank: true } : null;

  static equals = (expected: any) => ({
    value,
  }: FormControl): ValidationErrors =>
    expected !== value ? { equals: true } : null;

  static includes = (array: any[]) => ({
    value,
  }: FormControl): ValidationErrors =>
    !array.includes(value) ? { includes: true } : null;
}
