import { FormControl, ValidationErrors } from '@angular/forms';

export default class CommonValidators {
  static equals = (expected: string) => ({
    value,
  }: FormControl): ValidationErrors =>
    expected.toLowerCase() !== value.toLowerCase() ? { equals: true } : null;

  // TODO: CommonValidators: check word with upper letter didnt work e.q. America
  static includes = (array: any[]) => ({
    value,
  }: FormControl): ValidationErrors => {
    const containsInLowerCase =
      array.findIndex(
        (item) => (value + '').toLowerCase() === item.toLowerCase()
      ) === -1;
    const isSameArray =
      JSON.stringify(array.slice().sort()) !==
      JSON.stringify((value + '').toLowerCase().split(',').sort());
    return array && containsInLowerCase && isSameArray
      ? { includes: true }
      : null;
  };
}
