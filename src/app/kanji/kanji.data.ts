import Kanji from './models/kanji.model';

const KANJI: Kanji[] = [
  {
    id: 1,
    characters: '上',
    meanings: ['above', 'up', 'over'],
    onyomi: ['じょう'],
    kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
  },
  {
    id: 2,
    characters: '下',
    meanings: ['below', 'down', 'under', 'beneath'],
    onyomi: ['か', 'げ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
  },
  {
    id: 3,
    characters: '大',
    meanings: ['big', 'large'],
    onyomi: ['たい', 'だい'],
    kunyomi: ['おお'],
    nanori: ['ひろ'],
  },
  {
    id: 4,
    characters: '工',
    meanings: ['construction', 'industry'],
    onyomi: ['こう', 'く'],
  },
  {
    id: 5,
    characters: '八',
    meanings: ['eight'],
    onyomi: ['はち'],
    kunyomi: ['や', 'よう'],
  },
  {
    id: 6,
    characters: '入',
    meanings: ['enter'],
    onyomi: ['にゅう'],
    kunyomi: ['はい', 'い'],
  },
  {
    id: 7,
    characters: '山',
    meanings: ['mountain'],
    onyomi: ['さん'],
    kunyomi: ['やま'],
  },
  {
    id: 8,
    characters: '口',
    meanings: ['mouth'],
    onyomi: ['こう', 'く'],
    kunyomi: ['くち'],
  },
  {
    id: 9,
    characters: '九',
    meanings: ['nine'],
    onyomi: ['く', 'きゅう'],
    kunyomi: ['ここの'],
  },
  {
    id: 10,
    characters: '一',
    meanings: ['one'],
    onyomi: ['いち', 'いつ'],
    kunyomi: ['ひと'],
    nanori: ['かず'],
  },
];

export default KANJI;
