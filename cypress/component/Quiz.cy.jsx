import React from 'react';
import Quiz from '../client/src/components/Quiz';

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random'
    },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
    ).as('getRandomQuestion')
  });

  it('shoud render the quiz component', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />);
  });


  it('should render the quiz component with the proper content', () => {
    cy.mount(<Quiz />);
    cy.get('h2').should('have.text', 'Quiz Completed');
    cy.get('span').should('have.text', 'Loading...');
  });
});
