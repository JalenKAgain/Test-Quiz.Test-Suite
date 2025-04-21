import Quiz from "../../client/src/components/Quiz"

describe('Quiz Component', () => {
  // Mock API response before each test
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/questions/random'
      },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
    ).as('getRandomQuestion');
  });

  it('should display the first question after starting the quiz', () => {
    cy.mount(<Quiz />); // Mount the Quiz component
    cy.get('button').contains('Start Quiz').click(); // Start the quiz

    // Verify the question card appears with a non-empty title
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should allow answering a question and show the completion message', () => {
    cy.mount(<Quiz />); // Mount the Quiz component
    cy.get('button').contains('Start Quiz').click(); // Start the quiz

    // Simulate answering a question (selecting answer "1")
    cy.get('button').contains('1').click();

    // Verify quiz completion message and score are shown
    cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'Your score');
  });

  it('should allow restarting the quiz after completion', () => {
    cy.mount(<Quiz />); // Mount the Quiz component
    cy.get('button').contains('Start Quiz').click(); // Start the quiz

    // Simulate answering a question
    cy.get('button').contains('1').click();

    // Click the restart button
    cy.get('button').contains('Take New Quiz').click();

    // Verify that a new question is shown again
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});