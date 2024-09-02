/// <reference types="cypress" />

describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/auth/token', {
      fixture: 'token.json'
    }).as('refreshToken');

    cy.fixture('token.json').then((token) => {
      cy.setCookie('accessToken', token.accessToken);
      cy.setCookie('refreshToken', token.refreshToken);
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должна добавиться булка и ингредиент в конструктор', () => {
    cy.get('[data-cy="ingredient-bun"]').first().contains('Добавить').click();
    cy.get('[data-cy="constructor-bun"]').should('exist');
    cy.get('[data-cy="ingredient"]').first().contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredient"]').should('have.length', 1);
  });

  it('должно открыться и закрыться модальное окно с деталями ингредиента', () => {
    cy.get('[data-cy="ingredient"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должен создаваться заказ', () => {
    cy.intercept('POST', 'api/orders', {
      fixture: 'orders.json'
    }).as('createOrder');

    cy.get('[data-cy="ingredient-bun"]').first().contains('Добавить').click();
    cy.get('[data-cy="ingredient"]').first().contains('Добавить').click();
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');
    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="constructor-ingredient"]').should('have.length', 0);
    cy.get('[data-cy="constructor-bun"]').should('not.exist');
  });
});
