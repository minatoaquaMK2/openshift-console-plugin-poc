# Product Guidelines - Physical View Plugin

## Design Principles
- **PatternFly Consistency:** The plugin must strictly adhere to PatternFly (OpenShift's design system) components and styling to ensure a seamless integration with the host console.
- **Visual Accuracy vs. UI Consistency:** While the physical views (`frontview`, `backview`) should be recognizable as the hardware shown in reference images, they must be rendered using PatternFly-compliant colors and status indicators.

## Visual Identity & Status
- **Standardized Status Communication:** Use standard PatternFly status icons and colors:
    - `Success` (Green/check-circle) for healthy components.
    - `Warning` (Yellow/exclamation-triangle) for degraded components.
    - `Danger` (Red/exclamation-circle) for failed components.
- **Interactive Elements:** Components within the front/back view should provide tooltips or popovers when interacted with to reveal specific hardware IDs or metrics.

## User Interface & Interaction
- **Navigation Flow:** Keep navigation consistent with OpenShift's drill-down patterns. The "Overall" view acts as the primary list/dashboard, leading to specific node details.
- **In-Context Alerts:** Hardware warnings or failures must be displayed prominently using Inline Alerts on the relevant node pages.

## Accessibility & Responsiveness
- **Inclusive Design:** High priority on accessibility. All status information must be reachable via keyboard and clearly interpreted by screen readers. Ensure high contrast and appropriate ARIA labels for physical component representations.
- **Adaptive Layout:** Use responsive containers for physical hardware views. On smaller screens, the view should be contained within a scrollable area to maintain the aspect ratio and readability of the hardware components.

## Prose & Messaging
- **Technical Clarity:** Use precise hardware terminology (e.g., "PSU 1", "SFP+ Port 4", "DIMM Slot A1").
- **Conciseness:** Keep component labels and status messages brief and actionable.
