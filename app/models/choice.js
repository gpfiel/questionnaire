import Model, { attr, belongsTo } from '@ember-data/model';

export default class ChoiceModel extends Model {
  @attr('string') label;
  @attr('string') value;
  @attr('boolean') selected;
  @belongsTo('question') question;
}
