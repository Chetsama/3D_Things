# 3D Things - Platform Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Simplicity and Clarity
Prefer straightforward, readable code over premature abstraction

### II. Payload CMS as System of Record
Treat Payload CMS as the primary backend and data store

### III. Server-Side Business Logic
All pricing, variants, and order validation must execute server-side only

### IV. Statelessness
Frontend components must be stateless and trust no client-provided pricing information

### V. TypeScript Everywhere
Enforce type safety across all codebases

### VI. Extensibility First
Design for easy extension of features like variants, made-to-order options, and automation workflows

### VII. Vendor Neutrality
Minimize vendor lock-in where technically feasible

### VIII. Explicit Schemas
Favor explicit data definitions and validation over implicit behavior

### IX. Production Readiness
Ensure all components are production-grade rather than demo-ready

## Technical Architecture

### Backend
- Primary backend: Payload CMS
- All business logic executed server-side only
- Strict API boundaries with no client-side manipulation of critical values (pricing, inventory)

### Frontend
- Stateless architecture
- No reliance on client-provided pricing or validation data
- Type-safe components using TypeScript
- Server-rendered where possible for performance and SEO

## Implementation Guidelines

1. **Data Flow**: Data should flow from Payload CMS → server-side processing → frontend presentation
2. **Validation Strategy**: Use explicit schema definitions with comprehensive validation at all boundaries
3. **Extensibility Points**:
   - Variants: Support multiple product configurations (size, color, material)
   - Made-to-Order: Enable custom specifications for individual orders
   - Automation: Build extensible workflow systems for order processing

## Compliance and Standards

1. All code must follow established TypeScript standards and practices
2. No vendor-specific dependencies unless absolutely necessary
3. Every feature must be production-ready with appropriate error handling and logging
4. Documentation should reflect operational realities, not hypothetical scenarios

## Development Workflow

- TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced
- Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas
- All PRs/reviews must verify compliance with these principles
- Complexity must be justified and documented

## Governance
Constitution supersedes all other practices; Amendments require documentation, approval, migration plan

All PRs/reviews must verify compliance; Complexity must be justified; Use .specify/memory/constitution.md for runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2025-12-30 | **Last Amended**: 2025-12-30
