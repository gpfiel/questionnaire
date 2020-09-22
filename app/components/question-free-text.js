import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QuestionFreeTextComponent extends Component {
  @service('global') global

  @action validateText(question) {
    if (!question.required || (question.required && !question.isEmptyText)) {
      this.global.questionSelected = question.next
      question.next && document.getElementById(question.next).scrollIntoView();
    }
  }
}
