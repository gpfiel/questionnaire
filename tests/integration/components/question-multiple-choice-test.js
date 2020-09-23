import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Quiz from '../../../constants/quiz';

module('Integration | Component | question-multiple-choice', function(hooks) {
  setupRenderingTest(hooks);


  test('it renders', async function(assert) {
    assert.expect(3);

    this.store = this.owner.lookup('service:store')

    let question = Quiz.questionnaire.questions[0]
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

    this.set('question', questionTmp);

    await render(hbs`<QuestionMultipleChoice @question={{this.question}} />`);

    assert.equal(this.element.querySelector('span.title').textContent.trim(), 'Wen möchtest Du versichern?');
    assert.equal(this.element.querySelector('button.btn-primary').textContent.trim(), 'Next');
    assert.equal(this.element.querySelectorAll('.btn-option').length, 5, '5 results rendered');
    // row d-flex align-items-center justify-content-center h-100 c-snap

  });
});
