import Controller from '@ember/controller';
import Quiz from '../constants/quiz';
import { map } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class ApplicationController extends Controller {
  @service('store') store
  @service('global') global

  questionnaire = Quiz.questionnaire;
  questions = Quiz.questionnaire.questions;

  constructor() {
    super(...arguments)
    this.global.questionSelected = this.questionsWithNextIndentifier.firstObject.identifier
  }

  @computed('global.questionSelected', 'questionsWithNextIndentifier')
  get getQuestionSelected () {
    return this.questionsWithNextIndentifier.find((question) => {
      return question.identifier == this.global.questionSelected
    })
  }

  @map('questions', function(question, index) {
    let choices = question.choices
    delete question.choices 
    let questionTmp = this.store.createRecord('question', {id: question.identifier, image: Math.floor(Math.random() * 10) + 1, ...question} )
    choices && choices.forEach(choice => {
      this.store.createRecord('choice', {
        question: questionTmp, 
        label: choice.label, 
        value: choice.value, 
        selected: choice.selected
      })
    });
    
    questionTmp.next = this.questions[index + 1] ? this.questions[index + 1].identifier : null
    questionTmp.before = this.questions[index - 1] ? this.questions[index - 1].identifier : null
    return questionTmp
  })
  questionsWithNextIndentifier;

  @action navigateTo(direction) {
    if (!this.getQuestionSelected)
      this.global.questionSelected = this.questionsWithNextIndentifier.firstObject.identifier
      
    if (direction == "up" && this.getQuestionSelected && this.getQuestionSelected.before)
      this.global.questionSelected = this.getQuestionSelected.before
    else if (direction == "down" && this.getQuestionSelected && this.getQuestionSelected.next)
      this.global.questionSelected = this.getQuestionSelected.next
    
    this.getQuestionSelected && document.getElementById(this.getQuestionSelected.identifier).scrollIntoView();
  }

}
