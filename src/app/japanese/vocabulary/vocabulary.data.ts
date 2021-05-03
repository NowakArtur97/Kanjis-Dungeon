import CharacterType from '../../common/enums/character-type.enum';
import Word from './models/word.model';

const VOCABULARY: Word[] = [
  {
    id: 1,
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 2,
    characters: '一人',
    meanings: ['alone', 'one person'],
    reading: 'ひとり',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 3,
    characters: '人工',
    meanings: ['artificial', 'man made', 'human made'],
    reading: 'じんこう',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 4,
    characters: '大きい',
    meanings: ['big', 'large'],
    reading: 'おおきい',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 5,
    characters: '下',
    meanings: ['down', 'below', 'under', 'beneath'],
    reading: 'した',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 6,
    characters: '八',
    meanings: ['eight'],
    reading: 'はち',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 7,
    characters: '八つ',
    meanings: ['eight things'],
    reading: 'やっつ',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 8,
    characters: '入り口',
    meanings: ['entrance'],
    reading: 'いりぐち',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 9,
    characters: '大した',
    meanings: ['great'],
    reading: 'たいした',
    type: CharacterType.VOCABULARY,
  },
  {
    id: 10,
    characters: '山',
    meanings: ['mountain'],
    reading: 'やま',
    type: CharacterType.VOCABULARY,
  },
];

export default VOCABULARY;
