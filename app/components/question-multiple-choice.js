import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class QuestionMultipleChoiceComponent extends Component {
  alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split('');

  @action checkOption(choice, question, confirm) {
    if (choice) choice.selected = !choice.selected
    if ((!question.required && question.multiple == "true" && confirm) ||
          (question.required && question.multiple == "true" && confirm && question.isAnyChoiceSelected) 
          || (question.multiple == "false"))
      question.next && document.getElementById(question.next).scrollIntoView();
  }
}
