import CharacterType from '../common/enums/character-type.enum';
import Word from './models/word.model';

const VOCABULARY: Word[] = [
  {
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一人',
    meanings: ['alone', 'one person'],
    reading: 'ひとり',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '人工',
    meanings: ['artificial', 'man made', 'human made'],
    reading: 'じんこう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大きい',
    meanings: ['big', 'large'],
    reading: 'おおきい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '下',
    meanings: ['down', 'below', 'under', 'beneath'],
    reading: 'した',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '八',
    meanings: ['eight'],
    reading: 'はち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '八つ',
    meanings: ['eight things'],
    reading: 'やっつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '入り口',
    meanings: ['entrance'],
    reading: 'いりぐち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大した',
    meanings: ['great'],
    reading: 'たいした',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '山',
    meanings: ['mountain'],
    reading: 'やま',
    type: CharacterType.VOCABULARY,
  },
];

export default VOCABULARY;
