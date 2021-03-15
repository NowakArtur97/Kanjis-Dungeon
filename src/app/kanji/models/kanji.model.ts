import Radical from 'src/app/radical/models/radical.model';

export default interface Kanji extends Radical {
  readonly onyomi?: string[];
  readonly kunyomi?: string[];
  readonly nanori?: string[];
}
