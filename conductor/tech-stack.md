# Technology Stack - Physical View Plugin

## Core Technologies
- **Language:** TypeScript (v4.7+) - For type-safe development and improved developer experience.
- **Frontend Library:** React (v17.0.1) - The primary framework for building the user interface.
- **UI Framework:** PatternFly (v6) - The standard design system for OpenShift and Red Hat projects, providing accessible and consistent components.

## Integration & Data Fetching
- **Build System:** Webpack (v5) - Utilizing Module Federation to dynamically load the plugin into the OpenShift Console at runtime.
- **API Interaction:** OpenShift Dynamic Plugin SDK - Used for interacting with the Kubernetes API.
    - `useK8sWatchResource`: For real-time monitoring and reactive UI updates based on `ManagedNode` CRD status changes.
- **Communication Protocol:** Kubernetes API (HTTPS/REST) for CRD data retrieval.

## Development & Quality Assurance
- **Runtime Environment:** Node.js (v18+) and Yarn.
- **Code Quality:**
    - ESLint: For static code analysis and identifying patterns.
    - Prettier: For consistent code formatting.
    - Stylelint: For CSS linting and ensuring dark mode compatibility.
- **Testing:**
    - Cypress: For end-to-end integration testing within the console environment.

## Deployment
- **Packaging:** Docker/Podman - To containerize the plugin for deployment.
- **Orchestration:** Helm - For managing the plugin's lifecycle and deployment on OpenShift clusters.
