export default class CssUtil {
  private static MAIN_CARD_COLOR_CSS_VARIABLE = '--main-card-color';

  static changeQuizCardColor = (color: string): void =>
    document.documentElement.style.setProperty(
      CssUtil.MAIN_CARD_COLOR_CSS_VARIABLE,
      color
    );

  static changeCSSVariable = (variableName: string, value: any): void =>
    document.documentElement.style.setProperty(variableName, value);

  static getCSSVariable = (variableName: string): string =>
    getComputedStyle(document.body).getPropertyValue(variableName).slice(1);
}
