import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
  pure: false,
})
export class JapanesePipe implements PipeTransform {
  private readonly DOUBLE_LOWER_CASE_LETTERS_REG_EXP = /([a-z])\1{1}/g;
  private readonly DOUBLE_UPPER_CASE_LETTERS_REG_EXP = /([A-Z])\1{1}/g;
  private readonly ALL_LETTERS_REG_EXP = /[a-zA-Z]/g;
  private readonly DOUBLED_LETTER_HIRAGANA = 'っ';
  private readonly DOUBLED_LETTER_KATAKANA = 'ッ';
  private hiraganaMappings: Map<string, string> = new Map([
    ['ka', 'か'],
    ['ki', 'き'],
    ['ku', 'く'],
    ['ke', 'け'],
    ['ko', 'こ'],
    ['kya', 'きゃ'],
    ['kyu', 'きゅ'],
    ['kyo', 'きょ'],
    ['ga', 'が'],
    ['gi', 'ぎ'],
    ['gu', 'ぐ'],
    ['ge', 'げ'],
    ['go', 'ご'],
    ['gya', 'ぎゃ'],
    ['gyu', 'ぎゅ'],
    ['gyo', 'ぎょ'],

    ['ta', 'た'],
    ['chi', 'ち'],
    ['tsu', 'つ'],
    ['te', 'て'],
    ['to', 'と'],
    ['cha', 'ちゃ'],
    ['chu', 'ちゅ'],
    ['cho', 'ちょ'],
    ['da', 'だ'],
    ['dji', 'ぢ'],
    ['dzu', 'づ'],
    ['de', 'で'],
    ['do', 'ど'],
    ['dya', 'ぢゃ'],
    ['dyu', 'ぢゅ'],
    ['dyo', 'ぢょ'],

    ['sa', 'さ'],
    ['shi', 'し'],
    ['su', 'す'],
    ['se', 'せ'],
    ['so', 'そ'],
    ['sha', 'しゃ'],
    ['shu', 'しゅ'],
    ['sho', 'しょ'],
    ['za', 'ざ'],
    ['ji', 'じ'],
    ['zu', 'ず'],
    ['ze', 'ぜ'],
    ['zo', 'ぞ'],
    ['jya', 'じゃ'],
    ['jyu', 'じゅ'],
    ['jyo', 'じょ'],

    ['na', 'な'],
    ['ni', 'に'],
    ['nu', 'ぬ'],
    ['ne', 'ね'],
    ['no', 'の'],
    ['nya', 'にゃ'],
    ['nyu', 'にゅ'],
    ['nyo', 'にょ'],

    ['ha', 'は'],
    ['hi', 'ひ'],
    ['fu', 'ふ'],
    ['he', 'へ'],
    ['ho', 'ほ'],
    ['hya', 'ひゃ'],
    ['hyu', 'ひゅ'],
    ['hyo', 'ひょ'],
    ['ba', 'ば'],
    ['bi', 'び'],
    ['bu', 'ぶ'],
    ['be', 'べ'],
    ['bo', 'ぼ'],
    ['bya', 'びゃ'],
    ['byu', 'びゅ'],
    ['byo', 'びょ'],
    ['pa', 'ぱ'],
    ['pi', 'ぴ'],
    ['pu', 'ぷ'],
    ['pe', 'ぺ'],
    ['po', 'ぽ'],
    ['pya', 'ぴゃ'],
    ['pyu', 'ぴゅ'],
    ['pyo', 'ぴょ'],

    ['ma', 'ま'],
    ['mi', 'み'],
    ['mu', 'む'],
    ['me', 'め'],
    ['mo', 'も'],
    ['mya', 'みゃ'],
    ['myu', 'みゅ'],
    ['myo', 'みょ'],

    ['ra', 'ら'],
    ['ri', 'り'],
    ['ru', 'る'],
    ['re', 'れ'],
    ['ro', 'ろ'],
    ['rya', 'りゃ'],
    ['ryu', 'りゅ'],
    ['ryo', 'りょ'],

    ['ya', 'や'],
    ['yu', 'ゆ'],
    ['yo', 'よ'],

    ['wa', 'わ'],
    ['wi', 'ゐ'],
    ['we', 'ゑ'],
    ['wo', 'を'],

    ['a', 'あ'],
    ['i', 'い'],
    ['u', 'う'],
    ['e', 'え'],
    ['o', 'お'],

    ['nn', 'ん'],
  ]);

  private katakanaMappings: Map<string, string> = new Map([
    ['KA', 'カ'],
    ['KI', 'キ'],
    ['KU', 'ク'],
    ['KE', 'ケ'],
    ['KO', 'コ'],
    ['KYA', 'キャ'],
    ['KYU', 'キュ'],
    ['KYO', 'キョ'],
    ['GA', 'ガ'],
    ['GI', 'ギ'],
    ['GU', 'グ'],
    ['GE', 'ゲ'],
    ['GO', 'ゴ'],
    ['GYA', 'ギャ'],
    ['GYU', 'ギュ'],
    ['GYO', 'ギョ'],

    ['TA', 'タ'],
    ['CHI', 'チ'],
    ['TSU', 'ツ'],
    ['TE', 'テ'],
    ['TO', 'ト'],
    ['CHA', 'チャ'],
    ['CHU', 'チュ'],
    ['CHO', 'チョ'],
    ['DA', 'ダ'],
    ['JI', 'ヂ'],
    ['DZU', 'ヅ'],
    ['DE', 'デ'],
    ['DO', 'ド'],
    ['DYA', 'ヂャ'],
    ['DYU', 'ヂュ'],
    ['DYO', 'ヂョ'],

    ['SA', 'サ'],
    ['SHI', 'シ'],
    ['SU', 'ス'],
    ['SE', 'セ'],
    ['SO', 'ソ'],
    ['SHA', 'シャ'],
    ['SHU', 'シュ'],
    ['SHO', 'ショ'],
    ['ZA', 'ザ'],
    ['JI', 'ジ'],
    ['ZU', 'ズ'],
    ['ZE', 'ゼ'],
    ['ZO', 'ゾ'],
    ['JYA', 'ジゃ'],
    ['JYU', 'ジゅ'],
    ['JYO', 'ジょ'],

    ['NA', 'ナ'],
    ['NI', 'ニ'],
    ['NU', 'ヌ'],
    ['NE', 'ネ'],
    ['NO', 'ノ'],
    ['NYA', 'ニャ'],
    ['NYU', 'ニュ'],
    ['NYO', 'ニョ'],

    ['HA', 'ハ'],
    ['HI', 'ヒ'],
    ['FU', 'フ'],
    ['HE', 'ヘ'],
    ['HO', 'ホ'],
    ['HYA', 'ヒャ'],
    ['HYU', 'ヒュ'],
    ['HYO', 'ヒョ'],
    ['BA', 'バ'],
    ['BI', 'ビ'],
    ['BU', 'ブ'],
    ['BE', 'ベ'],
    ['BO', 'ボ'],
    ['BYA', 'ビャ'],
    ['BYU', 'ビュ'],
    ['BYO', 'ビョ'],
    ['PA', 'パ'],
    ['PI', 'ピ'],
    ['PU', 'プ'],
    ['PE', 'ペ'],
    ['PO', 'ポ'],
    ['PYA', 'ピャ'],
    ['PYU', 'ピュ'],
    ['PYO', 'ピョ'],

    ['MA', 'マ'],
    ['MI', 'ミ'],
    ['MU', 'ム'],
    ['ME', 'メ'],
    ['MO', 'モ'],
    ['MYA', 'ミャ'],
    ['MYU', 'ミュ'],
    ['MYO', 'ミョ'],

    ['RA', 'ラ'],
    ['RI', 'リ'],
    ['RU', 'ル'],
    ['RE', 'レ'],
    ['RO', 'ロ'],
    ['RYA', 'リャ'],
    ['RYU', 'リュ'],
    ['RYO', 'リョ'],

    ['YA', 'ヤ'],
    ['YU', 'ユ'],
    ['YO', 'ヨ'],

    ['WA', 'ワ'],
    ['WI', 'ヰ'],
    ['WE', 'ヱ'],
    ['WO', 'ヲ'],

    ['A', 'ア'],
    ['I', 'イ'],
    ['U', 'ウ'],
    ['E', 'エ'],
    ['O', 'オ'],

    ['NN', 'ン'],
  ]);
  private allMappings = new Map(
    [...this.hiraganaMappings].concat([...this.katakanaMappings])
  );

  transform(value: string): string {
    if (!value) {
      return value;
    }

    let afterConversion = this.convertToJapanese(value);
    afterConversion = this.convertDoubleLowerCaseLetters(afterConversion);
    afterConversion = this.convertDoubleUpperCaseLetters(afterConversion);

    return this.convertToJapanese(afterConversion);
  }

  private convertDoubleLowerCaseLetters = (word: string): string =>
    this.convertDoubleLetters(
      word,
      this.DOUBLED_LETTER_HIRAGANA,
      this.DOUBLE_LOWER_CASE_LETTERS_REG_EXP
    );

  private convertDoubleUpperCaseLetters = (word: string): string =>
    this.convertDoubleLetters(
      word,
      this.DOUBLED_LETTER_KATAKANA,
      this.DOUBLE_UPPER_CASE_LETTERS_REG_EXP
    );

  private convertDoubleLetters(
    word: string,
    convertTo: string,
    regExp: RegExp
  ): string {
    if (this.containsAnyLetters(word)) {
      return word.replace(regExp, convertTo);
    }
    return word;
  }

  private convertToJapanese(word: string): string {
    while (this.containsAnyLetters(word)) {
      this.allMappings.forEach((value, key) => {
        if (word.includes(key)) {
          word = word.replace(new RegExp(key, 'g'), value);
        }
      });
    }

    return word;
  }

  private containsAnyLetters = (word: string): boolean =>
    this.ALL_LETTERS_REG_EXP.test(word);
}
