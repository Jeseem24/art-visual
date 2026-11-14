<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Development Standard

Authoritative coding and architecture guideline: `docs/DEVELOPMENT_GUIDELINES.md`.
Documentation Hub & Sitemap: `docs/README.md`.
- System Architecture: `docs/ARCHITECTURE.md`
- Figma Canvas & Node ID Registry: `docs/FIGMA_MAPPING.md`
- Styling, Spacing & Responsive Design: `docs/STYLE_AND_SPACING.md`
- Sanity CMS Schemas & Data Contracts: `docs/SANITY_CMS_SCHEMA.md`
- AI Agent Operational Rules & Playbook: `docs/AI_AGENT_PLAYBOOK.md`

All future code and architectural implementations must strictly follow `docs/DEVELOPMENT_GUIDELINES.md` as the authoritative standard for:
1. Decision Order & Source of Truth (Owner/Lead > BRD > Figma > Development Guidelines).
2. Clean Code & Separation of Concerns (Presentation, Page Composition, Data Access, Types, Styles).
3. Component Architecture & Reusability (UI primitives, Shared layout, Feature components, Page sections).
4. Styling Standards (CSS Modules, Design tokens, Zero unexplained magic numbers, No inline styles).
5. Figma-to-Code Workflow (Desktop-first review, exact dimensions, spacing, typography, tokens).
6. Data-Driven Development (Sanity CMS integration, zero unwanted hardcoded business content).
7. Definition of Done & Required Task Summaries.

