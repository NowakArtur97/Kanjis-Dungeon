export default class MathUtil {
  static getRandomIntValue = (maximum: number, minimum = 0): number =>
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
