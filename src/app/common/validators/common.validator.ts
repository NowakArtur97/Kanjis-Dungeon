import { FormControl, ValidationErrors } from '@angular/forms';

export default class CommonValidators {
  static notBlank = ({ value }: FormControl): ValidationErrors =>
    !value || value.length === 0 || !value.trim() ? { notBlank: true } : null;

  static equals = (expected: any) => ({
    value,
  }: FormControl): ValidationErrors =>
    expected !== value ? { equals: true } : null;
}
