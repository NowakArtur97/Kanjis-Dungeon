import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'japanese',
})
export class JapanesePipe implements PipeTransform {
  private readonly DOUBLED_LETTER = 'っ';
  private hiraganaMappings: Map<string, string> = new Map([
    ['a', 'あ'],
    ['i', 'い'],
    ['u', 'う'],
    ['e', 'え'],
    ['o', 'お'],

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

    ['nn', 'ん'],
  ]);

  transform(value: string): string {
    console.log(value);

    return value;
  }
}
