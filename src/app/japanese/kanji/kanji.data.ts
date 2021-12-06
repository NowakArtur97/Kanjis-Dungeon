import CharacterType from '../common/enums/character-type.enum';
import Kanji from './models/kanji.model';

const KANJI: Kanji[] = [
  {
    characters: '上',
    meanings: ['above', 'up', 'over'],
    onyomi: ['じょう'],
    kunyomi: ['うえ', 'あ', 'のぼ', 'うわ', 'かみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '下',
    meanings: ['below', 'down', 'under', 'beneath'],
    onyomi: ['か', 'げ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
    type: CharacterType.KANJI,
  },
  {
    characters: '大',
    meanings: ['big', 'large'],
    onyomi: ['たい', 'だい'],
    kunyomi: ['おお'],
    nanori: ['ひろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '工',
    meanings: ['construction', 'industry', 'artisan', 'work', 'craft'],
    onyomi: ['こう', 'く'],
    type: CharacterType.KANJI,
  },
  {
    characters: '八',
    meanings: ['eight'],
    onyomi: ['はち'],
    kunyomi: ['や', 'よう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '入',
    meanings: ['enter'],
    onyomi: ['にゅう'],
    kunyomi: ['はい', 'い'],
    type: CharacterType.KANJI,
  },
  {
    characters: '山',
    meanings: ['mountain'],
    onyomi: ['さん'],
    kunyomi: ['やま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '口',
    meanings: ['mouth'],
    onyomi: ['こう', 'く'],
    kunyomi: ['くち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '九',
    meanings: ['nine'],
    onyomi: ['く', 'きゅう'],
    kunyomi: ['ここの'],
    type: CharacterType.KANJI,
  },
  {
    characters: '一',
    meanings: ['one'],
    onyomi: ['いち', 'いつ'],
    kunyomi: ['ひと'],
    nanori: ['かず'],
    type: CharacterType.KANJI,
  },
  {
    characters: '人',
    meanings: ['person'],
    onyomi: ['にん', 'じん'],
    kunyomi: ['ひと', 'と'],
    type: CharacterType.KANJI,
  },
  {
    characters: '力',
    meanings: ['power', 'strength'],
    onyomi: ['りょく', 'りき'],
    kunyomi: ['ちから'],
    type: CharacterType.KANJI,
  },
  {
    characters: '川',
    meanings: ['river'],
    onyomi: ['せん'],
    kunyomi: ['かわ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '七',
    meanings: ['seven'],
    onyomi: ['しち'],
    kunyomi: ['なな', 'なの'],
    type: CharacterType.KANJI,
  },
  {
    characters: '十',
    meanings: ['ten'],
    onyomi: ['じゅう'],
    kunyomi: ['とお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '三',
    meanings: ['three'],
    onyomi: ['さん'],
    kunyomi: ['み'],
    type: CharacterType.KANJI,
  },
  {
    characters: '二',
    meanings: ['two'],
    onyomi: ['に'],
    kunyomi: ['ふた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '女',
    meanings: ['woman'],
    onyomi: ['じょ'],
    kunyomi: ['おんな', 'め'],
    type: CharacterType.KANJI,
  },
  {
    characters: '又',
    meanings: ['again'],
    kunyomi: ['また'],
    type: CharacterType.KANJI,
  },
  {
    characters: '玉',
    meanings: ['ball'],
    onyomi: ['ぎょく'],
    kunyomi: ['たま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '本',
    meanings: ['book', 'origin', 'real', 'main'],
    onyomi: ['ほん'],
    kunyomi: ['もと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '子',
    meanings: ['child', 'kid'],
    onyomi: ['し', 'す'],
    kunyomi: ['こ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '丸',
    meanings: ['circle', 'circular', 'round'],
    onyomi: ['がん'],
    kunyomi: ['まる'],
    type: CharacterType.KANJI,
  },
  {
    characters: '正',
    meanings: ['correct'],
    onyomi: ['せい', 'しょう'],
    kunyomi: ['ただ', 'まさ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '土',
    meanings: ['dirt', 'soil', 'earth', 'ground'],
    onyomi: ['ど', 'と'],
    kunyomi: ['つち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '犬',
    meanings: ['dog'],
    onyomi: ['けん'],
    kunyomi: ['いぬ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '夕',
    meanings: ['evening'],
    onyomi: ['せき'],
    kunyomi: ['ゆう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '出',
    meanings: ['exit'],
    onyomi: ['しゅつ'],
    kunyomi: ['で', 'だ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '目',
    meanings: ['eye'],
    onyomi: ['もく'],
    kunyomi: ['め'],
    type: CharacterType.KANJI,
  },
  {
    characters: '了',
    meanings: ['finish', 'complete', 'end'],
    onyomi: ['りょう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '火',
    meanings: ['fire'],
    onyomi: ['か'],
    kunyomi: ['ひ', 'ほ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '五',
    meanings: ['five'],
    onyomi: ['ご'],
    kunyomi: ['いつ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '四',
    meanings: ['four'],
    onyomi: ['し'],
    kunyomi: ['よん', 'よ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '才',
    meanings: ['genius', 'wit', 'talent', 'ability'],
    onyomi: ['さい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '手',
    meanings: ['hand'],
    onyomi: ['しゅ', 'ず'],
    kunyomi: ['て'],
    type: CharacterType.KANJI,
  },
  {
    characters: '天',
    meanings: ['heaven'],
    onyomi: ['てん'],
    kunyomi: ['あま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '王',
    meanings: ['king'],
    onyomi: ['おう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '左',
    meanings: ['left'],
    onyomi: ['さ'],
    kunyomi: ['ひだり'],
    type: CharacterType.KANJI,
  },
  {
    characters: '中',
    meanings: ['middle', 'in', 'inside', 'center'],
    onyomi: ['ちゅう'],
    kunyomi: ['なか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '月',
    meanings: ['moon', 'month'],
    onyomi: ['げつ', 'がつ'],
    kunyomi: ['つき'],
    type: CharacterType.KANJI,
  },
  {
    characters: '々',
    meanings: ['repeater', 'repetition', 'reduplication', 'iteration mark'],
    kunyomi: ['のま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '田',
    meanings: ['rice paddy', 'rice field', 'field'],
    onyomi: ['でん'],
    kunyomi: ['た'],
    type: CharacterType.KANJI,
  },
  {
    characters: '右',
    meanings: ['right'],
    onyomi: ['ゆう', 'う'],
    kunyomi: ['みぎ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '六',
    meanings: ['six'],
    onyomi: ['ろく'],
    kunyomi: ['む'],
    type: CharacterType.KANJI,
  },
  {
    characters: '小',
    meanings: ['small', 'little'],
    onyomi: ['しょう'],
    kunyomi: ['ちい', 'こ', 'お'],
    type: CharacterType.KANJI,
  },
  {
    characters: '立',
    meanings: ['stand'],
    onyomi: ['りつ', 'りゅう'],
    kunyomi: ['た'],
    type: CharacterType.KANJI,
  },
  {
    characters: '丁',
    meanings: ['street'],
    onyomi: ['ちょう', 'てい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '日',
    meanings: ['sun', 'day'],
    onyomi: ['にち', 'じつ'],
    kunyomi: ['ひ', 'か', 'び'],
    type: CharacterType.KANJI,
  },
  {
    characters: '刀',
    meanings: ['sword', 'katana'],
    onyomi: ['とう'],
    kunyomi: ['かたな'],
    type: CharacterType.KANJI,
  },
  {
    characters: '千',
    meanings: ['thousand'],
    onyomi: ['せん'],
    kunyomi: ['ち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '木',
    meanings: ['tree', 'wood'],
    onyomi: ['もく', 'ぼく'],
    kunyomi: ['き', 'こ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '水',
    meanings: ['water'],
    onyomi: ['すい'],
    kunyomi: ['みず'],
    type: CharacterType.KANJI,
  },
  {
    characters: '白',
    meanings: ['white'],
    onyomi: ['はく'],
    kunyomi: ['しろ', 'しら'],
    type: CharacterType.KANJI,
  },
  {
    characters: '文',
    meanings: ['writing', 'sentence'],
    onyomi: ['ぶん', 'もん'],
    kunyomi: ['ふみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '円',
    meanings: ['yen', 'round', 'circle'],
    onyomi: ['えん'],
    kunyomi: ['まる'],
    type: CharacterType.KANJI,
  },
  {
    characters: '矢',
    meanings: ['arrow'],
    onyomi: ['し'],
    kunyomi: ['や'],
    type: CharacterType.KANJI,
  },
  {
    characters: '市',
    meanings: ['city'],
    onyomi: ['し'],
    kunyomi: ['いち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '牛',
    meanings: ['cow'],
    onyomi: ['ぎゅう'],
    kunyomi: ['うし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '切',
    meanings: ['cut'],
    onyomi: ['せつ', 'さい'],
    kunyomi: ['き'],
    type: CharacterType.KANJI,
  },
  {
    characters: '方',
    meanings: ['direction', 'way'],
    onyomi: ['ほう'],
    kunyomi: ['かた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '戸',
    meanings: ['door'],
    onyomi: ['こ'],
    kunyomi: ['と'],
    type: CharacterType.KANJI,
  },
  {
    characters: '太',
    meanings: ['fat'],
    onyomi: ['たい', 'た'],
    kunyomi: ['ふと'],
    nanori: ['おお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '父',
    meanings: ['father', 'dad'],
    onyomi: ['ふ'],
    kunyomi: ['ちち', 'とう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '少',
    meanings: ['few', 'a little'],
    onyomi: ['しょう'],
    kunyomi: ['すこ', 'すく'],
    type: CharacterType.KANJI,
  },
  {
    characters: '友',
    meanings: ['friend'],
    onyomi: ['ゆう'],
    kunyomi: ['とも'],
    type: CharacterType.KANJI,
  },
  {
    characters: '毛',
    meanings: ['fur', 'hair'],
    onyomi: ['もう'],
    kunyomi: ['け'],
    type: CharacterType.KANJI,
  },
  {
    characters: '半',
    meanings: ['half'],
    onyomi: ['はん'],
    kunyomi: ['なか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '心',
    meanings: ['heart'],
    onyomi: ['しん'],
    kunyomi: ['こころ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '内',
    meanings: ['inside', 'within'],
    onyomi: ['ない'],
    kunyomi: ['うち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '生',
    meanings: ['life'],
    onyomi: ['せい', 'しょう'],
    kunyomi: ['い', 'なま', 'う', 'は', 'き'],
    type: CharacterType.KANJI,
  },
  {
    characters: '台',
    meanings: ['machine', 'stand', 'basic', 'perform'],
    onyomi: ['だい', 'たい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '母',
    meanings: ['mother', 'mom'],
    onyomi: ['ぼ'],
    kunyomi: ['はは', 'かあ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '午',
    meanings: ['noon'],
    onyomi: ['ご'],
    type: CharacterType.KANJI,
  },
  {
    characters: '北',
    meanings: ['north'],
    onyomi: ['ほく'],
    kunyomi: ['きた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '今',
    meanings: ['now', 'immediately'],
    onyomi: ['こん', 'きん'],
    kunyomi: ['いま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '古',
    meanings: ['old'],
    onyomi: ['こ'],
    kunyomi: ['ふる'],
    type: CharacterType.KANJI,
  },
  {
    characters: '元',
    meanings: ['origin'],
    onyomi: ['げん', 'がん'],
    kunyomi: ['もと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '外',
    meanings: ['outside'],
    onyomi: ['がい'],
    kunyomi: ['そと', 'はず'],
    type: CharacterType.KANJI,
  },
  {
    characters: '分',
    meanings: ['part'],
    onyomi: ['ぶん', 'ふん', 'ぶ'],
    kunyomi: ['わ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '公',
    meanings: ['public'],
    onyomi: ['こう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '引',
    meanings: ['pull'],
    onyomi: ['いん'],
    kunyomi: ['ひ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '止',
    meanings: ['stop'],
    onyomi: ['し'],
    kunyomi: ['と', 'や'],
    type: CharacterType.KANJI,
  },
  {
    characters: '用',
    meanings: ['task', 'use', 'business', 'errand'],
    onyomi: ['よう'],
    kunyomi: ['もち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '万',
    meanings: ['ten thousand'],
    onyomi: ['まん', 'ばん'],
    type: CharacterType.KANJI,
  },
  {
    characters: '広',
    meanings: ['wide', 'broad', 'spread'],
    onyomi: ['こう'],
    kunyomi: ['ひろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '冬',
    meanings: ['winter'],
    onyomi: ['とう'],
    kunyomi: ['ふゆ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '百',
    meanings: ['hundred'],
    onyomi: ['ひゃく'],
    kunyomi: ['もも'],
    type: CharacterType.KANJI,
  },
  {
    characters: '金',
    meanings: ['gold'],
    onyomi: ['きん'],
    kunyomi: ['かね'],
    type: CharacterType.KANJI,
  },
  {
    characters: '休',
    meanings: ['rest'],
    onyomi: ['きゅう'],
    kunyomi: ['やす'],
    type: CharacterType.KANJI,
  },
  {
    characters: '耳',
    meanings: ['ear', 'ears'],
    onyomi: ['じ'],
    kunyomi: ['みみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '足',
    meanings: ['foot', 'leg', 'sufficient'],
    onyomi: ['そく'],
    kunyomi: ['あし', 'た'],
    type: CharacterType.KANJI,
  },
  {
    characters: '男',
    meanings: ['man', 'boy'],
    onyomi: ['だん', 'なん'],
    kunyomi: ['おとこ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '空',
    meanings: ['sky', 'empty'],
    onyomi: ['くう'],
    kunyomi: ['そら', 'あ', 'から', 'す'],
    type: CharacterType.KANJI,
  },
  {
    characters: '気',
    meanings: ['energy', 'spirit'],
    onyomi: ['き', 'け'],
    kunyomi: ['いき'],
    type: CharacterType.KANJI,
  },
  {
    characters: '見',
    meanings: ['see'],
    onyomi: ['けん'],
    kunyomi: ['み'],
    type: CharacterType.KANJI,
  },
  {
    characters: '雨',
    meanings: ['rain'],
    onyomi: ['う'],
    kunyomi: ['あめ', 'あま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '林',
    meanings: ['forest', 'grove'],
    onyomi: ['りん'],
    kunyomi: ['はやし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '森',
    meanings: ['forest', 'woods'],
    onyomi: ['しん'],
    kunyomi: ['もり'],
    type: CharacterType.KANJI,
  },
  {
    characters: '石',
    meanings: ['stone'],
    onyomi: ['せき'],
    kunyomi: ['いし', 'こく', 'しゃく'],
    type: CharacterType.KANJI,
  },
  {
    characters: '花',
    meanings: ['flower'],
    onyomi: ['か', 'け'],
    kunyomi: ['はな'],
    type: CharacterType.KANJI,
  },
  {
    characters: '虫',
    meanings: ['insect', 'bug'],
    onyomi: ['ちゅう', 'き'],
    kunyomi: ['むし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '町',
    meanings: ['town'],
    onyomi: ['ちょう'],
    kunyomi: ['まち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '村',
    meanings: ['village'],
    onyomi: ['そん'],
    kunyomi: ['むら'],
    type: CharacterType.KANJI,
  },
  {
    characters: '赤',
    meanings: ['red'],
    onyomi: ['せき'],
    kunyomi: ['あか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '青',
    meanings: ['blue'],
    onyomi: ['せい', 'しょう'],
    kunyomi: ['あお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '先',
    meanings: ['previous', 'ahead', 'past', 'former'],
    onyomi: ['せん'],
    kunyomi: ['さき', 'まず'],
    type: CharacterType.KANJI,
  },
  {
    characters: '早',
    meanings: ['early', 'fast', 'quick'],
    onyomi: ['そう'],
    kunyomi: ['はや', 'さ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '名',
    meanings: ['name', 'famous'],
    onyomi: ['めい', 'みょう'],
    kunyomi: ['な'],
    type: CharacterType.KANJI,
  },
  {
    characters: '校',
    meanings: ['school'],
    onyomi: ['こう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '字',
    meanings: ['letter', 'character', 'symbol'],
    onyomi: ['じ'],
    kunyomi: ['あざ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '学',
    meanings: ['study', 'learn', 'learning'],
    onyomi: ['がく'],
    kunyomi: ['まな'],
    type: CharacterType.KANJI,
  },
  {
    characters: '年',
    meanings: ['year'],
    onyomi: ['ねん'],
    kunyomi: ['とし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '音',
    meanings: ['sound'],
    onyomi: ['おん', 'いん'],
    kunyomi: ['おと', 'ね'],
    type: CharacterType.KANJI,
  },
  {
    characters: '糸',
    meanings: ['thread'],
    onyomi: ['し'],
    kunyomi: ['いと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '車',
    meanings: ['car'],
    onyomi: ['しゃ'],
    kunyomi: ['くるま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '貝',
    meanings: ['shellfish', 'shell'],
    kunyomi: ['かい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '草',
    meanings: ['grass', 'weed'],
    onyomi: ['そう'],
    kunyomi: ['くさ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '竹',
    meanings: ['bamboo'],
    kunyomi: ['たけ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '雲',
    meanings: ['cloud'],
    onyomi: ['うん'],
    kunyomi: ['くも'],
    type: CharacterType.KANJI,
  },
  {
    characters: '何',
    meanings: ['what'],
    onyomi: ['か'],
    kunyomi: ['なに', 'なん'],
    type: CharacterType.KANJI,
  },
  {
    characters: '科',
    meanings: ['course', 'science', 'department'],
    onyomi: ['か'],
    type: CharacterType.KANJI,
  },
  {
    characters: '遠',
    meanings: ['far'],
    onyomi: ['えん'],
    kunyomi: ['とお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '夏',
    meanings: ['summer'],
    onyomi: ['げ', 'か', 'が'],
    kunyomi: ['なつ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '家',
    meanings: ['house', 'home'],
    onyomi: ['か', 'け'],
    kunyomi: ['いえ', 'や', 'うち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '歌',
    meanings: ['song', 'sing'],
    onyomi: ['か'],
    kunyomi: ['うた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '画',
    meanings: ['drawing', 'picture', 'painting', 'stroke'],
    onyomi: ['が', 'かく'],
    type: CharacterType.KANJI,
  },
  {
    characters: '会',
    meanings: ['meet'],
    onyomi: ['かい'],
    kunyomi: ['あ', 'え'],
    type: CharacterType.KANJI,
  },
  {
    characters: '海',
    meanings: ['sea', 'ocean'],
    onyomi: ['かい'],
    kunyomi: ['うみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '回',
    meanings: ['times', 'revolve', 'turn', 'go around'],
    onyomi: ['かい'],
    kunyomi: ['まわ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '絵',
    meanings: ['drawing', 'picture', 'painting'],
    onyomi: ['かい', 'え'],
    type: CharacterType.KANJI,
  },
  {
    characters: '園',
    meanings: ['garden', 'park'],
    onyomi: ['えん'],
    kunyomi: ['その'],
    type: CharacterType.KANJI,
  },
  {
    characters: '間',
    meanings: ['interval', 'space'],
    onyomi: ['かん', 'けん'],
    kunyomi: ['あいだ', 'ま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '顔',
    meanings: ['face'],
    onyomi: ['がん'],
    kunyomi: ['かお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '汽',
    meanings: ['steam'],
    onyomi: ['き'],
    type: CharacterType.KANJI,
  },
  {
    characters: '記',
    meanings: ['write down', 'record', 'chronicle'],
    onyomi: ['き'],
    kunyomi: ['しる'],
    type: CharacterType.KANJI,
  },
  {
    characters: '帰',
    meanings: ['return', 'return home'],
    onyomi: ['き'],
    kunyomi: ['かえ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '魚',
    meanings: ['fish'],
    onyomi: ['ぎょ'],
    kunyomi: ['うお', 'さかな'],
    type: CharacterType.KANJI,
  },
  {
    characters: '京',
    meanings: ['capital'],
    onyomi: ['きょう', 'けい'],
    kunyomi: ['みやこ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '教',
    meanings: ['teach'],
    onyomi: ['きょう'],
    kunyomi: ['おし', 'おそ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '強',
    meanings: ['strong', 'strength', 'strengthen'],
    onyomi: ['きょう', 'ごう'],
    kunyomi: ['つよ', 'し'],
    type: CharacterType.KANJI,
  },
  {
    characters: '角',
    meanings: ['angle', 'corner', 'antler'],
    onyomi: ['かく'],
    kunyomi: ['かど', 'つの'],
    type: CharacterType.KANJI,
  },
  {
    characters: '近',
    meanings: ['near', 'close'],
    onyomi: ['きん', 'こん'],
    kunyomi: ['ちか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '形',
    meanings: ['shape', 'form', 'appearance'],
    onyomi: ['けい', 'ぎょう'],
    kunyomi: ['かた', 'かたち'],
    type: CharacterType.KANJI,
  },
  {
    characters: '計',
    meanings: ['measure', 'measurement', 'plan'],
    onyomi: ['けい'],
    kunyomi: ['はか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '語',
    meanings: ['language', 'speak', 'word'],
    onyomi: ['ご'],
    kunyomi: ['かた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '原',
    meanings: ['original', 'fundamental', 'field'],
    onyomi: ['げん'],
    kunyomi: ['はら'],
    type: CharacterType.KANJI,
  },
  {
    characters: '後',
    meanings: ['after', 'behind', 'back', 'later'],
    onyomi: ['ご', 'こう'],
    kunyomi: ['のち', 'うし', 'あと', 'おく'],
    type: CharacterType.KANJI,
  },
  {
    characters: '交',
    meanings: ['mix', 'mingle', 'exchange', 'intercourse'],
    onyomi: ['こう'],
    kunyomi: ['まじ', 'ま', 'か'],
    type: CharacterType.KANJI,
  },
  {
    characters: '光',
    meanings: ['sunlight', 'light', 'shine', 'brilliance'],
    onyomi: ['こう'],
    kunyomi: ['ひかり', 'ひか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '行',
    meanings: ['go', 'do', 'conduct', 'stroke'],
    onyomi: ['こう', 'ぎょう'],
    kunyomi: ['い', 'ゆ', 'おこな'],
    type: CharacterType.KANJI,
  },
  {
    characters: '考',
    meanings: ['think', 'consider'],
    onyomi: ['こう'],
    kunyomi: ['かんが'],
    type: CharacterType.KANJI,
  },
  {
    characters: '高',
    meanings: ['tall', 'expensive', 'high'],
    onyomi: ['こう'],
    kunyomi: ['たか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '黄',
    meanings: ['yellow'],
    onyomi: ['こう', 'おう'],
    kunyomi: ['き', 'こ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '合',
    meanings: ['combine', 'join', 'union', 'fit', 'suit'],
    onyomi: ['ごう', 'がっ', 'かっ'],
    kunyomi: ['あ', 'あい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '谷',
    meanings: ['valley'],
    onyomi: ['こく'],
    kunyomi: ['たに'],
    nanori: ['せ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '国',
    meanings: ['country', 'nation'],
    onyomi: ['こく'],
    kunyomi: ['くに'],
    type: CharacterType.KANJI,
  },
  {
    characters: '黒',
    meanings: ['black'],
    onyomi: ['こく'],
    kunyomi: ['くろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '作',
    meanings: ['make', 'work'],
    onyomi: ['さく', 'さ'],
    kunyomi: ['つく'],
    type: CharacterType.KANJI,
  },
  {
    characters: '算',
    meanings: ['calculate', 'count'],
    onyomi: ['さん'],
    kunyomi: ['そろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '自',
    meanings: ['oneself', 'self'],
    onyomi: ['じ', 'し'],
    kunyomi: ['みずか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '寺',
    meanings: ['temple'],
    onyomi: ['じ'],
    kunyomi: ['てら'],
    type: CharacterType.KANJI,
  },
  {
    characters: '時',
    meanings: ['time', `o'clock`, 'hour', 'occasion'],
    onyomi: ['じ'],
    kunyomi: ['とき'],
    type: CharacterType.KANJI,
  },
  {
    characters: '思',
    meanings: ['think', 'thought'],
    onyomi: ['し'],
    kunyomi: ['おも'],
    type: CharacterType.KANJI,
  },
  {
    characters: '紙',
    meanings: ['paper'],
    onyomi: ['し'],
    kunyomi: ['かみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '室',
    meanings: ['room'],
    onyomi: ['しつ'],
    kunyomi: ['むろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '社',
    meanings: ['shrine', 'company', 'society'],
    onyomi: ['しゃ'],
    kunyomi: ['やしろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '弱',
    meanings: ['weak'],
    onyomi: ['じゃく'],
    kunyomi: ['よわ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '首',
    meanings: ['neck'],
    onyomi: ['しゅ'],
    kunyomi: ['くび'],
    type: CharacterType.KANJI,
  },
  {
    characters: '秋',
    meanings: ['autumn', 'fall'],
    onyomi: ['しゅう'],
    kunyomi: ['あき'],
    type: CharacterType.KANJI,
  },
  {
    characters: '春',
    meanings: ['spring'],
    onyomi: ['しゅん'],
    kunyomi: ['はる'],
    type: CharacterType.KANJI,
  },
  {
    characters: '書',
    meanings: ['write', 'writing', 'book'],
    onyomi: ['しょ'],
    kunyomi: ['か'],
    type: CharacterType.KANJI,
  },
  {
    characters: '場',
    meanings: ['location', 'place'],
    onyomi: ['じょう'],
    kunyomi: ['ば'],
    type: CharacterType.KANJI,
  },
  {
    characters: '色',
    meanings: ['color'],
    onyomi: ['しき', 'しょく'],
    kunyomi: ['いろ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '食',
    meanings: ['eat', 'meal'],
    onyomi: ['しょく', 'じき'],
    kunyomi: ['た', 'く'],
    type: CharacterType.KANJI,
  },
  {
    characters: '新',
    meanings: ['new', 'fresh', 'novel'],
    onyomi: ['しん'],
    kunyomi: ['あたら', 'あら', 'にい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '親',
    meanings: ['parent', 'intimate'],
    onyomi: ['しん'],
    kunyomi: ['おや', 'した'],
    type: CharacterType.KANJI,
  },
  {
    characters: '図',
    meanings: ['diagram', 'figure', 'drawing'],
    onyomi: ['ず', 'と'],
    kunyomi: ['え', 'はか'],
    type: CharacterType.KANJI,
  },
  {
    characters: '数',
    meanings: ['count', 'number', 'amount'],
    onyomi: ['すう'],
    kunyomi: ['かぞ', 'かず'],
    type: CharacterType.KANJI,
  },
  {
    characters: '西',
    meanings: ['west'],
    onyomi: ['せい', 'さい'],
    kunyomi: ['にし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '声',
    meanings: ['voice', 'reputation'],
    onyomi: ['せい'],
    kunyomi: ['こえ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '星',
    meanings: ['star'],
    onyomi: ['せい'],
    kunyomi: ['ほし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '晴',
    meanings: ['clear up', 'clear'],
    onyomi: ['せい'],
    kunyomi: ['は'],
    type: CharacterType.KANJI,
  },
  {
    characters: '楽',
    meanings: ['comfort', 'ease', 'pleasure', 'enjoyable'],
    onyomi: ['らく', 'がく'],
    kunyomi: ['たの'],
    type: CharacterType.KANJI,
  },
  {
    characters: '多',
    meanings: ['many', 'much', 'lots of', 'multiple'],
    onyomi: ['た'],
    kunyomi: ['おお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '明',
    meanings: ['bright', 'light', 'clear'],
    onyomi: ['めい', 'みょう', 'みん'],
    kunyomi: ['あ', 'あか', 'あき'],
    type: CharacterType.KANJI,
  },
  {
    characters: '細',
    meanings: ['thin', 'narrow', 'fine'],
    onyomi: ['さい'],
    kunyomi: ['ほそ', 'こま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '長',
    meanings: ['long', 'far', 'chief', 'leader'],
    onyomi: ['ちょう'],
    kunyomi: ['なが'],
    nanori: ['は'],
    type: CharacterType.KANJI,
  },
  {
    characters: '体',
    meanings: ['body', 'style'],
    onyomi: ['たい'],
    kunyomi: ['からだ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '頭',
    meanings: ['head'],
    onyomi: ['ず', 'とう', 'と'],
    kunyomi: ['あたま', 'かしら'],
    type: CharacterType.KANJI,
  },
  {
    characters: '兄',
    meanings: ['older brother', 'elder brother', 'big brother'],
    onyomi: ['きょう', 'けい'],
    kunyomi: ['あに', 'にい'],
    type: CharacterType.KANJI,
  },
  {
    characters: '弟',
    meanings: ['younger brother', 'little brother'],
    onyomi: ['だい', 'で', 'てい'],
    kunyomi: ['おとうと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '姉',
    meanings: ['older sister', 'elder sister', 'big sister'],
    onyomi: ['し'],
    kunyomi: ['お', 'あね', 'ねえ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '妹',
    meanings: ['younger sister', 'little sister'],
    onyomi: ['まい'],
    kunyomi: ['いもうと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '通',
    meanings: ['pass', 'pass through', 'go to and from'],
    onyomi: ['つう', 'つ'],
    kunyomi: ['とお', 'かよ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '走',
    meanings: ['run'],
    onyomi: ['そう'],
    kunyomi: ['はし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '歩',
    meanings: ['walk', 'step', 'rate'],
    onyomi: ['ほ', 'ぶ', 'ふ'],
    kunyomi: ['ある', 'あゆ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '来',
    meanings: ['come', 'next', 'since'],
    onyomi: ['らい'],
    kunyomi: ['く', 'きた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '売',
    meanings: ['sell'],
    onyomi: ['ばい'],
    kunyomi: ['う'],
    type: CharacterType.KANJI,
  },
  {
    characters: '買',
    meanings: ['buy'],
    onyomi: ['ばい'],
    kunyomi: ['か'],
    type: CharacterType.KANJI,
  },
  {
    characters: '読',
    meanings: ['read'],
    onyomi: ['とう', 'どく', 'とく'],
    kunyomi: ['よ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '当',
    meanings: ['correct', 'right', 'success', 'hit', 'appropriate'],
    onyomi: ['とう'],
    kunyomi: ['あ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '直',
    meanings: ['fix', 'direct', 'soon', 'honestly'],
    onyomi: ['ちょく', 'じき'],
    kunyomi: ['ただ', 'なお'],
    type: CharacterType.KANJI,
  },
  {
    characters: '活',
    meanings: ['lively', 'live', 'life'],
    onyomi: ['かつ'],
    kunyomi: ['い'],
    type: CharacterType.KANJI,
  },
  {
    characters: '聞',
    meanings: ['hear', 'listen to', 'ask'],
    onyomi: ['ぶん', 'もん'],
    kunyomi: ['き'],
    type: CharacterType.KANJI,
  },
  {
    characters: '言',
    meanings: ['say', 'speak', 'word'],
    onyomi: ['げん', 'ごん'],
    kunyomi: ['い', 'こと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '話',
    meanings: ['story', 'conversation', 'talk', 'speak'],
    onyomi: ['わ'],
    kunyomi: ['はな', 'はなし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '答',
    meanings: ['answer', 'response', 'reply'],
    onyomi: ['とう'],
    kunyomi: ['こた'],
    type: CharacterType.KANJI,
  },
  {
    characters: '知',
    meanings: ['know', 'knowledge'],
    onyomi: ['ち'],
    kunyomi: ['し'],
    type: CharacterType.KANJI,
  },
  {
    characters: '肉',
    meanings: ['meat'],
    onyomi: ['にく'],
    type: CharacterType.KANJI,
  },
  {
    characters: '麦',
    meanings: ['wheat', 'barley', 'oats'],
    onyomi: ['ばく'],
    kunyomi: ['むぎ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '米',
    meanings: ['rice', 'america'],
    onyomi: ['べい', 'まい'],
    kunyomi: ['こめ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '鳥',
    meanings: ['bird'],
    onyomi: ['ちょう'],
    kunyomi: ['とり'],
    type: CharacterType.KANJI,
  },
  {
    characters: '鳴',
    meanings: ['chirp', 'sing', 'howl'],
    onyomi: ['めい'],
    kunyomi: ['な'],
    type: CharacterType.KANJI,
  },
  {
    characters: '馬',
    meanings: ['horse'],
    onyomi: ['ば', 'め'],
    kunyomi: ['うま', 'ま'],
    type: CharacterType.KANJI,
  },
  {
    characters: '組',
    meanings: ['group', 'association', 'team', 'construct', 'assemble'],
    onyomi: ['そ'],
    kunyomi: ['く', 'くみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '番',
    meanings: [
      'number in a series',
      'turn',
      'ordinal number',
      'number',
      'watch',
      'guard',
    ],
    onyomi: ['ばん'],
    type: CharacterType.KANJI,
  },
  {
    characters: '点',
    meanings: ['point', 'dot', 'mark'],
    onyomi: ['てん'],
    kunyomi: ['つ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '羽',
    meanings: ['feather', 'feathers', 'wing', 'wing'],
    onyomi: ['う'],
    kunyomi: ['はね', 'は', 'わ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '週',
    meanings: ['week'],
    onyomi: ['しゅう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '曜',
    meanings: ['day of the week', 'weekday'],
    onyomi: ['よう'],
    type: CharacterType.KANJI,
  },
  {
    characters: '毎',
    meanings: ['every', 'each'],
    onyomi: ['まい'],
    kunyomi: ['ごと'],
    type: CharacterType.KANJI,
  },
  {
    characters: '東',
    meanings: ['east'],
    onyomi: ['とう'],
    kunyomi: ['ひがし'],
    type: CharacterType.KANJI,
  },
  {
    characters: '南',
    meanings: ['south'],
    onyomi: ['なん'],
    kunyomi: ['みなみ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '風',
    meanings: ['wind', 'style'],
    onyomi: ['ふう', 'ふ'],
    kunyomi: ['かぜ', 'かざ'],
    type: CharacterType.KANJI,
  },
  {
    characters: '雪',
    meanings: ['snow'],
    onyomi: ['せつ'],
    kunyomi: ['ゆき'],
    type: CharacterType.KANJI,
  },
  {
    characters: '岩',
    meanings: ['boulder', 'rock'],
    onyomi: ['がん'],
    kunyomi: ['いわ'],
    type: CharacterType.KANJI,
  },
];

export default KANJI;
