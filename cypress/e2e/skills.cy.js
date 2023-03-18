describe('Skills', () => {
  it('displays the help for a skill', () => {
    cy.visit('/character')
    cy.contains('Skills').click()
    cy.get('#skill-name-select').select('Hunt')
    cy.contains('killing critters for food').should('be.visible')
  })

  it('increments a skill', () => {
    cy.visit('/character')
    cy.contains('Skills').click()
    cy.get('#skill-name-select').select('Hunt')
    cy.get('#skill-plus-button').click()
    cy.get('#skill-pane-hunt').should('have.data', 'rank', 2)
    cy.get('#skill-pane-hunt').should('have.data', 'effectiveRank', 2)
  })

  xit('decrements a skill', () => {
    cy.visit('/character')
    cy.contains('Skills').click()
    cy.get('#skill-name-select').select('Hunt')
    cy.get('#skill-plus-button').click()
    cy.get('#skill-plus-button').click()
    cy.get('#skill-pane-hunt').should('have.data', 'rank', 3)
    cy.get('#skill-minus-button').click()
    cy.get('#skill-pane-hunt').should('have.data', 'rank', 2)
  })
})
