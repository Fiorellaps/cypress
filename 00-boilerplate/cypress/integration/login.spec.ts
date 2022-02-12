describe('Login specs', () => {
  it('visit the login page', () => {
    cy.visit('/');
  });

  it('should name input has the focus when it clicks on it', () => {
    //arrange

    // act
    cy.visit('/');
    cy.get('input[name="name"]').click();

    //assert
    cy.get('input[name="name"]').should('have.focus');
  });

  it('should name input has the focus when it clicks on it - with testing library', () => {
    //arrange

    // act
    cy.visit('/');
    cy.findByLabelText('Name').click();

    //assert
    cy.findByLabelText('Name').should('have.focus');
  });

  it('should show an alert with a message when type invalid credentials', () => {
    //arrange
    const user = 'admin';
    const password = '1234';
    // act
    cy.visit('/');
    cy.get('input[name="name"]').type(user);
    cy.get('input[name="password"]').type(password);

    //assert
    cy.get('input[name="name"]').should('have.value', user);
    cy.get('input[name="password"]').should('have.value', password);
  });

  it('should show an alert with a message when type invalid credentials with alias', () => {
    // Arrange
    const user = 'admin';
    const password = '1234';

    // Act
    cy.visit('/');
    // const userInput = cy.get('input[name="name"]');
    // const passwordInput = cy.get('input[name="password"]');
    // esto no funciona bien porque todos los metodos de cypress son con código asíncrono, popr lo qeu hay que usar alias
    cy.get('input[name="name"]').as('userInput');
    cy.get('input[name="password"]').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
  });

  it('should show an alert with a message when type invalid credentials with alias - with testing library', () => {
    // Arrange
    // Arrange
    const user = 'admin';
    const password = '1234';
    cy.on('window:alert', cy.stub().as('alertStub'));

    // Act
    cy.visit('/');
    cy.findByLabelText('Name').as('userInput');
    cy.findByLabelText('Password').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.get('@alertStub').should(
      'have.been.calledWith',
      'invalid credentials, use admin/test, excercise: display a mui snackbar instead of this alert.'
    );
  });

  it('should navigate to hotels url when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findByLabelText('Name').as('userInput');
    cy.findByLabelText('Password').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('eq', 'http://localhost:8080/#/hotel-collection');
  });
});
