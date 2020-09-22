import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default class QuestionModel extends Model {
  @attr('string') identifier;
  @attr('string') question_type;
  @attr('string') headline;
  @attr('boolean') required;
  @attr('string') multiple;
  @attr('string') multiline;
  @attr('string') next;
  @attr('string') before;
  @attr('string') value;
  @hasMany('choice') choices;
  @attr() jumps;

  @computed('choices.@each.selected')
  get isAnyChoiceSelected () {
    return this.choices.isAny('selected', true)
  }

  @computed('value')
  get isEmptyText () {
    return isEmpty(this.value)
  }
}
