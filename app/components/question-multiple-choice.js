import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class QuestionMultipleChoiceComponent extends Component {
  @service('global') global
  
  alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split('');

  @action checkOption(choice, question, confirm) {
    if (question.multiple != "true") question.choices.setEach('selected', false)
    if (choice) choice.selected = !choice.selected
    if ((!question.required && question.multiple == "true" && confirm) 
        || (question.required && question.multiple == "true" && confirm && question.isAnyChoiceSelected) 
        || (question.multiple == "false")) {
            if (question.jumps.length) {
              const jumpTmp = question.jumps.filter((jump) => {
                return jump.conditions[0].value == choice.value
              })[0]
              this.global.questionSelected = jumpTmp.destination.id
            } else {
              this.global.questionSelected = question.next
            }
            this.global.questionSelected && document.getElementById(this.global.questionSelected).scrollIntoView();
          }
  }
}
