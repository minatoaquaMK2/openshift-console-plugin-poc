# Specification: Physical View Dashboard and Node Details

## 1. Overview
This track focuses on implementing the core functionality of the Physical View Plugin. It involves creating a dashboard to list all managed nodes and a detailed view that replicates the physical appearance of the hardware (front and back) based on the `ManagedNode` CRD.

## 2. User Stories
- As a Cluster Administrator, I want to see an overview of all managed physical nodes so that I can quickly assess their status.
- As a Cluster Administrator, I want to click on a specific node to view its detailed physical layout (front and back).
- As a Cluster Administrator, I want to see real-time status updates (health, power, temperature) on the physical view to identify issues immediately.
- As a Cluster Administrator, I want the UI to be accessible and consistent with the OpenShift Console look and feel.

## 3. Functional Requirements
### 3.1 Data Source & Integration
- **CRD:** `dpc.dell.com/v1` `ManagedNode`.
- **Fetching:** Use `useK8sWatchResource` to fetch and watch `ManagedNode` resources.
- **Model Definition:** Define the K8s model for `ManagedNode` in the plugin code.

### 3.2 Overall Dashboard (List View)
- Display a list/grid of all available `ManagedNode` resources.
- Columns/Cards should show: Node Name, Status (Healthy/Warning/Critical), Model, and basic metrics (if available in summary).
- Clicking a node navigates to the Node Detail View.

### 3.3 Node Detail View
- **Header:** Node name, status, and breadcrumbs navigation.
- **Tabs:** "Front View" (Default) and "Back View".
- **Front View:**
    - Render a visual representation of the node's front panel (slots, drives, LEDs).
    - Map CRD status fields to visual indicators (Green/Yellow/Red).
- **Back View:**
    - Render a visual representation of the node's rear panel (PSUs, fans, ports).
    - Map CRD status fields to visual indicators.
- **Responsiveness:** The views must scale or scroll appropriately on smaller screens.

## 4. Non-Functional Requirements
- **Performance:** UI updates should reflect CRD changes within seconds.
- **Accessibility:** All visual elements must have tooltips and appropriate ARIA labels.
- **Styling:** Use PatternFly components for layout and status icons.

## 5. UI/UX Design
- **Overall:** Clean, standard PatternFly table or card grid.
- **Physical Views:** High-fidelity CSS/SVG or responsive HTML representations matching the provided reference images (`frontview.png`, `backview.png`), styled with PatternFly colors.

## 6. Testing Strategy
- **Unit Tests:** Jest/React Testing Library for individual components (NodeList, PhysicalView, StatusIcon).
- **Integration Tests:** Cypress tests to verify:
    - Navigation from List to Detail.
    - Tab switching between Front and Back views.
    - Rendering of status based on mocked CRD data.
