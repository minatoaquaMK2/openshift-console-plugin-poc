# Product Guide - Physical View Plugin

## Initial Concept
a 我想做一个plugin，类似vxrail的physical view来显示example/dpc.dell.com_managednodes.yaml这个crd。我希望ui按照example/overall.png example/frontview.png example/backview.png这三张图来设计

## Product Vision
To provide a high-fidelity visual representation of physical node hardware within the OpenShift Console, enabling administrators to monitor and manage infrastructure with an intuitive "at-the-box" experience.

## Target Audience
- **Cluster Administrators:** For managing and monitoring hardware infrastructure health and layout.

## Key Features
- **Overall Node Dashboard:** A landing page displaying a high-level view of all managed nodes.
- **Node Physical View:**
    - **Front View:** Detailed visual representation of the front of a specific node, including slot occupancy and LED indicators.
    - **Back View:** A togglable tab from the Front View showing the rear components (ports, power supplies, etc.).
- **Hardware Health Monitoring:** Visual status indicators for physical components and hardware metrics (temperature, fan speed, power).
- **Real-time Data Sync:** Live updates of hardware status using Kubernetes resource watches.

## User Experience & Design
- **Navigation Flow:**
    1. **Overall Page:** The entry point showing a grid/list of all nodes.
    2. **Front View Page:** Triggered by clicking a node from the Overall page.
    3. **Back View Tab:** Accessible directly on the node detail page to switch perspective.
- **Design Inspiration:** Adheres to the visual layout and style defined in `example/overall.png`, `example/frontview.png`, and `example/backview.png`.
- **Integration:** Integrated seamlessly into the OpenShift Console navigation.

## Technical Goals
- **CRD Integration:** Primary data source is the `dpc.dell.com/v1` ManagedNode custom resource.
- **Live Updates:** Implement `useK8sWatchResource` for reactive UI updates based on CRD status changes.
