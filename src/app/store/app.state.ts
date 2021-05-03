import * as fromKanji from '../japanese/kanji/store/kanji.reducer';
import * as fromRadical from '../japanese/radical/store/radical.reducer';
import * as fromVocabulary from '../japanese/vocabulary/store/vocabulary.reducer';
import * as fromQuiz from '../quiz/store/quiz.reducer';

export default interface AppStoreState {
  radical: fromRadical.RadicalStoreState;
  kanji: fromKanji.KanjiStoreState;
  vocabulary: fromVocabulary.VocabularyStoreState;
  quiz: fromQuiz.QuizStoreState;
}
