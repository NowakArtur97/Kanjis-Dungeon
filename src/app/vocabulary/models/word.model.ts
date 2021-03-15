import Radical from 'src/app/radical/models/radical.model';

export default interface Word extends Radical {
  readonly reading: string;
}
