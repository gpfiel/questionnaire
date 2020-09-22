import Controller from '@ember/controller';
import Quiz from '../constants/quiz';
import { map } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service('store') store

  questions = Quiz.questionnaire.questions;

  @map('questions', function(question, index) {
    let choices = question.choices
    delete question.choices 
    let questionTmp = this.store.createRecord('question', {id: question.identifier, ...question} )
    choices && choices.forEach(choice => {
      this.store.createRecord('choice', {
        question: questionTmp, 
        label: choice.label, 
        value: choice.value, 
        selected: choice.selected
      })
    });
    
    questionTmp.next = this.questions[index + 1] ? this.questions[index + 1].identifier : null
    return questionTmp
  })
  questionsWithNextIndentifier;
}
