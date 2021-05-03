import Radical from 'src/app/japanese/radical/models/radical.model';

export default interface Word extends Radical {
  readonly reading: string;
}
