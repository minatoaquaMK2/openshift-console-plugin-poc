# Plan: Physical View Dashboard and Node Details

## Phase 1: Foundation & Data Model [checkpoint: e574c27]
- [x] Task: Define ManagedNode K8s Model & Types (fe5a9b5)
    - [x] Subtask: Write Tests for Model Definition (Ensure correct Group/Version/Kind)
    - [x] Subtask: Implement `ManagedNodeModel` and TypeScript interfaces for the CRD status/spec.
- [x] Task: Setup Plugin Routing (51eb0f8)
    - [x] Subtask: Write Tests for Route Configuration
    - [x] Subtask: Configure `console-extensions.json` to add the new navigation item "Physical View" pointing to the plugin.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Data Model' (Protocol in workflow.md)

## Phase 2: Overall Dashboard (List View)
- [x] Task: Implement Node List Data Fetching (8785483)
    - [x] Subtask: Write Tests for `useManagedNodes` hook (mocking `useK8sWatchResource`)
    - [x] Subtask: Create a custom hook `useManagedNodes` to wrap the K8s watch logic.
- [ ] Task: Implement Node List UI
    - [ ] Subtask: Write Tests for `NodeListComponent` (verify rendering of list items)
    - [ ] Subtask: Build the `NodeList` component using PatternFly's `Table` or `DataList`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Overall Dashboard (List View)' (Protocol in workflow.md)

## Phase 3: Physical View Components (Front & Back)
- [ ] Task: Implement Shared Physical Components
    - [ ] Subtask: Write Tests for `Slot`, `Port`, `Led` components (verify props to visual mapping)
    - [ ] Subtask: Create reusable UI components for individual hardware elements (Drive Slots, Ports, LEDs).
- [ ] Task: Implement Front View Layout
    - [ ] Subtask: Write Tests for `FrontView` (verify layout structure)
    - [ ] Subtask: Assemble the `FrontView` component using shared components to match `frontview.png`.
- [ ] Task: Implement Back View Layout
    - [ ] Subtask: Write Tests for `BackView` (verify layout structure)
    - [ ] Subtask: Assemble the `BackView` component using shared components to match `backview.png`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Physical View Components (Front & Back)' (Protocol in workflow.md)

## Phase 4: Integration & Detail Page
- [ ] Task: Implement Node Detail Page Container
    - [ ] Subtask: Write Tests for `NodeDetailPage` (verify tab switching and data passing)
    - [ ] Subtask: Create the `NodeDetailPage` to host the Front/Back views and handle routing parameters (node name).
- [ ] Task: Connect Detail Page to Live Data
    - [ ] Subtask: Write Tests for Detail Data Fetching (mock `useK8sWatchResource` for single item)
    - [ ] Subtask: Update `NodeDetailPage` to fetch the specific `ManagedNode` by name and pass data to views.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Integration & Detail Page' (Protocol in workflow.md)

## Phase 5: Polish & Accessibility
- [ ] Task: Add Tooltips and Accessibility Labels
    - [ ] Subtask: Write Tests for Accessibility (check for aria-labels)
    - [ ] Subtask: Add PatternFly `Tooltip` components to all physical elements and ensure ARIA compliance.
- [ ] Task: Final E2E Verification
    - [ ] Subtask: Write Cypress E2E Tests (Full flow: List -> Detail -> Tab Switch)
    - [ ] Subtask: Run and fix any issues found in E2E tests.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Polish & Accessibility' (Protocol in workflow.md)
