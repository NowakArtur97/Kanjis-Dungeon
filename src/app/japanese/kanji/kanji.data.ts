import CharacterType from '../common/enums/character-type.enum';
import Kanji from './models/kanji.model';

const KANJI: Kanji[] = [
  // {
  //   id: 1,
  //   characters: '上',
  //   meanings: ['above', 'up', 'over'],
  //   onyomi: ['じょう'],
  //   kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 2,
  //   characters: '下',
  //   meanings: ['below', 'down', 'under', 'beneath'],
  //   onyomi: ['か', 'げ'],
  //   kunyomi: ['した', 'さ', 'くだ', 'お'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 3,
  //   characters: '大',
  //   meanings: ['big', 'large'],
  //   onyomi: ['たい', 'だい'],
  //   kunyomi: ['おお'],
  //   nanori: ['ひろ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 4,
  //   characters: '工',
  //   meanings: ['construction', 'industry'],
  //   onyomi: ['こう', 'く'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 5,
  //   characters: '八',
  //   meanings: ['eight'],
  //   onyomi: ['はち'],
  //   kunyomi: ['や', 'よう'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 6,
  //   characters: '入',
  //   meanings: ['enter'],
  //   onyomi: ['にゅう'],
  //   kunyomi: ['はい', 'い'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 7,
  //   characters: '山',
  //   meanings: ['mountain'],
  //   onyomi: ['さん'],
  //   kunyomi: ['やま'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 8,
  //   characters: '口',
  //   meanings: ['mouth'],
  //   onyomi: ['こう', 'く'],
  //   kunyomi: ['くち'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 9,
  //   characters: '九',
  //   meanings: ['nine'],
  //   onyomi: ['く', 'きゅう'],
  //   kunyomi: ['ここの'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 10,
  //   characters: '一',
  //   meanings: ['one'],
  //   onyomi: ['いち', 'いつ'],
  //   kunyomi: ['ひと'],
  //   nanori: ['かず'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 11,
  //   characters: '人',
  //   meanings: ['person'],
  //   onyomi: ['にん', 'じん'],
  //   kunyomi: ['ひと', 'と'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 12,
  //   characters: '力',
  //   meanings: ['power', 'strength'],
  //   onyomi: ['りょく', 'りき'],
  //   kunyomi: ['ちから'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 13,
  //   characters: '川',
  //   meanings: ['river'],
  //   onyomi: ['せん'],
  //   kunyomi: ['かわ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 14,
  //   characters: '七',
  //   meanings: ['seven'],
  //   onyomi: ['しち'],
  //   kunyomi: ['なな', 'なの'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 15,
  //   characters: '十',
  //   meanings: ['ten'],
  //   onyomi: ['じゅう'],
  //   kunyomi: ['とお'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 16,
  //   characters: '三',
  //   meanings: ['three'],
  //   onyomi: ['さん'],
  //   kunyomi: ['み'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 17,
  //   characters: '二',
  //   meanings: ['two'],
  //   onyomi: ['に'],
  //   kunyomi: ['ふた'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 18,
  //   characters: '女',
  //   meanings: ['woman'],
  //   onyomi: ['じょ'],
  //   kunyomi: ['おんな', 'め'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 19,
  //   characters: '又',
  //   meanings: ['again'],
  //   kunyomi: ['また'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 20,
  //   characters: '玉',
  //   meanings: ['ball'],
  //   onyomi: ['ぎょく'],
  //   kunyomi: ['たま'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 21,
  //   characters: '本',
  //   meanings: ['book', 'origin', 'real', 'main'],
  //   onyomi: ['ほん'],
  //   kunyomi: ['もと'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 22,
  //   characters: '子',
  //   meanings: ['child', 'kid'],
  //   onyomi: ['し', 'す'],
  //   kunyomi: ['こ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 23,
  //   characters: '丸',
  //   meanings: ['circle', 'circular', 'round'],
  //   onyomi: ['がん'],
  //   kunyomi: ['まる'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 24,
  //   characters: '正',
  //   meanings: ['correct'],
  //   onyomi: ['せい', 'しょう'],
  //   kunyomi: ['ただ', 'まさ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 25,
  //   characters: '土',
  //   meanings: ['dirt', 'soil', 'earth', 'ground'],
  //   onyomi: ['ど', 'と'],
  //   kunyomi: ['つち'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 26,
  //   characters: '犬',
  //   meanings: ['dog'],
  //   onyomi: ['けん'],
  //   kunyomi: ['いぬ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 27,
  //   characters: '夕',
  //   meanings: ['evening'],
  //   onyomi: ['せき'],
  //   kunyomi: ['ゆう'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 28,
  //   characters: '出',
  //   meanings: ['exit'],
  //   onyomi: ['しゅつ'],
  //   kunyomi: ['で', 'だ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 29,
  //   characters: '目',
  //   meanings: ['eye'],
  //   onyomi: ['もく'],
  //   kunyomi: ['め'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 30,
  //   characters: '了',
  //   meanings: ['finish', 'complete', 'end'],
  //   onyomi: ['りょう'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 31,
  //   characters: '火',
  //   meanings: ['fire'],
  //   onyomi: ['か'],
  //   kunyomi: ['ひ', 'ほ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 32,
  //   characters: '五',
  //   meanings: ['five'],
  //   onyomi: ['ご'],
  //   kunyomi: ['いつ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 33,
  //   characters: '四',
  //   meanings: ['four'],
  //   onyomi: ['し'],
  //   kunyomi: ['よん', 'よ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 34,
  //   characters: '才',
  //   meanings: ['genius'],
  //   onyomi: ['さい'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 35,
  //   characters: '手',
  //   meanings: ['hand'],
  //   onyomi: ['しゅ', 'ず'],
  //   kunyomi: ['て'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 36,
  //   characters: '天',
  //   meanings: ['heaven'],
  //   onyomi: ['てん'],
  //   kunyomi: ['あま'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 37,
  //   characters: '王',
  //   meanings: ['king'],
  //   onyomi: ['おう'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 38,
  //   characters: '左',
  //   meanings: ['left'],
  //   onyomi: ['さ'],
  //   kunyomi: ['ひだり'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 39,
  //   characters: '中',
  //   meanings: ['middle', 'in', 'inside', 'center'],
  //   onyomi: ['ちゅう'],
  //   kunyomi: ['なか'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 40,
  //   characters: '月',
  //   meanings: ['moon', 'month'],
  //   onyomi: ['げつ', 'がつ'],
  //   kunyomi: ['つき'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 41,
  //   characters: '々',
  //   meanings: ['repeater', 'repetition', 'reduplication', 'iteration mark'],
  //   kunyomi: ['のま'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 42,
  //   characters: '田',
  //   meanings: ['rice paddy', 'rice field', 'field'],
  //   onyomi: ['でん'],
  //   kunyomi: ['た'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 43,
  //   characters: '右',
  //   meanings: ['right'],
  //   onyomi: ['ゆう', 'う'],
  //   kunyomi: ['みぎ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 44,
  //   characters: '六',
  //   meanings: ['six'],
  //   onyomi: ['ろく'],
  //   kunyomi: ['む'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 45,
  //   characters: '小',
  //   meanings: ['small', 'little'],
  //   onyomi: ['しょう'],
  //   kunyomi: ['ちい', 'こ', 'お'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 46,
  //   characters: '立',
  //   meanings: ['stand'],
  //   onyomi: ['りつ', 'りゅう'],
  //   kunyomi: ['た'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 47,
  //   characters: '丁',
  //   meanings: ['street'],
  //   onyomi: ['ちょう', 'てい'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 48,
  //   characters: '日',
  //   meanings: ['sun', 'day'],
  //   onyomi: ['にち', 'じつ'],
  //   kunyomi: ['ひ', 'か', 'び'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 49,
  //   characters: '刀',
  //   meanings: ['sword', 'katana'],
  //   onyomi: ['とう'],
  //   kunyomi: ['かたな'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 50,
  //   characters: '千',
  //   meanings: ['thousand'],
  //   onyomi: ['せん'],
  //   kunyomi: ['ち'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 51,
  //   characters: '木',
  //   meanings: ['tree', 'wood'],
  //   onyomi: ['もく', 'ぼく'],
  //   kunyomi: ['き', 'こ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 52,
  //   characters: '水',
  //   meanings: ['water'],
  //   onyomi: ['すい'],
  //   kunyomi: ['みず'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 53,
  //   characters: '白',
  //   meanings: ['white'],
  //   onyomi: ['はく'],
  //   kunyomi: ['しろ', 'しら'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 54,
  //   characters: '文',
  //   meanings: ['writing', 'sentence'],
  //   onyomi: ['ぶん', 'もん'],
  //   kunyomi: ['ふみ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 55,
  //   characters: '円',
  //   meanings: ['yen', 'round', 'circle'],
  //   onyomi: ['えん'],
  //   kunyomi: ['まる'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 56,
  //   characters: '矢',
  //   meanings: ['arrow'],
  //   onyomi: ['し'],
  //   kunyomi: ['や'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 57,
  //   characters: '市',
  //   meanings: ['city'],
  //   onyomi: ['し'],
  //   kunyomi: ['いち'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 58,
  //   characters: '牛',
  //   meanings: ['cow'],
  //   onyomi: ['ぎゅう'],
  //   kunyomi: ['うし'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 59,
  //   characters: '切',
  //   meanings: ['cut'],
  //   onyomi: ['せつ'],
  //   kunyomi: ['き'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 60,
  //   characters: '方',
  //   meanings: ['direction', 'way'],
  //   onyomi: ['ほう'],
  //   kunyomi: ['かた'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 61,
  //   characters: '戸',
  //   meanings: ['door'],
  //   onyomi: ['こ'],
  //   kunyomi: ['と'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 62,
  //   characters: '太',
  //   meanings: ['fat'],
  //   onyomi: ['たい', 'た'],
  //   kunyomi: ['ふと'],
  //   nanori: ['おお'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 63,
  //   characters: '父',
  //   meanings: ['father', 'dad'],
  //   onyomi: ['ふ'],
  //   kunyomi: ['ちち', 'とう'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 64,
  //   characters: '少',
  //   meanings: ['few', 'a little'],
  //   onyomi: ['しょう'],
  //   kunyomi: ['すこ', 'すく'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 65,
  //   characters: '友',
  //   meanings: ['friend'],
  //   onyomi: ['ゆう'],
  //   kunyomi: ['とも'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 66,
  //   characters: '毛',
  //   meanings: ['fur', 'hair'],
  //   onyomi: ['もう'],
  //   kunyomi: ['け'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 67,
  //   characters: '半',
  //   meanings: ['half'],
  //   onyomi: ['はん'],
  //   kunyomi: ['なか'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 68,
  //   characters: '心',
  //   meanings: ['heart'],
  //   onyomi: ['しん'],
  //   kunyomi: ['こころ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 69,
  //   characters: '内',
  //   meanings: ['inside', 'within'],
  //   onyomi: ['ない'],
  //   kunyomi: ['うち'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 70,
  //   characters: '生',
  //   meanings: ['life'],
  //   onyomi: ['せい', 'しょう'],
  //   kunyomi: ['い', 'なま', 'う', 'は', 'き'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 71,
  //   characters: '台',
  //   meanings: ['machine'],
  //   onyomi: ['だい', 'たい'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 72,
  //   characters: '母',
  //   meanings: ['mother', 'mom'],
  //   onyomi: ['ぼ'],
  //   kunyomi: ['はは', 'かあ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 73,
  //   characters: '午',
  //   meanings: ['noon'],
  //   onyomi: ['ご'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 74,
  //   characters: '北',
  //   meanings: ['north'],
  //   onyomi: ['ほく'],
  //   kunyomi: ['きた'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 75,
  //   characters: '今',
  //   meanings: ['now'],
  //   onyomi: ['こん'],
  //   kunyomi: ['いま'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 76,
  //   characters: '古',
  //   meanings: ['old'],
  //   onyomi: ['こ'],
  //   kunyomi: ['ふる'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 77,
  //   characters: '元',
  //   meanings: ['origin'],
  //   onyomi: ['げん', 'がん'],
  //   kunyomi: ['もと'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 78,
  //   characters: '外',
  //   meanings: ['outside'],
  //   onyomi: ['がい'],
  //   kunyomi: ['そと', 'はず'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 79,
  //   characters: '分',
  //   meanings: ['part'],
  //   onyomi: ['ぶん', 'ふん', 'ぶ'],
  //   kunyomi: ['わ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 80,
  //   characters: '公',
  //   meanings: ['public'],
  //   onyomi: ['こう'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 81,
  //   characters: '引',
  //   meanings: ['pull'],
  //   onyomi: ['いん'],
  //   kunyomi: ['ひ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 82,
  //   characters: '止',
  //   meanings: ['stop'],
  //   onyomi: ['し'],
  //   kunyomi: ['と', 'や'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 83,
  //   characters: '用',
  //   meanings: ['task', 'use'],
  //   onyomi: ['よう'],
  //   kunyomi: ['もち'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 84,
  //   characters: '万',
  //   meanings: ['ten thousand'],
  //   onyomi: ['まん', 'ばん'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 85,
  //   characters: '広',
  //   meanings: ['wide'],
  //   onyomi: ['こう'],
  //   kunyomi: ['ひろ'],
  //   type: CharacterType.KANJI,
  // },
  // {
  //   id: 86,
  //   characters: '冬',
  //   meanings: ['winter'],
  //   onyomi: ['とう'],
  //   kunyomi: ['ふゆ'],
  //   type: CharacterType.KANJI,
  // },
  {
    id: 87,
    characters: '百',
    meanings: ['hundred'],
    onyomi: ['ひゃく'],
    kunyomi: ['もも'],
    type: CharacterType.KANJI,
  },
  {
    id: 88,
    characters: '金',
    meanings: ['gold'],
    onyomi: ['きん'],
    kunyomi: ['かね'],
    type: CharacterType.KANJI,
  },
  {
    id: 89,
    characters: '休',
    meanings: ['rest'],
    onyomi: ['きゅう'],
    kunyomi: ['やす'],
    type: CharacterType.KANJI,
  },
  {
    id: 90,
    characters: '耳',
    meanings: ['ear', 'ears'],
    onyomi: ['じ'],
    kunyomi: ['みみ'],
    type: CharacterType.KANJI,
  },
  {
    id: 91,
    characters: '足',
    meanings: ['foot', 'leg', 'sufficient'],
    onyomi: ['そく'],
    kunyomi: ['あし', 'た'],
    type: CharacterType.KANJI,
  },
  {
    id: 92,
    characters: '男',
    meanings: ['man', 'boy'],
    onyomi: ['だん', 'なん'],
    kunyomi: ['おとこ'],
    type: CharacterType.KANJI,
  },
  {
    id: 93,
    characters: '空',
    meanings: ['sky', 'empty'],
    onyomi: ['くう'],
    kunyomi: ['そら', 'あ', 'から', 'す'],
    type: CharacterType.KANJI,
  },
  {
    id: 94,
    characters: '気',
    meanings: ['energy', 'spirit'],
    onyomi: ['き', 'け'],
    kunyomi: ['いき'],
    type: CharacterType.KANJI,
  },
  {
    id: 95,
    characters: '雨',
    meanings: ['rain'],
    onyomi: ['う'],
    kunyomi: ['あめ', 'あま'],
    type: CharacterType.KANJI,
  },
  {
    id: 96,
    characters: '雨',
    meanings: ['rain'],
    onyomi: ['う'],
    kunyomi: ['あめ', 'あま'],
    type: CharacterType.KANJI,
  },
  {
    id: 97,
    characters: '林',
    meanings: ['forest', 'grove'],
    onyomi: ['りん'],
    kunyomi: ['はやし'],
    type: CharacterType.KANJI,
  },
  {
    id: 98,
    characters: '森',
    meanings: ['forest', 'woods'],
    onyomi: ['しん'],
    kunyomi: ['もり'],
    type: CharacterType.KANJI,
  },
  {
    id: 99,
    characters: '石',
    meanings: ['stone'],
    onyomi: ['せき'],
    kunyomi: ['いし', 'こく', 'しゃく'],
    type: CharacterType.KANJI,
  },
  {
    id: 100,
    characters: '花',
    meanings: ['flower'],
    onyomi: ['か', 'け'],
    kunyomi: ['はな'],
    type: CharacterType.KANJI,
  },
  {
    id: 101,
    characters: '虫',
    meanings: ['insect', 'bug'],
    onyomi: ['ちゅう', 'き'],
    kunyomi: ['むし'],
    type: CharacterType.KANJI,
  },
  {
    id: 102,
    characters: '町',
    meanings: ['town'],
    onyomi: ['ちょう'],
    kunyomi: ['まち'],
    type: CharacterType.KANJI,
  },
  // {
  //   id: 10,
  //   characters: '',
  //   meanings: [''],
  //   onyomi: [''],
  //   kunyomi: [''],
  //   type: CharacterType.KANJI,
  // },
];

export default KANJI;
