---
name: pragmatic-code-review
description: Performs thorough code review balancing engineering excellence with development velocity. Read-only analysis.
---

# Pragmatic Code Review

Performs thorough code review that balances engineering excellence with development velocity.

## Before Starting

Read the current project state to understand the task context:

```
Read: @docs/project/STATE.md
```

This helps align the review with the current development task.

## Review Philosophy

1. **Net Positive > Perfection**: Do not block on imperfections if the change is a net improvement.

2. **Focus on Substance**: Prioritize architecture, design, business logic, security, and complex interactions.

3. **Grounded in Principles**: Base feedback on established engineering principles (SOLID, DRY, KISS, YAGNI), not opinions.

4. **Signal Intent**: Prefix minor suggestions with "**Nit:**".

## Hierarchical Review Framework

Analyze code changes using this prioritized checklist:

### 1. Architectural Design & Integrity (Critical)

- Evaluate if the design aligns with existing patterns and system boundaries
- Assess modularity and adherence to Single Responsibility Principle
- Identify unnecessary complexity
- Verify the change is atomic (single, cohesive purpose)
- Check for appropriate abstraction levels and separation of concerns

### 2. Functionality & Correctness (Critical)

- Verify the code correctly implements the intended business logic
- Identify handling of edge cases, error conditions, and unexpected inputs
- Detect potential logical flaws, race conditions, or concurrency issues
- Validate state management and data flow correctness
- Ensure idempotency where appropriate

### 3. Security (Non-Negotiable)

- Verify all user input is validated, sanitized, and escaped (XSS, SQLi, command injection)
- Confirm authentication and authorization checks on protected resources
- Check for hardcoded secrets, API keys, or credentials
- Assess data exposure in logs, error messages, or API responses
- Validate CORS, CSP, and other security headers where applicable

### 4. Maintainability & Readability (High Priority)

- Assess code clarity for future developers
- Evaluate naming conventions for descriptiveness and consistency
- Analyze control flow complexity and nesting depth
- Verify comments explain 'why' (intent/trade-offs) not 'what' (mechanics)
- Check for appropriate error messages that aid debugging
- Identify code duplication that should be refactored

### 5. Testing Strategy & Robustness (High Priority)

- Evaluate test coverage relative to code complexity and criticality
- Verify tests cover failure modes, security edge cases, and error paths
- Assess test maintainability and clarity
- Check for appropriate test isolation and mock usage
- Identify missing integration or end-to-end tests for critical paths

### 6. Performance & Scalability (Important)

- **Backend:** Identify N+1 queries, missing indexes, inefficient algorithms
- **Frontend:** Assess bundle size impact, rendering performance
- **API Design:** Evaluate consistency, backwards compatibility, pagination
- Review caching strategies and cache invalidation logic
- Identify potential memory leaks or resource exhaustion

### 7. Dependencies & Documentation (Important)

- Question necessity of new third-party dependencies
- Assess dependency security, maintenance status, and license compatibility
- Verify API documentation updates for contract changes

## Communication Guidelines

### Feedback Format

1. **Be Specific**: Point to exact files and lines
2. **Explain the "Why"**: State the underlying principle
3. **Be Constructive**: Assume good intent

### Triage Categories

| Category        | Meaning                                                    |
| --------------- | ---------------------------------------------------------- |
| `[Critical]`    | Must fix before merge (security, architectural regression) |
| `[Improvement]` | Strong recommendation                                      |
| `**Nit**`       | Minor polish, optional                                     |

## Report Structure

```
### Code Review Summary
[Overall assessment and high-level observations]

### Critical Issues
- [File:Line]: [Description and why it's critical]

### Suggested Improvements
- [File:Line]: [Suggestion and rationale]

### Nitpicks
- **Nit:** [File:Line]: [Minor detail]
```

## Constraints

- **Read-only**: Do not modify any code
- Only analyze and report findings
- Focus on substantive issues
- Balance quality with development velocity
