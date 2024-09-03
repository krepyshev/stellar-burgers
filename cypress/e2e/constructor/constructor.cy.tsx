/// <reference types="cypress" />

const selectors = {
  ingredientBun: '[data-cy="ingredient-bun"]',
  ingredient: '[data-cy="ingredient"]',
  constructorBun: '[data-cy="constructor-bun"]',
  constructorIngredient: '[data-cy="constructor-ingredient"]',
  orderButton: '[data-cy="order-button"]',
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  orderNumber: '[data-cy="order-number"]'
};

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
    cy.get(selectors.ingredientBun).first().contains('Добавить').click();
    cy.get(selectors.constructorBun).should('exist');
    cy.get(selectors.ingredient).first().contains('Добавить').click();
    cy.get(selectors.constructorIngredient).should('have.length', 1);
  });

  it('должно открыться и закрыться модальное окно с деталями ингредиента', () => {
    cy.get(selectors.ingredient).first().click();
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modalClose).click();
    cy.get(selectors.modal).should('not.exist');
  });

  it('должен создаться заказ, открыться и закрыться модальное окно с проверкой номера заказа, очиститься конструктор', () => {
    cy.intercept('POST', 'api/orders', {
      fixture: 'orders.json'
    }).as('createOrder');

    cy.get(selectors.ingredientBun).first().contains('Добавить').click();
    cy.get(selectors.ingredient).first().contains('Добавить').click();
    cy.get(selectors.orderButton).click();
    cy.wait('@createOrder');

    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.orderNumber).should('contain', '12345');
    cy.get(selectors.modalClose).click();

    cy.get(selectors.constructorIngredient).should('have.length', 0);
    cy.get(selectors.constructorBun).should('not.exist');
  });
});
