describe('NodeList component', () => {
  it('should exist in the components directory', () => {
    cy.readFile('../src/components/NodeList.tsx').should('exist');
  });
});
