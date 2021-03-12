import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
  pure: false,
})
export class JapanesePipe implements PipeTransform {
  private readonly LETTER_REG_EXP = /[a-zA-Z]/g;
  private readonly DOUBLED_LETTER = 'っ';
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
    ['ja', 'じゃ'],
    ['ju', 'じゅ'],
    ['jo', 'じょ'],

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
    ['dja', 'ぢゃ'],
    ['dju', 'ぢゅ'],
    ['djo', 'ぢょ'],

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

    ['ya', 'や'],
    ['yu', 'ゆ'],
    ['yo', 'よ'],

    ['ra', 'ら'],
    ['ri', 'り'],
    ['ru', 'る'],
    ['re', 'れ'],
    ['ro', 'ろ'],
    ['rya', 'りゃ'],
    ['ryu', 'りゅ'],
    ['ryo', 'りょ'],

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

    ['SA', 'サ'],
    ['SHI', 'シ'],
    ['SU', 'ス'],
    ['SE', 'セ'],
    ['SO', 'ソ'],
    ['SYA', 'シャ'],
    ['SYU', 'シュ'],
    ['SYO', 'ショ'],
    ['ZA', 'ザ'],
    ['JI', 'ジ'],
    ['ZU', 'ズ'],
    ['ZE', 'ゼ'],
    ['ZO', 'ゾ'],
    ['JA', 'ジゃ'],
    ['JU', 'ジゅ'],
    ['JO', 'ジょ'],

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
    ['DJA', 'ヂャ'],
    ['DJU', 'ヂュ'],
    ['DJO', 'ヂョ'],

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

    ['YA', 'ヤ'],
    ['YU', 'ユ'],
    ['YO', 'ヨ'],

    ['RA', 'ラ'],
    ['RI', 'リ'],
    ['RU', 'ル'],
    ['RE', 'レ'],
    ['RO', 'ロ'],
    ['RYA', 'リャ'],
    ['RYU', 'リュ'],
    ['RYO', 'リョ'],

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
    let afterConversion = value;

    afterConversion = this.convertToJapanese(afterConversion);

    return this.convertToJapanese(afterConversion);
  }

  private convertToJapanese(word: string): string {
    while (this.containsAnyLetter(word)) {
      this.allMappings.forEach((value, key) => {
        if (word.includes(key)) {
          word = word.replace(new RegExp(key, 'g'), value);
        }
      });
    }

    return word;
  }

  private containsAnyLetter = (word: string): boolean =>
    this.LETTER_REG_EXP.test(word);
}
