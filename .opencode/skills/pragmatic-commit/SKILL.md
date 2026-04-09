---
name: pragmatic-commit
description: Analyzes git changes and proposes atomic commits using Conventional Commits. Stages files for each proposed commit and waits for approval before committing.
---

# Pragmatic Commit

Analyzes working directory changes and structures them into clean, atomic commits.

## Before Starting

Read the current project state to understand the task context:

```
Read: @docs/project/STATE.md
```

This helps align commits with the current development task.

## Workflow

### 1. Analyze Changes

Check the current git status:

```bash
git status
git diff --name-only
```

Identify:

- Modified, added, deleted, and renamed files
- Logical clusters of related changes
- Mixed responsibilities in the same file

### 2. Group by Intent

Categorize changes into Conventional Commits types:

| Type       | Use for                                             |
| ---------- | --------------------------------------------------- |
| `feat`     | New features                                        |
| `fix`      | Bug fixes                                           |
| `refactor` | Code changes that neither fix bugs nor add features |
| `docs`     | Documentation only                                  |
| `test`     | Adding or updating tests                            |
| `chore`    | Maintenance tasks (deps, config, build)             |
| `perf`     | Performance improvements                            |

### 3. Stage Files for Each Commit

For each proposed commit, **stage only the relevant files**:

```bash
git add path/to/file1.ts path/to/file2.ts
```

This allows the user to review exactly what will be committed.

### 4. Present Commit Plan

Show the proposed structure:

```
## Commit Plan

### 1. feat(api/auth): add refresh token rotation
**Files:** api/auth/service.ts, api/auth/routes.ts
**Rationale:** Complete refresh token security feature

Status: ⏳ Awaiting review
```

### 5. Wait for Approval

Ask the user to approve. Options:

- `y` / `yes` - Commit this group
- `n` / `no` - Skip this group (unstage files)
- `only <n>` - Skip all others, commit only this one (e.g., `only 3`, `only 5 and 7`, `only 2, 4 and 6`)
- `e` / `edit` - Edit the commit message
- `s` / `split` - Split into smaller commits
- `m` / `merge` - Merge with another group
- `a` / `abort` - Stop and unstage everything

When user uses `only`, stage and commit only the specified commit(s), then unstage everything else.

### 6. Execute Commits

Only after explicit approval, execute:

```bash
git commit -m "type(scope): description"
```

## Atomicity Rules

Each commit must:

- Represent one clear intention
- Be independently revertible
- Make sense when read months later

**Never mix:**

- Feature + refactor
- Refactor + bug fix
- Formatting + behavior changes
- Multiple unrelated features

If a file has mixed changes, suggest splitting before committing.

## Suspicious Patterns to Flag

Flag these for user attention:

- Formatting-only changes mixed with logic
- Debug code or commented-out code
- Unintended dependency changes
- Secret keys or credentials accidentally staged
- Large refactors hiding behavior changes

## Constraints

- Never auto-commit
- Never fabricate changes not in the diff
- Prefer fewer, well-structured commits over many trivial ones
- Always show the plan before executing

## Commit Message Format

### Scope Convention

The scope indicates where the change applies:

| Scope Pattern    | Meaning                            |
| ---------------- | ---------------------------------- |
| `feat(auth)`     | Feature affecting both API and Web |
| `feat(api/auth)` | Feature only in API                |
| `feat(web/auth)` | Feature only in Web                |
| `refactor(api)`  | Refactor only in API               |

### Message Format

```
<type>(<scope>): <description>

- <action 1>
- <action 2>
- <action 3>
```

**Note:** No footer. Body uses `-` prefix for each line.

### Examples

```
feat(api/auth): implement refresh token rotation

- Add token expiration validation
- Create refresh token repository
- Implement token rotation logic

feat(web/cart): redesign cart drawer component

- Migrate to new component architecture
- Add quantity controls
- Improve loading states
```

## Proposing the Body

When creating the body, think about:

- What important actions were taken?
- What decisions were made?
- What was changed that matters for future maintainers?

Keep it to 3-5 bullet points maximum. If more are needed, consider splitting the commit.
