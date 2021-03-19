import CharacterType from '../common/enums/character-type.enum';
import Radical from './models/radical.model';

const RADICALS: Radical[] = [
  {
    id: 1,
    characters: '一',
    meanings: ['ground'],
    type: CharacterType.RADICAL,
  },
  { id: 2, characters: '二', meanings: ['two'], type: CharacterType.RADICAL },
  {
    id: 3,
    characters: '工',
    meanings: ['construction'],
    type: CharacterType.RADICAL,
  },
  { id: 4, characters: '十', meanings: ['cross'], type: CharacterType.RADICAL },
  { id: 5, characters: '丶', meanings: ['drop'], type: CharacterType.RADICAL },
  { id: 6, characters: '入', meanings: ['enter'], type: CharacterType.RADICAL },
  { id: 7, characters: 'ハ', meanings: ['fins'], type: CharacterType.RADICAL },
  { id: 8, characters: '亅', meanings: ['barb'], type: CharacterType.RADICAL },
  { id: 9, characters: '大', meanings: ['big'], type: CharacterType.RADICAL },
  { id: 10, characters: '亠', meanings: ['lid'], type: CharacterType.RADICAL },
];
export default RADICALS;
