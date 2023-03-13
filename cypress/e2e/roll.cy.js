describe('Dice Roller', () => {
  it('rolls dice', () => {
    cy.visit('/')
    cy.get("#dice-roll").click()
  })
})