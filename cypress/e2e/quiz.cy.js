

describe('<Quiz />', () => {
  beforeEach(() => {
    cy.visit("/")
  })

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
