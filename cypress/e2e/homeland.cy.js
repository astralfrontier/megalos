describe('Homeland', () => {
  it('Shows the homeland description', () => {
    cy.visit('/character')
    cy.contains('Homeland').click()
    cy.contains('ruled by a council of elder wizards').should('be.visible')
  })

  it('lets the user select another homeland', () => {
    cy.visit('/character')
    cy.contains('Homeland').click()
    cy.get('#homeland-name-select').select('The Old Empire')
    cy.contains('true superpowers of eld').should('be.visible')
  })

  it('lets the user select a homeland skill', () => {
    cy.visit('/character')
    cy.contains('Homeland').click()
    cy.get('#homeland-skill-checkbox-attune').click()
    cy.get('#homeland-skill-checkbox-attune').should('be.checked')
    cy.get('#skills-pane').contains('Attune').should('be.visible')
  })

  it('limits the user to two homeland skills', () => {
    cy.visit('/character')
    cy.contains('Homeland').click()
    cy.get('#homeland-skill-checkbox-attune').click()
    cy.get('#homeland-skill-checkbox-create').click()
    cy.get('#homeland-skill-checkbox-inspect').should('not.be.checked')
  })
})
