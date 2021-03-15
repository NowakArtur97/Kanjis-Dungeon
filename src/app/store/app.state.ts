import * as fromRadical from '../radical/store/radical.reducer';
import * as fromVocabulary from '../vocabulary/store/vocabulary.reducer';

export default interface AppStoreState {
  radical: fromRadical.RadicalStoreState;
  vocabulary: fromVocabulary.VocabularyStoreState;
}
