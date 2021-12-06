import Radical from 'src/app/japanese/radical/models/radical.model';

import QuizOptions from './quiz-options.model';

export default interface QuizProgress {
  questions: Radical[];
  answers: Radical[];
  mistakes: Radical[];
  quizOptions: QuizOptions;
}
