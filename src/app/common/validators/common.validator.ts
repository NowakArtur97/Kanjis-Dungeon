import { FormControl, ValidationErrors } from '@angular/forms';

export default class CommonValidators {
  static notBlank = ({ value }: FormControl): ValidationErrors =>
    value.length === 0 || !value.trim() ? { notBlank: true } : null;
}
