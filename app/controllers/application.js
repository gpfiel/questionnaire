import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Quiz from '../constants/quiz';

export default class ApplicationController extends Controller {
  // @tracked displayNext = false;
  questions = Quiz.questionnaire.questions;

  @action checkOption(option, navigateTo) {
    document.getElementById(navigateTo).scrollIntoView();
  }
}
