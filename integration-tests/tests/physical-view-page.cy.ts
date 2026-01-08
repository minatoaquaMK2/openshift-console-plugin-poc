describe('Physical View Page E2E Tests', () => {
  describe('Component Files Existence', () => {
    it('should have PhysicalViewPage component', () => {
      cy.readFile('../src/components/PhysicalViewPage.tsx').should('exist');
    });

    it('should have NodeList component', () => {
      cy.readFile('../src/components/NodeList.tsx').should('exist');
    });

    it('should have FrontView component', () => {
      cy.readFile('../src/components/physical-view/FrontView.tsx').should('exist');
    });

    it('should have BackView component', () => {
      cy.readFile('../src/components/physical-view/BackView.tsx').should('exist');
    });

    it('should have InfoPanel component', () => {
      cy.readFile('../src/components/physical-view/InfoPanel.tsx').should('exist');
    });

    it('should have Led component', () => {
      cy.readFile('../src/components/physical-view/Led.tsx').should('exist');
    });

    it('should have DriveSlot component', () => {
      cy.readFile('../src/components/physical-view/DriveSlot.tsx').should('exist');
    });
  });

  describe('Component Structure Verification', () => {
    it('PhysicalViewPage should import NodeList', () => {
      cy.readFile('../src/components/PhysicalViewPage.tsx').then((content) => {
        expect(content).to.include("import NodeList from './NodeList'");
      });
    });

    it('PhysicalViewPage should import FrontView and BackView', () => {
      cy.readFile('../src/components/PhysicalViewPage.tsx').then((content) => {
        expect(content).to.include('FrontView');
        expect(content).to.include('BackView');
        expect(content).to.include('InfoPanel');
      });
    });

    it('PhysicalViewPage should use useK8sWatchResource hook', () => {
      cy.readFile('../src/components/PhysicalViewPage.tsx').then((content) => {
        expect(content).to.include('useK8sWatchResource');
      });
    });

    it('NodeList should have cluster summary section', () => {
      cy.readFile('../src/components/NodeList.tsx').then((content) => {
        expect(content).to.include('ClusterSummary');
        expect(content).to.include('Cluster health');
        expect(content).to.include('Number of nodes');
      });
    });

    it('NodeList should have health status indicators', () => {
      cy.readFile('../src/components/NodeList.tsx').then((content) => {
        expect(content).to.include('HealthIcon');
        expect(content).to.include('CheckCircleIcon');
        expect(content).to.include('ExclamationCircleIcon');
      });
    });

    it('NodeList should have CPU and Memory usage columns', () => {
      cy.readFile('../src/components/NodeList.tsx').then((content) => {
        expect(content).to.include('CPU usage');
        expect(content).to.include('Memory usage');
        expect(content).to.include('Progress');
      });
    });
  });

  describe('Accessibility Verification', () => {
    it('FrontView should have aria-label attributes', () => {
      cy.readFile('../src/components/physical-view/FrontView.tsx').then((content) => {
        expect(content).to.include('aria-label');
        expect(content).to.include('role=');
      });
    });

    it('BackView should have aria-label attributes', () => {
      cy.readFile('../src/components/physical-view/BackView.tsx').then((content) => {
        expect(content).to.include('aria-label');
        expect(content).to.include('role=');
      });
    });

    it('DriveSlot should have Tooltip and aria-label', () => {
      cy.readFile('../src/components/physical-view/DriveSlot.tsx').then((content) => {
        expect(content).to.include('Tooltip');
        expect(content).to.include('aria-label');
      });
    });

    it('Led should have Tooltip and aria-label', () => {
      cy.readFile('../src/components/physical-view/Led.tsx').then((content) => {
        expect(content).to.include('Tooltip');
        expect(content).to.include('aria-label');
      });
    });
  });

  describe('Routing Configuration', () => {
    it('should have physical-view route configured', () => {
      cy.readFile('../console-extensions.json').then((extensions: any[]) => {
        const physicalViewRoute = extensions.find(
          (ext: any) => ext.type === 'console.page/route' && ext.properties.path === '/physical-view'
        );
        expect(physicalViewRoute).to.exist;
        expect(physicalViewRoute.properties.component.$codeRef).to.equal('PhysicalViewPage');
      });
    });

    it('should have physical-view/nodes/:name route configured', () => {
      cy.readFile('../console-extensions.json').then((extensions: any[]) => {
        const detailRoute = extensions.find(
          (ext: any) => ext.type === 'console.page/route' && ext.properties.path === '/physical-view/nodes/:name'
        );
        expect(detailRoute).to.exist;
        expect(detailRoute.properties.component.$codeRef).to.equal('PhysicalViewPage');
      });
    });

    it('should have physical-view navigation item', () => {
      cy.readFile('../console-extensions.json').then((extensions: any[]) => {
        const navItem = extensions.find(
          (ext: any) => ext.type === 'console.navigation/href' && ext.properties.id === 'physical-view'
        );
        expect(navItem).to.exist;
        expect(navItem.properties.href).to.equal('/physical-view');
      });
    });
  });

  describe('CSS Styles Verification', () => {
    it('should have physical-view.css styles', () => {
      cy.readFile('../src/components/physical-view/physical-view.css').then((content) => {
        expect(content).to.include('.pv-chassis');
        expect(content).to.include('.pv-back-panel');
        expect(content).to.include('.pv-back-fan');
        expect(content).to.include('.pv-back-psu');
      });
    });

    it('should have NodeList.css styles', () => {
      cy.readFile('../src/components/NodeList.css').then((content) => {
        expect(content).to.include('.pv-cluster-summary');
        expect(content).to.include('.pv-health-text');
        expect(content).to.include('.pv-usage-cell');
      });
    });
  });

  describe('Physical View UI', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/physical-view');
    });

    it('should render the Physical View page title', () => {
      cy.get('h1').contains('Physical View').should('be.visible');
    });

    it('should display the NodeList component', () => {
      cy.get('.pv-node-list-page').should('exist');
    });
  });
});
