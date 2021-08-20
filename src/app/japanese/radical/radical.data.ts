import CharacterType from '../common/enums/character-type.enum';
import Radical from './models/radical.model';

const RADICALS: Radical[] = [
  // {
  //   id: 1,
  //   characters: '一',
  //   meanings: ['ground'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 2, characters: '二', meanings: ['two'], type: CharacterType.RADICAL },
  // {
  //   id: 3,
  //   characters: '工',
  //   meanings: ['construction'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 4, characters: '十', meanings: ['cross'], type: CharacterType.RADICAL },
  // { id: 5, characters: '丶', meanings: ['drop'], type: CharacterType.RADICAL },
  // { id: 6, characters: '入', meanings: ['enter'], type: CharacterType.RADICAL },
  // { id: 7, characters: 'ハ', meanings: ['fins'], type: CharacterType.RADICAL },
  // { id: 8, characters: '亅', meanings: ['barb'], type: CharacterType.RADICAL },
  // { id: 9, characters: '大', meanings: ['big'], type: CharacterType.RADICAL },
  // { id: 10, characters: '亠', meanings: ['lid'], type: CharacterType.RADICAL },
  // {
  //   id: 11,
  //   characters: '山',
  //   meanings: ['mountain'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 12,
  //   characters: '口',
  //   meanings: ['mouth'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 13, characters: '九', meanings: ['nine'], type: CharacterType.RADICAL },
  // {
  //   id: 14,
  //   characters: '人',
  //   meanings: ['person'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 15,
  //   characters: '力',
  //   meanings: ['power'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 16,
  //   characters: '勹',
  //   meanings: ['prison'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 17,
  //   characters: '川',
  //   meanings: ['river'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 18,
  //   characters: '七',
  //   meanings: ['seven'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 19,
  //   characters: '丿',
  //   meanings: ['slide'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 20,
  //   characters: '|',
  //   meanings: ['stick'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 21, characters: '日', meanings: ['sun'], type: CharacterType.RADICAL },
  // { id: 22, characters: 'ト', meanings: ['toe'], type: CharacterType.RADICAL },
  // {
  //   id: 23,
  //   characters: '木',
  //   meanings: ['tree'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 24,
  //   characters: '女',
  //   meanings: ['woman'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 25, characters: '本', meanings: ['book'], type: CharacterType.RADICAL },
  // { id: 26, characters: '弓', meanings: ['bow'], type: CharacterType.RADICAL },
  // {
  //   id: 27,
  //   characters: '子',
  //   meanings: ['child'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 28, characters: '牛', meanings: ['cow'], type: CharacterType.RADICAL },
  // { id: 29, characters: '土', meanings: ['dirt'], type: CharacterType.RADICAL },
  // { id: 30, characters: '犬', meanings: ['dog'], type: CharacterType.RADICAL },
  // {
  //   id: 31,
  //   characters: '夕',
  //   meanings: ['evening'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 32, characters: '目', meanings: ['eye'], type: CharacterType.RADICAL },
  // { id: 33, characters: '火', meanings: ['fire'], type: CharacterType.RADICAL },
  // { id: 34, characters: '五', meanings: ['five'], type: CharacterType.RADICAL },
  // { id: 35, characters: '尸', meanings: ['flag'], type: CharacterType.RADICAL },
  // { id: 36, characters: '彡', meanings: ['hair'], type: CharacterType.RADICAL },
  // { id: 37, characters: '手', meanings: ['hand'], type: CharacterType.RADICAL },
  // { id: 38, characters: '冂', meanings: ['head'], type: CharacterType.RADICAL },
  // {
  //   id: 39,
  //   characters: '天',
  //   meanings: ['heaven'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 40, characters: '王', meanings: ['king'], type: CharacterType.RADICAL },
  // { id: 41, characters: '儿', meanings: ['legs'], type: CharacterType.RADICAL },
  // {
  //   id: 42,
  //   characters: '中',
  //   meanings: ['middle'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 43, characters: '月', meanings: ['moon'], type: CharacterType.RADICAL },
  // {
  //   id: 44,
  //   characters: 'ナ',
  //   meanings: ['narwhal'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 45,
  //   characters: 'ム',
  //   meanings: ['private'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 46,
  //   characters: '田',
  //   meanings: ['rice paddy'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 47,
  //   characters: '小',
  //   meanings: ['small'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 48,
  //   characters: '立',
  //   meanings: ['stand'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 49,
  //   characters: '石',
  //   meanings: ['stone'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 50,
  //   characters: '又',
  //   meanings: ['stool'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 51, characters: '止', meanings: ['stop'], type: CharacterType.RADICAL },
  // {
  //   id: 52,
  //   characters: '丁',
  //   meanings: ['street'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 53,
  //   characters: '刀',
  //   meanings: ['sword'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 54,
  //   characters: '千',
  //   meanings: ['thousand'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 55,
  //   characters: 'メ',
  //   meanings: ['treasure'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 56,
  //   characters: '水',
  //   meanings: ['water'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 57,
  //   characters: '白',
  //   meanings: ['white'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 58,
  //   characters: '文',
  //   meanings: ['writing'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 59,
  //   characters: '矢',
  //   meanings: ['arrow'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 60,
  //   characters: '广',
  //   meanings: ['canopy'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 61,
  //   characters: '方',
  //   meanings: ['direction'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 62, characters: '戸', meanings: ['door'], type: CharacterType.RADICAL },
  // { id: 63, characters: '干', meanings: ['dry'], type: CharacterType.RADICAL },
  // {
  //   id: 64,
  //   characters: '父',
  //   meanings: ['father'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 65,
  //   characters: '扌',
  //   meanings: ['fingers'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 66, characters: '毛', meanings: ['fur'], type: CharacterType.RADICAL },
  // {
  //   id: 67,
  //   characters: '心',
  //   meanings: ['heart'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 68, characters: '生', meanings: ['life'], type: CharacterType.RADICAL },
  // { id: 69, characters: '𠆢', meanings: ['hat'], type: CharacterType.RADICAL },
  // { id: 70, characters: '今', meanings: ['now'], type: CharacterType.RADICAL },
  // { id: 71, characters: '古', meanings: ['old'], type: CharacterType.RADICAL },
  // {
  //   id: 72,
  //   characters: '元',
  //   meanings: ['origin'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 73, characters: '幺', meanings: ['poop'], type: CharacterType.RADICAL },
  // {
  //   id: 74,
  //   characters: '匕',
  //   meanings: ['spoon'],
  //   type: CharacterType.RADICAL,
  // },
  // { id: 75, characters: '用', meanings: ['task'], type: CharacterType.RADICAL },
  // {
  //   id: 76,
  //   characters: '巾',
  //   meanings: ['towel'],
  //   type: CharacterType.RADICAL,
  // },
  // {
  //   id: 77,
  //   characters: '夂',
  //   meanings: ['winter'],
  //   type: CharacterType.RADICAL,
  // },
  {
    id: 78,
    characters: '⺌',
    meanings: ['triceratops'],
    type: CharacterType.RADICAL,
  },
  { id: 79, characters: '金', meanings: ['gold'], type: CharacterType.RADICAL },
  {
    id: 80,
    characters: 'ｲ',
    meanings: ['leader'],
    type: CharacterType.RADICAL,
  },
  { id: 81, characters: '耳', meanings: ['ear'], type: CharacterType.RADICAL },
  {
    id: 82,
    characters: '足',
    meanings: ['leg', 'foot'],
    type: CharacterType.RADICAL,
  },
  { id: 83, characters: '宀', meanings: ['roof'], type: CharacterType.RADICAL },
  {
    id: 84,
    characters: '气',
    meanings: ['energy'],
    type: CharacterType.RADICAL,
  },
  { id: 85, characters: '雨', meanings: ['rain'], type: CharacterType.RADICAL },
  {
    id: 86,
    characters: '艹',
    meanings: ['flowers'],
    type: CharacterType.RADICAL,
  },
  {
    id: 87,
    characters: '虫',
    meanings: ['insect'],
    type: CharacterType.RADICAL,
  },
  {
    id: 88,
    characters: '寸',
    meanings: ['measurement'],
    type: CharacterType.RADICAL,
  },
  { id: 89, characters: '赤', meanings: ['red'], type: CharacterType.RADICAL },
  { id: 90, characters: '青', meanings: ['blue'], type: CharacterType.RADICAL },
  {
    id: 91,
    characters: '見',
    meanings: ['see'],
    type: CharacterType.RADICAL,
  },
  {
    id: 92,
    characters: '龸',
    meanings: ['viking'],
    type: CharacterType.RADICAL,
  },
  {
    id: 93,
    characters: '糸',
    meanings: ['thread'],
    type: CharacterType.RADICAL,
  },
  {
    id: 94,
    characters: '車',
    meanings: ['car'],
    type: CharacterType.RADICAL,
  },
  {
    id: 95,
    characters: '貝',
    meanings: ['shellfish'],
    type: CharacterType.RADICAL,
  },
  {
    id: 96,
    characters: '竹',
    meanings: ['bamboo'],
    type: CharacterType.RADICAL,
  },
  {
    id: 97,
    characters: '云',
    meanings: ['cloud'],
    type: CharacterType.RADICAL,
  },
  {
    id: 98,
    characters: '可',
    meanings: ['lip ring'],
    type: CharacterType.RADICAL,
  },
  {
    id: 99,
    characters: '禾',
    meanings: ['grain'],
    type: CharacterType.RADICAL,
  },
  {
    id: 100,
    characters: '斗',
    meanings: ['ladle'],
    type: CharacterType.RADICAL,
  },
  {
    id: 101,
    characters: '⻌',
    meanings: ['scooter'],
    type: CharacterType.RADICAL,
  },
  {
    id: 102,
    characters: '袁',
    meanings: ['zombie'],
    type: CharacterType.RADICAL,
  },
  {
    id: 103,
    characters: '豕',
    meanings: ['pig'],
    type: CharacterType.RADICAL,
  },
  {
    id: 104,
    characters: '欠',
    meanings: ['lack'],
    type: CharacterType.RADICAL,
  },
  {
    id: 105,
    characters: '凵',
    meanings: ['box'],
    type: CharacterType.RADICAL,
  },
  {
    id: 106,
    characters: '会',
    meanings: ['meet'],
    type: CharacterType.RADICAL,
  },
  {
    id: 107,
    characters: '氵',
    meanings: ['tsunami'],
    type: CharacterType.RADICAL,
  },
  {
    id: 108,
    characters: '毋',
    meanings: ['window'],
    type: CharacterType.RADICAL,
  },
  {
    id: 109,
    characters: '門',
    meanings: ['gate'],
    type: CharacterType.RADICAL,
  },
  {
    id: 110,
    characters: '厂',
    meanings: ['cliff'],
    type: CharacterType.RADICAL,
  },
  {
    id: 111,
    characters: '頁',
    meanings: ['geoduck'],
    type: CharacterType.RADICAL,
  },
  {
    id: 112,
    characters: '言',
    meanings: ['say'],
    type: CharacterType.RADICAL,
  },
  {
    id: 113,
    characters: '己',
    meanings: ['oneself'],
    type: CharacterType.RADICAL,
  },
  {
    id: 114,
    characters: '刂',
    meanings: ['knife'],
    type: CharacterType.RADICAL,
  },
  {
    id: 115,
    characters: 'ヨ',
    meanings: ['wolverine'],
    type: CharacterType.RADICAL,
  },
  {
    id: 116,
    characters: '冖',
    meanings: ['forehead'],
    type: CharacterType.RADICAL,
  },
  {
    id: 117,
    characters: '魚',
    meanings: ['fish'],
    type: CharacterType.RADICAL,
  },
  {
    id: 118,
    characters: '孝',
    meanings: ['teacher'],
    type: CharacterType.RADICAL,
  },
  {
    id: 119,
    characters: '斤',
    meanings: ['axe'],
    type: CharacterType.RADICAL,
  },
  {
    id: 120,
    characters: '开',
    meanings: ['lantern'],
    type: CharacterType.RADICAL,
  },
  {
    id: 121,
    characters: '原',
    meanings: ['original'],
    type: CharacterType.RADICAL,
  },
  {
    id: 122,
    characters: '彳',
    meanings: ['loiter'],
    type: CharacterType.RADICAL,
  },
  {
    id: 123,
    characters: '兀',
    meanings: ['pi'],
    type: CharacterType.RADICAL,
  },
  {
    id: 124,
    characters: '行',
    meanings: ['go'],
    type: CharacterType.RADICAL,
  },
  {
    id: 125,
    characters: '耂',
    meanings: ['coffin'],
    type: CharacterType.RADICAL,
  },
  {
    id: 126,
    characters: '丂',
    meanings: ['beggar'],
    type: CharacterType.RADICAL,
  },
  {
    id: 127,
    characters: '冋',
    meanings: ['mustache'],
    type: CharacterType.RADICAL,
  },
  {
    id: 128,
    characters: '黄',
    meanings: ['yellow'],
    type: CharacterType.RADICAL,
  },
  {
    id: 128,
    characters: '合',
    meanings: ['combine', 'join', 'union', 'fit', 'suit'],
    type: CharacterType.RADICAL,
  },
  {
    id: 129,
    characters: '谷',
    meanings: ['valley'],
    type: CharacterType.RADICAL,
  },
  {
    id: 130,
    characters: '黒',
    meanings: ['black'],
    type: CharacterType.RADICAL,
  },
];
export default RADICALS;
