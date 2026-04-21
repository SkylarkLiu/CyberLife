# PLANS.md

# Project Plan: Chinese Traditional Divination Website MVP

## Latest Progress
- Removed the legacy global side drawer from the shared layout
- Cleared header menu triggers and layout left-offset residue
- Kept the site-wide header as the single primary navigation surface
- Refactored the global header into a background-integrated layout with only the center nav using a glass pill
- Fixed the home-page nav bug where the notes item highlighted without the `#site-notes` hash

## Goal
Build a premium minimalist divination website with the following modules:
- Bagua
- Da Liu Ren
- Liuyao
- Ziwei Doushu
- Meihua Yishu

The first shippable MVP must:
1. Have a complete website skeleton
2. Have a polished homepage and module navigation
3. Fully implement Liuyao end-to-end
4. Provide placeholder architecture for the other modules
5. Keep the codebase extensible for later engines

---

## Phase 0 — Initialize Project

### Tasks
- Create a Next.js + TypeScript + Tailwind CSS project
- Set up base folder structure
- Configure global styles
- Enable dark theme by default
- Add utility aliases if needed
- Add lint and typecheck scripts

### Deliverables
- Project boots successfully
- Base layout works
- Main routes are reachable

### Acceptance Criteria
- `npm run dev` works
- `npm run build` succeeds
- `npm run lint` succeeds
- `npm run typecheck` succeeds

### Files Expected
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/`
- `engines/`
- `schemas/`
- `content/`

---

## Phase 1 — Establish Design System

### Tasks
- Create global design tokens
- Implement dark celestial background system
- Build glass card styles
- Define spacing, radius, typography, and motion rules
- Create reusable UI primitives

### Deliverables
- Reusable visual system
- Consistent cards, buttons, input fields, and containers

### Acceptance Criteria
- Home page and module pages share one visual language
- UI feels premium, minimal, dark, calm, and iOS-inspired
- Mobile-first layout works well

### Files Expected
- `components/ui/*`
- `lib/theme/*`
- global CSS theme tokens

---

## Phase 2 — Build Homepage and Navigation

### Tasks
- Create homepage hero section
- Create 5 module entry cards
- Add concise intro text
- Add disclaimer section
- Add navigation to each module page

### Deliverables
- Homepage with polished visual identity
- Working navigation to:
  - `/bagua`
  - `/daliuren`
  - `/liuyao`
  - `/ziwei`
  - `/meihua`

### Acceptance Criteria
- Users can enter each module from the homepage
- Layout is polished on mobile and desktop
- All 5 routes exist

### Files Expected
- `app/page.tsx`
- `app/bagua/page.tsx`
- `app/daliuren/page.tsx`
- `app/liuyao/page.tsx`
- `app/ziwei/page.tsx`
- `app/meihua/page.tsx`

---

## Phase 3 — Define Unified Schemas

### Tasks
- Define base divination result schema
- Define per-module extension schemas
- Define shared API response typing
- Define shared interpretation structure

### Deliverables
- Stable TypeScript schema system for all modules

### Acceptance Criteria
- All modules can return typed responses under one common format
- Frontend can render result pages without relying on hardcoded module internals

### Files Expected
- `schemas/divination.ts`
- `schemas/liuyao.ts`
- `schemas/meihua.ts`
- `schemas/bagua.ts`
- `schemas/ziwei.ts`
- `schemas/daliuren.ts`

### Example Shape
- `module`
- `title`
- `summary`
- `input`
- `chart`
- `interpretation`
- `disclaimer`

---

## Phase 4 — Build Liuyao MVP with Mock Data

### Tasks
- Create Liuyao input page
- Add form validation
- Create API route using mock data
- Create Liuyao result page
- Render:
  - original hexagram
  - changed hexagram
  - line list
  - world/response positions
  - six relations
  - overview interpretation
  - detail interpretation

### Deliverables
- Full Liuyao user flow using mock data

### Acceptance Criteria
- User can submit the Liuyao form
- API returns typed mock result
- Result page renders end-to-end
- UI is production-like even before real engine logic

### Files Expected
- `app/liuyao/page.tsx`
- `app/api/divination/liuyao/route.ts`
- Liuyao form and result components

---

## Phase 5 — Implement Liuyao Engine v1

### Tasks
- Build Liuyao engine under `engines/liuyao/`
- Accept six lines as structured input
- Support yin / yang line states
- Support moving line states
- Generate original hexagram
- Generate changed hexagram
- Map hexagram names
- Output structured chart data

### Deliverables
- Real Liuyao engine replacing mock chart generation

### Acceptance Criteria
- Engine is not embedded inside UI
- Input -> engine -> typed result flow works
- Result output structure remains stable

### Files Expected
- `engines/liuyao/*`

---

## Phase 6 — Implement Liuyao Interpretation v1

### Tasks
- Separate interpretation from engine logic
- Create overview and detail generation layer
- Keep language concise, modern, calm, and non-theatrical
- Make interpretation system configurable

### Deliverables
- Structured interpretation output for Liuyao

### Acceptance Criteria
- Interpretation is generated outside page components
- Overview and detailed sections both exist
- Text tone is modern and restrained

### Files Expected
- `content/interpretations/liuyao/*`
- interpretation helpers

---

## Phase 7 — Extract Shared Components

### Tasks
- Extract shared page shell
- Extract shared result cards
- Extract shared explanation blocks
- Extract shared form layout
- Extract loading / empty / placeholder states
- Extract shared API utility functions

### Deliverables
- Reusable module framework

### Acceptance Criteria
- Meihua can reuse the same base architecture with minimal duplication

### Files Expected
- `components/divination/*`
- `lib/utils/*`

---

## Phase 8 — Implement Meihua Yishu Module

### Tasks
- Create Meihua input page
- Support time-based and number-based input
- Create engine v1
- Create result page
- Create interpretation layer
- Reuse shared architecture

### Deliverables
- Second real module working end-to-end

### Acceptance Criteria
- Meihua has typed input, engine, API response, and result page
- Shared components are reused rather than duplicated

### Files Expected
- `app/meihua/page.tsx`
- `app/api/divination/meihua/route.ts`
- `engines/meihua/*`

---

## Phase 9 — Add Placeholder Architecture for Remaining Modules

### Tasks
- Add placeholder input pages
- Add placeholder result shells
- Add API route placeholders
- Add schema placeholders
- Add engine placeholders

### Modules
- Bagua
- Da Liu Ren
- Ziwei Doushu

### Deliverables
- Whole site architecture visible and ready for incremental implementation

### Acceptance Criteria
- Routes exist
- UI is consistent
- Code structure is ready for future engines

---

## Phase 10 — Add Local History and Favorites

### Tasks
- Store recent readings in localStorage
- Add favorites
- Add recent history entry point on homepage
- Define migration-friendly storage shape

### Deliverables
- Product feels stateful and reusable

### Acceptance Criteria
- Users can revisit recent results
- Favorite state persists locally

---

## Phase 11 — Add Content Layer

### Tasks
- Add glossary
- Add module introductions
- Add usage notes
- Add FAQ
- Add disclaimer pages
- Store content in standalone files

### Deliverables
- Site becomes both a tool and a content product

### Acceptance Criteria
- Content is not hardcoded all over the UI
- Users can understand each system before using it

---

## Phase 12 — Product Polish and Optimization

### Tasks
- Optimize performance
- Add loading skeletons
- Improve error states
- Improve empty states
- Improve mobile interactions
- Add metadata and SEO basics
- Keep visual consistency

### Deliverables
- Refined MVP ready for deployment

### Acceptance Criteria
- Build passes
- Key pages are polished
- Mobile UX is smooth
- No major style regressions

---

## Work Rules for Codex

### When implementing each phase
1. Read the existing codebase first
2. Minimize unnecessary file creation
3. Prefer small coherent commits / patches
4. Keep naming consistent
5. Preserve unified schema integrity
6. Do not over-engineer early phases
7. Prioritize a runnable result over speculative architecture

### After each phase
Report:
- files created
- files modified
- what is working
- what remains next

---

## Active Execution Log

### Current Task
- Implement only the homepage for the current phase
- Build the initial runnable Next.js + TypeScript + Tailwind skeleton if missing
- Create a responsive split-layout hero:
  - left: five module entry cards
  - right: reusable Bagua visual component
- Keep other modules as navigation targets / placeholders only
- Do not implement divination engines yet

### Homepage Phase Scope
- Phase 0: initialize the codebase so the app can run
- Phase 1: establish the minimal design system needed for the homepage
- Phase 2: implement the homepage hero and module navigation shell

### Implementation Notes
- Refactor `bagua.html` into reusable React/Next.js components instead of copying the standalone page
- Restrict the Bagua visual to the homepage right-side hero area
- Support mobile layout and `prefers-reduced-motion`
- Keep UI, future engines, schemas, and content layers structurally separable

### Progress
- [x] Read repository instructions and reference assets
- [x] Initialize project skeleton and homepage implementation
- [x] Verify with `npm run lint`
- [x] Verify with `npm run typecheck`
- [x] Verify with `npm run build`

### Next Active Task
- Extract the first batch of shared UI primitives beyond the homepage
- Define unified divination schemas and per-module schema placeholders
- Build the Liuyao MVP page shell with typed mock data
- Keep Liuyao logic mock-based for now; do not implement the real engine yet

### Current Progress Update
- [x] Extracted the first batch of shared UI primitives
- [x] Added unified divination schemas and per-module schema placeholders
- [x] Built the Liuyao MVP page shell with typed mock data
- [x] Verified the current state with `npm run lint`
- [x] Verified the current state with `npm run typecheck`
- [x] Verified the current state with `npm run build`

### Layout Refactor Task
- Rebuild the global shell around a fixed top bar instead of homepage-only info cards
- Convert the homepage Bagua visual from a right-side card into a background layer
- Replace the homepage module grid with a reusable left-edge drawer navigation
- Preserve the same top bar and drawer navigation on inner pages
- Keep the refactor focused on layout and navigation only

### Layout Refactor Progress
- [x] Added a fixed global top bar
- [x] Added a reusable left-edge drawer navigation
- [x] Rebuilt the homepage around a background Bagua visual and centered hero content
- [x] Applied the same navigation shell to inner pages
- [x] Verified with `npm run lint`
- [x] Verified with `npm run typecheck`
- [x] Verified with `npm run build`

### Liuyao Engine Task
- Build `engines/liuyao/` v1 for chart derivation
- Move original hexagram, changed hexagram, and moving-line generation out of mock constants
- Keep interpretation text mocked for now, but make chart data engine-driven

### Liuyao Engine Progress
- [x] Added `engines/liuyao/` v1 structure
- [x] Moved original hexagram, changed hexagram, and moving-line generation into engine output
- [x] Rewired mock reading content to consume engine-derived chart data
- [x] Verified with `npm run lint`
- [x] Verified with `npm run typecheck`
- [x] Verified with `npm run build`

### Liuyao API Progress
- [x] Added `app/api/divination/liuyao/route.ts`
- [x] Switched the Liuyao page from local mock reading constants to typed mock API loading
- [x] Expanded engine output to cover palace, self/response positions, najia branches, and six relations

### Liuyao Production Refactor Progress
- [x] Refactored `app/liuyao/page.tsx` — production title "六爻起卦", removed dev descriptions
- [x] Added `LiuyaoLineInput`, `LiuyaoInputMode`, `LiuyaoLineLabel` to `schemas/liuyao.ts`
- [x] Updated `LiuyaoInput` schema to include `mode` and `lines` fields
- [x] Refactored `app/api/divination/liuyao/route.ts` — POST handler with real engine computation
- [x] Refactored `components/liuyao/liuyao-page-content.tsx` — two-column layout + result section, removed all dev content
- [x] Refactored `components/liuyao/liuyao-input-preview.tsx` — manual/generated mode, 6-step line input, progress bar
- [x] Refactored `components/liuyao/hexagram-lines.tsx` — real-time preview, render order 6→1 (line 1 at bottom)
- [x] Refactored `components/liuyao/liuyao-result-preview.tsx` — only shows after successful divination, no duplicate structure
- [x] Fixed `engines/liuyao/mock.ts` to match updated schema
- [x] Verified with `npm run lint`
- [x] Verified with `npm run typecheck`
- [x] Verified with `npm run build`
