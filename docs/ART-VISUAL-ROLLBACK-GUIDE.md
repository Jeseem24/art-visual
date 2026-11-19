# Art Visual CMS & Studio Rollback Guide

This guide provides exact, zero-downtime rollback procedures for each independent implementation unit on branch `cms-studio-enhancement`.

---

## Rollback Principles
1. **Independent Reversibility:** Each unit is committed as an isolated commit. Any unit can be cleanly rolled back using `git revert <commit-hash> --no-edit` without breaking adjacent units.
2. **Data Safety:** None of the changes alter or delete documents or assets in Sanity Content Lake. Reverting code immediately restores prior Studio behavior without database migrations.
3. **Branch Isolation:** All changes reside on `cms-studio-enhancement`. The `master` branch remains clean and untouched.

---

## Unit 01 Rollback Procedure (`feat(cms): add professional dashboard`)

### 1. Execute Git Revert
```bash
git revert <UNIT_01_COMMIT_HASH> --no-edit
```

### 2. Selective File Rollback Alternative
If you wish to revert only Unit 01 without a git commit:
```bash
git checkout HEAD~1 -- src/sanity/structure.ts
rm -rf src/sanity/components/dashboard
```

### 3. Verification Steps
1. Run `npx tsc --noEmit` to verify type safety.
2. Visit `http://localhost:3000/studio` to confirm Desk Structure returns to direct page listing without the Dashboard node.

---

## Unit 02 Rollback Procedure (`feat(media): improve asset management`)
*(Will be documented upon Unit 02 completion)*

---

## Unit 03 Rollback Procedure (`feat(editor): improve content editing experience`)
*(Will be documented upon Unit 03 completion)*

---

## Unit 04 Rollback Procedure (`feat(health): add website content health checker`)
*(Will be documented upon Unit 04 completion)*

---

## Full Assignment Emergency Rollback (Return to Master Baseline)
To discard all changes on `cms-studio-enhancement` and return to the original clean master state:
```bash
git checkout master
git branch -D cms-studio-enhancement
```
