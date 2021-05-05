import * as fromDeck from '../game/deck/store/deck.reducer';
import * as fromEnemy from '../game/enemy/store/enemy.reducer';
import * as fromPlayer from '../game/player/store/player.reducer';
import * as fromGame from '../game/store/game.reducer';
import * as fromKanji from '../japanese/kanji/store/kanji.reducer';
import * as fromRadical from '../japanese/radical/store/radical.reducer';
import * as fromVocabulary from '../japanese/vocabulary/store/vocabulary.reducer';
import * as fromQuiz from '../quiz/store/quiz.reducer';

export default interface AppStoreState {
  radical: fromRadical.RadicalStoreState;
  kanji: fromKanji.KanjiStoreState;
  vocabulary: fromVocabulary.VocabularyStoreState;

  quiz: fromQuiz.QuizStoreState;

  game: fromGame.GameStoreState;
  player: fromPlayer.PlayerStoreState;
  enemy: fromEnemy.EnemyStoreState;
  deck: fromDeck.DeckStoreState;
}
