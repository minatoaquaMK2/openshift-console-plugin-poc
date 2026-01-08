describe('Plugin Routing Configuration', () => {
  it('should have the physical-view route in console-extensions.json', () => {
    cy.readFile('../console-extensions.json').then((extensions) => {
      const routes = extensions.filter(e => e.type === 'console.page/route');
      const physicalViewRoute = routes.find(r => r.properties.path === '/physical-view');
      expect(physicalViewRoute).to.exist;
    });
  });

  it('should have the physical-view navigation item in console-extensions.json', () => {
    cy.readFile('../console-extensions.json').then((extensions) => {
      const navItems = extensions.filter(e => e.type === 'console.navigation/href');
      const physicalViewNav = navItems.find(n => n.properties.id === 'physical-view');
      expect(physicalViewNav).to.exist;
    });
  });
});
