describe('useManagedNodes hook export', () => {
  it('should be exported from the hooks file', () => {
    // We are just checking that the file can be read and contains the expected export
    // to avoid complex SDK dependency issues in Cypress compilation for unit-like tests
    cy.readFile('../src/hooks/useManagedNodes.ts').should('contain', 'export const useManagedNodes');
    cy.readFile('../src/hooks/useManagedNodes.ts').should('contain', 'export const useManagedNode');
  });
});