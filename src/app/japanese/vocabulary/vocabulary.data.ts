import CharacterType from '../common/enums/character-type.enum';
import Word from './models/word.model';

const VOCABULARY: Word[] = [
  {
    characters: '上',
    meanings: ['up', 'above', 'over'],
    reading: 'うえ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '下',
    meanings: ['down', 'below', 'under', 'beneath'],
    reading: 'した',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '下さい',
    meanings: ['please', 'please give me'],
    reading: 'ください',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '山',
    meanings: ['mountain'],
    reading: 'やま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '山びこ',
    meanings: ['echo', 'mountain echo'],
    reading: 'やまびこ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '口',
    meanings: ['mouth'],
    reading: 'くち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大きい',
    meanings: ['big', 'large'],
    reading: 'おおきい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '小さい',
    meanings: ['small', 'little'],
    reading: 'ちいさい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '入る',
    meanings: ['to enter', 'to go in'],
    reading: 'はいる',
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
    characters: '大きさ',
    meanings: ['size'],
    reading: 'おおきさ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'ふじ山',
    meanings: ['mt fuji', 'mount fuji'],
    reading: 'ふじさん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '人',
    meanings: ['person'],
    reading: 'ひと',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '人々',
    meanings: ['people', 'everybody'],
    reading: 'ひとびと',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '女',
    meanings: ['woman', 'female'],
    reading: 'おんな',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '女子',
    meanings: ['woman', 'girl'],
    reading: 'じょし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '女の子',
    meanings: ['young girl', 'girl', 'young lady', 'young woman'],
    reading: 'おんなのこ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '女の人',
    meanings: ['woman'],
    reading: 'おんなのひと',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '人口',
    meanings: ['population'],
    reading: 'じんこう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一',
    meanings: ['one'],
    reading: 'いち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二',
    meanings: ['two'],
    reading: 'に',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '三',
    meanings: ['three'],
    reading: 'さん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四',
    meanings: ['four'],
    reading: 'よん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五',
    meanings: ['five'],
    reading: 'ご',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '六',
    meanings: ['six'],
    reading: 'ろく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '七',
    meanings: ['seven'],
    reading: 'なな',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '八',
    meanings: ['eight'],
    reading: 'はち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '九',
    meanings: ['nine'],
    reading: 'きゅう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '十',
    meanings: ['ten'],
    reading: 'じゅう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '十六',
    meanings: ['sixteen'],
    reading: 'じゅうろく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四十',
    meanings: ['forty'],
    reading: 'よんじゅう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五十',
    meanings: ['fifty'],
    reading: 'ごじゅう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '百',
    meanings: ['hundred', 'one hundred'],
    reading: 'ひゃく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四百',
    meanings: ['four hundred'],
    reading: 'よんひゃく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五百',
    meanings: ['five hundred'],
    reading: 'ごひゃく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '千',
    meanings: ['thousand'],
    reading: 'せん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一千',
    meanings: ['one thousand'],
    reading: 'いっせん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四千',
    meanings: ['four thousand'],
    reading: 'よんせん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一つ',
    meanings: ['one thing'],
    reading: 'ひとつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二つ',
    meanings: ['two things'],
    reading: 'ふたつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '三つ',
    meanings: ['three things'],
    reading: 'みっつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四つ',
    meanings: ['four things'],
    reading: 'よっつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五つ',
    meanings: ['five things'],
    reading: 'いつつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '六つ',
    meanings: ['six things'],
    reading: 'むっつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '七つ',
    meanings: ['seven things'],
    reading: 'ななつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '八つ',
    meanings: ['eight things'],
    reading: 'やっつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '九つ',
    meanings: ['nine things'],
    reading: 'ここのつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '〜人',
    meanings: ['number of people', 'people', 'counter for people'],
    reading: 'にん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一人',
    meanings: ['alone', 'one person'],
    reading: 'ひとり',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二人',
    meanings: ['two people', 'pair', 'couple', 'two persons'],
    reading: 'ふたり',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '三人',
    meanings: ['three people', 'three persons'],
    reading: 'さんにん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '子',
    meanings: ['kid', 'child'],
    reading: 'こ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大人',
    meanings: ['adult', 'mature'],
    reading: 'おとな',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大人しい',
    meanings: ['obedient', 'quiet', 'calm'],
    reading: 'おとなしい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '人工',
    meanings: ['artificial', 'man made', 'human made'],
    reading: 'じんこう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '力',
    meanings: ['power', 'strength', 'ability'],
    reading: 'ちから',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '入力',
    meanings: ['input', 'enter', 'entry'],
    reading: 'にゅうりょく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '力いっぱい',
    meanings: ["with all one's strength", 'full power', 'as hard as one can'],
    reading: 'ちからいっぱい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '川',
    meanings: ['river'],
    reading: 'かわ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '玉',
    meanings: ['ball'],
    reading: 'たま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'ビ-玉',
    meanings: ['marble'],
    reading: 'び-だま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '日',
    meanings: ['sun', 'day'],
    reading: 'ひ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '本',
    meanings: ['book'],
    reading: 'ほん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '日本',
    meanings: ['japan'],
    reading: 'にほん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '手',
    meanings: ['hand', 'arm'],
    reading: 'て',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '上手',
    meanings: ['good at', 'skillful', 'skilled at', 'skilled'],
    reading: 'じょうず',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '下手',
    meanings: [
      'bad at',
      'not good at',
      'unskillful',
      'not skilled',
      'unskilled',
    ],
    reading: 'へた',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '上る',
    meanings: ['to climb', 'to go up'],
    reading: 'のぼる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '上げる',
    meanings: ['to lift', 'to raise', 'to increase'],
    reading: 'あげる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '下げる',
    meanings: ['to lower', 'to hang'],
    reading: 'さげる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '丸',
    meanings: ['circle', 'round', 'circular'],
    reading: 'まる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '丸い',
    meanings: ['circular', 'round', 'spherical'],
    reading: 'まるい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '丸ごと',
    meanings: ['whole', 'wholly', 'entirely', 'in its entirety'],
    reading: 'まるごと',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '正しい',
    meanings: ['correct', 'true', 'right'],
    reading: 'ただしい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '正す',
    meanings: ['to correct'],
    reading: 'ただす',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '犬',
    meanings: ['dog'],
    reading: 'いぬ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '子犬',
    meanings: ['puppy'],
    reading: 'こいぬ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '月',
    meanings: ['moon', 'month'],
    reading: 'つき',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一月',
    meanings: ['january'],
    reading: 'いちがつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二月',
    meanings: ['february'],
    reading: 'にがつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四月',
    meanings: ['april'],
    reading: 'しがつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五月',
    meanings: ['may'],
    reading: 'ごがつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '六月',
    meanings: ['june'],
    reading: 'ろくがつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '十月',
    meanings: ['october'],
    reading: 'じゅうがつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一日',
    meanings: ['one day', 'first day', 'day one'],
    reading: 'いちにち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二日',
    meanings: ['second day', 'two days', 'day two'],
    reading: 'ふつか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '三日',
    meanings: ['third day', 'three days', 'day three'],
    reading: 'みっか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '四日',
    meanings: ['fourth day', 'four days', 'day four'],
    reading: 'よっか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五日',
    meanings: ['fifth day', 'five days', 'day five'],
    reading: 'いつか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '六日',
    meanings: ['sixth day', 'six days', 'day six'],
    reading: 'むいか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '七日',
    meanings: ['seventh day', 'seven days', 'day seven'],
    reading: 'なのか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '八日',
    meanings: ['eight day', 'eight days', 'day eight'],
    reading: 'ようか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '九日',
    meanings: ['ninth day', 'nine days', 'day nine'],
    reading: 'ここのか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '十日',
    meanings: ['tenth day', 'ten days', 'day ten'],
    reading: 'とおか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '夕べ',
    meanings: ['evening', 'last night'],
    reading: 'ゆうべ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '出口',
    meanings: ['exit'],
    reading: 'でぐち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '出る',
    meanings: ['to exit', 'to leave', 'to attend', 'to come out', 'to go out'],
    reading: 'でる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '目',
    meanings: ['eye'],
    reading: 'め',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '目玉',
    meanings: ['eyeball'],
    reading: 'めだま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '火',
    meanings: ['fire'],
    reading: 'ひ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '火山',
    meanings: ['volcano'],
    reading: 'かざん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '王',
    meanings: ['king'],
    reading: 'おう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '王子',
    meanings: ['prince'],
    reading: 'おうじ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '女王',
    meanings: ['queen'],
    reading: 'じょおう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '王女',
    meanings: ['princess'],
    reading: 'おうじょ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '天',
    meanings: ['heaven'],
    reading: 'てん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '〜才',
    meanings: ['years old', 'age'],
    reading: 'さい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '天才',
    meanings: ['genius'],
    reading: 'てんさい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '中',
    meanings: ['inside', 'middle', 'center'],
    reading: 'なか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '中々',
    meanings: ['very', 'considerably', 'quite'],
    reading: 'なかなか',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '左',
    meanings: ['left', 'left direction'],
    reading: 'ひだり',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '右',
    meanings: ['right', 'right direction'],
    reading: 'みぎ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '左右',
    meanings: ['left and right', 'both ways', 'influence', 'control'],
    reading: 'さゆう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '円い',
    meanings: ['round', 'circular'],
    reading: 'まるい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '〜円',
    meanings: ['money', 'yen'],
    reading: 'えん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '千円',
    meanings: ['one thousand yen', 'a thousand yen', 'thousand yen'],
    reading: 'せんえん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '田',
    meanings: ['rice field', 'rice paddy'],
    reading: 'た',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '土',
    meanings: ['soil', 'earth', 'ground', 'dirt'],
    reading: 'つち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '刀',
    meanings: ['sword', 'katana'],
    reading: 'かたな',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '玉ねぎ',
    meanings: ['onion', 'round onion'],
    reading: 'たまねぎ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '立つ',
    meanings: ['to stand', 'to stand up', 'to rise'],
    reading: 'たつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '木',
    meanings: ['tree', 'wood'],
    reading: 'き',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '水',
    meanings: ['water'],
    reading: 'みず',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '水中',
    meanings: ['underwater'],
    reading: 'すいちゅう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '白',
    meanings: ['white'],
    reading: 'しろ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '白人',
    meanings: ['white person', 'caucasian'],
    reading: 'はくじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'アメリカ人',
    meanings: ['american', 'american person'],
    reading: 'あめりかじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'イギリス人',
    meanings: ['brit', 'british person'],
    reading: 'いぎりすじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'フランス人',
    meanings: ['frenchman', 'french person'],
    reading: 'ふらんすじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '文',
    meanings: ['writing', 'sentence'],
    reading: 'ぶん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '矢',
    meanings: ['arrow'],
    reading: 'や',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '市',
    meanings: ['city'],
    reading: 'し',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'シアトル市',
    meanings: ['seattle', 'city of seattle'],
    reading: 'しあとるし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '市立',
    meanings: ['municipal', 'city'],
    reading: 'しりつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '牛',
    meanings: ['cow', 'bull', 'ox'],
    reading: 'うし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '子牛',
    meanings: ['baby cow', 'calf'],
    reading: 'こうし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '切る',
    meanings: ['to cut'],
    reading: 'きる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大切',
    meanings: ['important', 'precious', 'valuable'],
    reading: 'たいせつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '方',
    meanings: ['way', 'direction'],
    reading: 'かた',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '戸',
    meanings: ['door', 'japanese style door'],
    reading: 'と',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '戸口',
    meanings: ['doorway'],
    reading: 'とぐち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '太い',
    meanings: ['fat', 'thick'],
    reading: 'ふとい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '太る',
    meanings: ['to get fat', 'to gain weight', 'to grow fat', 'to become fat'],
    reading: 'ふとる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '少女',
    meanings: ['girl', 'young lady'],
    reading: 'しょうじょ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '少ない',
    meanings: ['a few', 'scarce', 'not much', 'not many'],
    reading: 'すくない',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '少し',
    meanings: ['a little', 'a few', 'few'],
    reading: 'すこし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '友人',
    meanings: ['friend'],
    reading: 'ゆうじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '毛',
    meanings: ['fur', 'hair'],
    reading: 'け',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '半',
    meanings: ['half'],
    reading: 'はん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '〜台',
    meanings: ['big machine counter', 'machine counter', 'number of machines'],
    reading: 'だい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一台',
    meanings: ['one machine'],
    reading: 'いちだい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二台',
    meanings: ['two machines'],
    reading: 'にだい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '五台',
    meanings: ['five machines'],
    reading: 'ごだい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '十台',
    meanings: ['ten machines'],
    reading: 'じゅうだい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '母',
    meanings: ['mother', 'mom'],
    reading: 'はは',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'お母さん',
    meanings: ['mother', 'mom'],
    reading: 'おかあさん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '父',
    meanings: ['father', 'dad'],
    reading: 'ちち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'お父さん',
    meanings: ['father', 'dad', 'papa'],
    reading: 'おとうさん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '北',
    meanings: ['north'],
    reading: 'きた',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '今',
    meanings: ['now'],
    reading: 'いま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '今日',
    meanings: ['today'],
    reading: 'きょう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '今月',
    meanings: ['this month', 'current month'],
    reading: 'こんげつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '古い',
    meanings: ['old', 'ancient', 'out-of-date'],
    reading: 'ふるい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '中古',
    meanings: ['secondhand', 'used'],
    reading: 'ちゅうこ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '元',
    meanings: ['origin', 'ex', 'former'],
    reading: 'もと',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '外',
    meanings: ['outside'],
    reading: 'そと',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '外人',
    meanings: ['foreigner', 'outsider'],
    reading: 'がいじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '外れ',
    meanings: [
      'miss',
      'failure',
      'end',
      'extremity',
      'furthest point',
      'outskirts',
      'outer limits',
      'edge',
    ],
    reading: 'はずれ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '外す',
    meanings: ['to disconnect', 'to miss', 'to exclude', 'to remove'],
    reading: 'はずす',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '分',
    meanings: ['part', 'portion', 'content'],
    reading: 'ぶん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '半分',
    meanings: ['half'],
    reading: 'はんぶん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '分かる',
    meanings: ['to understand'],
    reading: 'わかる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '心',
    meanings: ['heart', 'mind', 'feeling'],
    reading: 'こころ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '内',
    meanings: ['inside', 'within'],
    reading: 'うち',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '生',
    meanings: ['fresh', 'raw', 'live'],
    reading: 'なま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '生まれる',
    meanings: ['to be born'],
    reading: 'うまれる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '人生',
    meanings: ['life', 'human life', "one's life"],
    reading: 'じんせい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '引く',
    meanings: ['to pull', 'to subtract', 'to attract'],
    reading: 'ひく',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '中止',
    meanings: ['suspension', 'cancellation', 'discontinuation'],
    reading: 'ちゅうし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '用',
    meanings: ['task', 'use', ' duty', 'service', 'business', 'purpose'],
    reading: 'よう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '用いる',
    meanings: ['to utilize', 'to use'],
    reading: 'もちいる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '公用',
    meanings: ['government business', 'official business'],
    reading: 'こうよう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '万',
    meanings: ['ten thousand'],
    reading: 'まん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一万',
    meanings: ['ten thousand'],
    reading: 'いちまん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '二万',
    meanings: ['twenty thousand'],
    reading: 'にまん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '十万',
    meanings: ['one hundred thousand', 'hundred thousand'],
    reading: 'じゅうまん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '広い',
    meanings: ['wide', 'spacious'],
    reading: 'ひろい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '広げる',
    meanings: ['to spread', 'to unfold', 'to open up'],
    reading: 'ひろげる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '冬',
    meanings: ['winter'],
    reading: 'ふゆ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '氷',
    meanings: ['ice'],
    reading: 'こおり',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '休日',
    meanings: ['holiday'],
    reading: 'きゅうじつ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '耳',
    meanings: ['ear', 'ears'],
    reading: 'みみ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '足',
    meanings: ['foot', 'leg'],
    reading: 'あし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '止める',
    meanings: ['to stop', 'to prevent'],
    reading: 'とめる',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'テ-ブルの上',
    meanings: ['on the table', 'tabletop'],
    reading: 'て-ぶるのうえ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: 'ベッドの下',
    meanings: ['below the bed', 'under the bed', 'beneath the bed'],
    reading: 'べっどのした',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '主人',
    meanings: ['husband', 'landlord', 'master', 'head of household'],
    reading: 'しゅじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '大気',
    meanings: ['atmosphere'],
    reading: 'たいき',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '花',
    meanings: ['flower'],
    reading: 'はな',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '花火',
    meanings: ['fireworks'],
    reading: 'はなび',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '虫',
    meanings: ['bug', 'insect'],
    reading: 'むし',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '赤ちゃん',
    meanings: ['baby'],
    reading: 'あかちゃん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '先ず',
    meanings: ['to start with', 'first of all', 'firstly', 'to begin with'],
    reading: 'まず',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '早い',
    meanings: ['fast', 'quick', 'early'],
    reading: 'はやい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '早々',
    meanings: [
      'as soon as',
      'quickly',
      'early',
      'just after',
      'immediately after',
      'promptly',
    ],
    reading: 'そうそう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '名人',
    meanings: ['expert', 'master'],
    reading: 'めいじん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '不正',
    meanings: ['injustice', 'dishonest', 'unauthorized'],
    reading: 'ふせい',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '気分',
    meanings: ['feeling', 'mood'],
    reading: 'きぶん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '元気',
    meanings: ['energetic', 'healthy', 'energy', 'health'],
    reading: 'げんき',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '平気',
    meanings: ['calm', 'okay', 'all right', 'cool'],
    reading: 'へいき',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '平ら',
    meanings: ['flat'],
    reading: 'たいら',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '竹',
    meanings: ['bamboo'],
    reading: 'たけ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '竹の子',
    meanings: ['bamboo sprout', 'bamboo shoot'],
    reading: 'たけのこ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '字',
    meanings: ['letter', 'character', 'symbol', 'kanji character'],
    reading: 'じ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '太字',
    meanings: ['bold letter', 'bold text', 'bold character'],
    reading: 'ふとじ',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '車',
    meanings: ['car'],
    reading: 'くるま',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '車内',
    meanings: ['inside the car', 'inside the bus', 'inside the train'],
    reading: 'しゃない',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '中央',
    meanings: ['center', 'centre', 'central'],
    reading: 'ちゅうおう',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '少年',
    meanings: ['boy', 'young boy', 'juvenile', 'youth'],
    reading: 'しょうねん',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '年内',
    meanings: [
      'by the end of the year',
      'before the end of the year',
      'within the year',
    ],
    reading: 'ねんない',
    type: CharacterType.VOCABULARY,
  },
  {
    characters: '一年生',
    meanings: ['first year student'],
    reading: 'いちねんせい',
    type: CharacterType.VOCABULARY,
  },
  // TODO: skipped first from vocbulary group
  // {
  //   characters: '',
  //   meanings: [''],
  //   reading: '',
  //   type: CharacterType.VOCABULARY,
  // },
];

export default VOCABULARY;
