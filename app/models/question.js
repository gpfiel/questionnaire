import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class QuestionModel extends Model {
  @attr('string') identifier;
  @attr('string') question_type;
  @attr('string') headline;
  @attr('boolean') required;
  @attr('string') multiple;
  @attr('string') next;
  @hasMany('choice') choices;
  @attr() jumps;

  @computed('choices.@each.selected')
  get isAnyChoiceSelected () {
    return this.choices.isAny('selected', true)
  }
}
