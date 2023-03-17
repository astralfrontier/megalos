describe('Traits', () => {
  it('fills in traits when Random is clicked', () => {
    cy.visit('/character')
    cy.contains('Traits').click()
    cy.get('#trait-input-background').should('have.value', '')
    cy.get('#trait-input-mental').should('have.value', '')
    cy.get('#trait-input-physical').should('have.value', '')
    cy.get('#trait-input-special').should('have.value', '')
    cy.contains('Random').click()
    cy.get('#trait-input-background').should('not.have.value', '')
    cy.get('#trait-input-mental').should('not.have.value', '')
    cy.get('#trait-input-physical').should('not.have.value', '')
    cy.get('#trait-input-special').should('not.have.value', '')
  })

  it('randomizes background trait', () => {
    cy.visit('/character')
    cy.contains('Traits').click()
    cy.get('#trait-input-background').should('have.value', '')
    cy.get('#trait-randomize-background').click()
    cy.get('#trait-input-background').should('not.have.value', '')
  })

  it('randomizes mental trait', () => {
    cy.visit('/character')
    cy.contains('Traits').click()
    cy.get('#trait-input-mental').should('have.value', '')
    cy.get('#trait-randomize-mental').click()
    cy.get('#trait-input-mental').should('not.have.value', '')
  })

  it('randomizes physical trait', () => {
    cy.visit('/character')
    cy.contains('Traits').click()
    cy.get('#trait-input-physical').should('have.value', '')
    cy.get('#trait-randomize-physical').click()
    cy.get('#trait-input-physical').should('not.have.value', '')
  })

  it('randomizes special trait', () => {
    cy.visit('/character')
    cy.contains('Traits').click()
    cy.get('#trait-input-special').should('have.value', '')
    cy.get('#trait-randomize-special').click()
    cy.get('#trait-input-special').should('not.have.value', '')
  })
})
