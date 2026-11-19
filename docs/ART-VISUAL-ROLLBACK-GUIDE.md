# Art Visual CMS & Studio Rollback Guide

This guide provides exact, zero-downtime rollback procedures for each independent implementation unit on branch `cms-studio-enhancement`.

---

## Rollback Principles
1. **Independent Reversibility:** Each unit is committed as an isolated commit. Any unit can be cleanly rolled back using `git revert <commit-hash> --no-edit` without breaking adjacent units.
2. **Data Safety:** None of the changes alter or delete documents or assets in Sanity Content Lake. Reverting code immediately restores prior Studio behavior without database migrations.
3. **Branch Isolation:** All changes reside on `cms-studio-enhancement`. The `master` branch remains clean and untouched.

---

## Commit Reference

| Unit | Commit Message | Commit Hash | Revert Command |
| :--- | :--- | :---: | :--- |
| **Unit 01** | `feat(cms): add professional dashboard` | `5cb47e5` | `git revert 5cb47e5 --no-edit` |
| **Unit 02** | `feat(media): improve asset management` | `bd0d2d5` | `git revert bd0d2d5 --no-edit` |
| **Unit 03** | `feat(editor): improve content editing experience` | `59a9115` | `git revert 59a9115 --no-edit` |
| **Unit 04** | `feat(health): add website content health checker` | `d16d753` | `git revert d16d753 --no-edit` |

---

## Unit 01 Rollback Procedure (`feat(cms): add professional dashboard`)

### 1. Execute Git Revert
```bash
git revert 5cb47e5 --no-edit
```

### 2. Selective File Rollback Alternative
```bash
git checkout 5cb47e5~1 -- src/sanity/structure.ts
rm -rf src/sanity/components/dashboard
```

### 3. Verification Steps
1. Run `npx tsc --noEmit` to verify type safety.
2. Visit `http://localhost:3000/studio` to confirm Desk Structure returns to direct page listing without the Dashboard node.

---

## Unit 02 Rollback Procedure (`feat(media): improve asset management`)

### 1. Execute Git Revert
```bash
git revert bd0d2d5 --no-edit
```

### 2. Verification Steps
1. Run `npx tsc --noEmit` to verify type safety.
2. Confirm `sanity-plugin-media` and video fields revert to standard file pickers.

---

## Unit 03 Rollback Procedure (`feat(editor): improve content editing experience`)

### 1. Execute Git Revert
```bash
git revert 59a9115 --no-edit
```

### 2. Selective File Rollback Alternative
```bash
git checkout 59a9115~1 -- src/sanity/plugins/versioning src/sanity/schemaTypes sanity.config.ts src/app/api/draft-mode
```

### 3. Verification Steps
1. Run `npx tsc --noEmit` to verify type safety.
2. Visit `http://localhost:3000/studio` to confirm editor toolbar and actions revert cleanly.

---

## Unit 04 Rollback Procedure (`feat(health): add website content health checker`)

### 1. Execute Git Revert
```bash
git revert d16d753 --no-edit
```

### 2. Selective File Rollback Alternative
```bash
git checkout d16d753~1 -- src/sanity/structure.ts src/sanity/components/dashboard/CmsDashboardView.tsx
rm -rf src/sanity/components/health
```

### 3. Verification Steps
1. Run `npx tsc --noEmit` to verify type safety.
2. Confirm Desk Structure removes the "Content Health Checker" item and dashboard health card reverts to non-linked summary.

---

## Full Assignment Emergency Rollback (Return to Master Baseline)
To discard all changes on `cms-studio-enhancement` and return to the original clean master state:
```bash
git checkout master
```
Or to reset `cms-studio-enhancement` to master:
```bash
git reset --hard master
```
