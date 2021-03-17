import * as fromKanji from '../kanji/store/kanji.reducer';
import * as fromQuiz from '../quiz/store/quiz.reducer';
import * as fromRadical from '../radical/store/radical.reducer';
import * as fromVocabulary from '../vocabulary/store/vocabulary.reducer';

export default interface AppStoreState {
  radical: fromRadical.RadicalStoreState;
  kanji: fromKanji.KanjiStoreState;
  vocabulary: fromVocabulary.VocabularyStoreState;
  quiz: fromQuiz.QuizStoreState;
}
