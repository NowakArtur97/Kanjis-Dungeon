import CharacterType from '../common/enums/character-type.enum';
import Radical from './models/radical.model';

const RADICALS: Radical[] = [
  {
    characters: '一',
    meanings: ['ground'],
    type: CharacterType.RADICAL,
  },
  { characters: '二', meanings: ['two'], type: CharacterType.RADICAL },
  { characters: '五', meanings: ['five'], type: CharacterType.RADICAL },
  { characters: '亠', meanings: ['lid'], type: CharacterType.RADICAL },
  { characters: 'ハ', meanings: ['fins'], type: CharacterType.RADICAL },
  {
    characters: '七',
    meanings: ['seven'],
    type: CharacterType.RADICAL,
  },
  { characters: '十', meanings: ['cross'], type: CharacterType.RADICAL },
  {
    characters: '工',
    meanings: ['construction'],
    type: CharacterType.RADICAL,
  },
  { characters: '丶', meanings: ['drop'], type: CharacterType.RADICAL },
  { characters: '入', meanings: ['enter'], type: CharacterType.RADICAL },
  { characters: '亅', meanings: ['barb'], type: CharacterType.RADICAL },
  { characters: '大', meanings: ['big'], type: CharacterType.RADICAL },
  {
    characters: '山',
    meanings: ['mountain'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '口',
    meanings: ['mouth'],
    type: CharacterType.RADICAL,
  },
  { characters: '九', meanings: ['nine'], type: CharacterType.RADICAL },
  {
    characters: '人',
    meanings: ['person'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '力',
    meanings: ['power'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '勹',
    meanings: ['prison'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '川',
    meanings: ['river'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '丿',
    meanings: ['slide'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '|',
    meanings: ['stick'],
    type: CharacterType.RADICAL,
  },
  { characters: '日', meanings: ['sun'], type: CharacterType.RADICAL },
  { characters: 'ト', meanings: ['toe'], type: CharacterType.RADICAL },
  {
    characters: '木',
    meanings: ['tree'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '女',
    meanings: ['woman'],
    type: CharacterType.RADICAL,
  },
  { characters: '本', meanings: ['book'], type: CharacterType.RADICAL },
  { characters: '弓', meanings: ['bow'], type: CharacterType.RADICAL },
  {
    characters: '子',
    meanings: ['child'],
    type: CharacterType.RADICAL,
  },
  { characters: '牛', meanings: ['cow'], type: CharacterType.RADICAL },
  { characters: '土', meanings: ['dirt'], type: CharacterType.RADICAL },
  {
    characters: '丷',
    meanings: ['horns'],
    type: CharacterType.RADICAL,
  },
  { characters: '犬', meanings: ['dog'], type: CharacterType.RADICAL },
  {
    characters: '夕',
    meanings: ['evening'],
    type: CharacterType.RADICAL,
  },
  { characters: '目', meanings: ['eye'], type: CharacterType.RADICAL },
  { characters: '火', meanings: ['fire'], type: CharacterType.RADICAL },
  { characters: '尸', meanings: ['flag'], type: CharacterType.RADICAL },
  { characters: '彡', meanings: ['hair'], type: CharacterType.RADICAL },
  { characters: '手', meanings: ['hand'], type: CharacterType.RADICAL },
  { characters: '冂', meanings: ['head'], type: CharacterType.RADICAL },
  {
    characters: '天',
    meanings: ['heaven'],
    type: CharacterType.RADICAL,
  },
  { characters: '王', meanings: ['king'], type: CharacterType.RADICAL },
  { characters: '儿', meanings: ['legs'], type: CharacterType.RADICAL },
  {
    characters: '中',
    meanings: ['middle'],
    type: CharacterType.RADICAL,
  },
  { characters: '月', meanings: ['moon'], type: CharacterType.RADICAL },
  {
    characters: 'ナ',
    meanings: ['narwhal'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'ム',
    meanings: ['private'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '田',
    meanings: ['rice paddy'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '小',
    meanings: ['small'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '立',
    meanings: ['stand'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '石',
    meanings: ['stone'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '又',
    meanings: ['stool'],
    type: CharacterType.RADICAL,
  },
  { characters: '止', meanings: ['stop'], type: CharacterType.RADICAL },
  {
    characters: '丁',
    meanings: ['street'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '刀',
    meanings: ['sword'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '千',
    meanings: ['thousand'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'メ',
    meanings: ['treasure'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '水',
    meanings: ['water'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '白',
    meanings: ['white'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '文',
    meanings: ['writing'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '矢',
    meanings: ['arrow'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '广',
    meanings: ['canopy'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '方',
    meanings: ['direction'],
    type: CharacterType.RADICAL,
  },
  { characters: '戸', meanings: ['door'], type: CharacterType.RADICAL },
  { characters: '干', meanings: ['dry'], type: CharacterType.RADICAL },
  {
    characters: '父',
    meanings: ['father'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '扌',
    meanings: ['fingers'],
    type: CharacterType.RADICAL,
  },
  { characters: '毛', meanings: ['fur'], type: CharacterType.RADICAL },
  {
    characters: '心',
    meanings: ['heart'],
    type: CharacterType.RADICAL,
  },
  { characters: '生', meanings: ['life'], type: CharacterType.RADICAL },
  { characters: '𠆢', meanings: ['hat'], type: CharacterType.RADICAL },
  { characters: '今', meanings: ['now'], type: CharacterType.RADICAL },
  { characters: '古', meanings: ['old'], type: CharacterType.RADICAL },
  {
    characters: '元',
    meanings: ['origin'],
    type: CharacterType.RADICAL,
  },
  { characters: '幺', meanings: ['poop'], type: CharacterType.RADICAL },
  {
    characters: '匕',
    meanings: ['spoon'],
    type: CharacterType.RADICAL,
  },
  { characters: '用', meanings: ['task'], type: CharacterType.RADICAL },
  {
    characters: '巾',
    meanings: ['towel'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '夂',
    meanings: ['winter'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '⺌',
    meanings: ['triceratops'],
    type: CharacterType.RADICAL,
  },
  { characters: '金', meanings: ['gold'], type: CharacterType.RADICAL },
  {
    characters: 'ｲ',
    meanings: ['leader'],
    type: CharacterType.RADICAL,
  },
  { characters: '耳', meanings: ['ear'], type: CharacterType.RADICAL },
  {
    characters: '足',
    meanings: ['leg', 'foot'],
    type: CharacterType.RADICAL,
  },
  { characters: '宀', meanings: ['roof'], type: CharacterType.RADICAL },
  {
    characters: '气',
    meanings: ['energy'],
    type: CharacterType.RADICAL,
  },
  { characters: '雨', meanings: ['rain'], type: CharacterType.RADICAL },
  {
    characters: '艹',
    meanings: ['flowers'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '虫',
    meanings: ['insect'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '寸',
    meanings: ['measurement'],
    type: CharacterType.RADICAL,
  },
  { characters: '赤', meanings: ['red'], type: CharacterType.RADICAL },
  { characters: '青', meanings: ['blue'], type: CharacterType.RADICAL },
  {
    characters: '見',
    meanings: ['see'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '龸',
    meanings: ['viking'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '糸',
    meanings: ['thread'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '車',
    meanings: ['car'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '貝',
    meanings: ['shellfish'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '竹',
    meanings: ['bamboo'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '云',
    meanings: ['cloud'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '可',
    meanings: ['lip ring'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '禾',
    meanings: ['grain'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '斗',
    meanings: ['ladle'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '⻌',
    meanings: ['scooter'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '袁',
    meanings: ['zombie'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '豕',
    meanings: ['pig'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '欠',
    meanings: ['lack'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '凵',
    meanings: ['box'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '会',
    meanings: ['meet'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '氵',
    meanings: ['tsunami'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '毋',
    meanings: ['window'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '門',
    meanings: ['gate'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '厂',
    meanings: ['cliff'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '頁',
    meanings: ['geoduck'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '言',
    meanings: ['say'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '己',
    meanings: ['oneself'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '刂',
    meanings: ['knife'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'ヨ',
    meanings: ['wolverine'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '冖',
    meanings: ['forehead'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '魚',
    meanings: ['fish'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '孝',
    meanings: ['teacher'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '斤',
    meanings: ['axe'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '开',
    meanings: ['lantern'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '原',
    meanings: ['original'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '彳',
    meanings: ['loiter'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '兀',
    meanings: ['pi'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '行',
    meanings: ['go'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '耂',
    meanings: ['coffin'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '丂',
    meanings: ['beggar'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '冋',
    meanings: ['mustache'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '黄',
    meanings: ['yellow'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '合',
    meanings: ['combine', 'join', 'union', 'fit', 'suit'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '谷',
    meanings: ['valley'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '黒',
    meanings: ['black'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '乍',
    meanings: ['key'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '廾',
    meanings: ['twenty'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '自',
    meanings: ['oneself'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '寺',
    meanings: ['temple'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '氏',
    meanings: ['clan'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'ネ',
    meanings: ['spirit'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '冫',
    meanings: ['ice'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '首',
    meanings: ['neck'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '聿',
    meanings: ['brush'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '易',
    meanings: ['easy'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '色',
    meanings: ['color'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '食',
    meanings: ['eat'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '米',
    meanings: ['rice'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '西',
    meanings: ['west'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '士',
    meanings: ['samurai'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '長',
    meanings: ['long'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '豆',
    meanings: ['beans'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '未',
    meanings: ['jet'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'マ',
    meanings: ['Mama'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '走',
    meanings: ['run'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '罒',
    meanings: ['net'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'L',
    meanings: ['lion'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '舌',
    meanings: ['tongue'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '言',
    meanings: ['say'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '肉',
    meanings: ['meat'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '鳥',
    meanings: ['bird'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '馬',
    meanings: ['horse'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '且',
    meanings: ['top hat'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '釆',
    meanings: ['sickle'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '占',
    meanings: ['fortune'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '灬',
    meanings: ['boil'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '羽',
    meanings: ['feathers'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '周',
    meanings: ['circumference'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '隹',
    meanings: ['turkey'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '几',
    meanings: ['table'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '里',
    meanings: ['village'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '予',
    meanings: ['beforehand'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '也',
    meanings: ['aligator'],
    type: CharacterType.RADICAL,
  },
  {
    characters: 'ホ',
    meanings: ['angel'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '尺',
    meanings: ['shrimp'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '乚',
    meanings: ['umbrella'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '舟',
    meanings: ['boat'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '皿',
    meanings: ['plate'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '弋',
    meanings: ['ceremony'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '世',
    meanings: ['world'],
    type: CharacterType.RADICAL,
  },
  {
    characters: '支',
    meanings: ['branch'],
    type: CharacterType.RADICAL,
  },
];
export default RADICALS;
