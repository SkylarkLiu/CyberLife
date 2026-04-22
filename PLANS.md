# PLANS.md

# Project Plan: Chinese Traditional Divination Website MVP

## Latest Progress
- Deepened the Meihua interpretation layer with formal judgment tiers, timing/advice/caution language, and a dedicated result hierarchy
- Improved the Meihua time method to prefer lunar-calendar counting context through Chinese-calendar month/day/hour data
- Started executing the hybrid redesign phases from `UI-REDESIGN-PLAN.md`
- Completed the first warm-ink token pass across global CSS, shared cards, pills, buttons, and section headings
- Rethemed the site header and homepage into the dark celestial + ink hybrid style while preserving the rotating Bagua background
- Began translating Liuyao and Meihua workspaces into the new ink-tooling surface system
- Removed the legacy global side drawer from the shared layout
- Cleared header menu triggers and layout left-offset residue
- Kept the site-wide header as the single primary navigation surface
- Refactored the global header into a background-integrated layout with only the center nav using a glass pill
- Fixed the home-page nav bug where the notes item highlighted without the `#site-notes` hash
- Shipped the Liuyao MVP input, preview, POST API flow, and engine-backed chart generation
- Added structured Liuyao interpretation content generation outside the API route
- Started Phase 8 by adding the first Meihua engine and API skeleton
- Added the first Meihua interpretation layer under `content/interpretations/meihua/`
- Expanded the Meihua engine from placeholder trigram selection to a simplified structured rule set with original / mutual / changed hexagrams
- Upgraded the Meihua result board to clearly present original / mutual / changed hexagrams and body-use relations
- Improved the Meihua time method toward traditional counting by using year-branch, month, day, and hour numbers
- Added a dedicated hybrid UI redesign execution plan in `UI-REDESIGN-PLAN.md`

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

### Progress Update
- Core token layer and shared surfaces are now partially migrated to the hybrid ink palette
- Shared primitives still need final polish across loading, empty, and error states

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

### Progress Update
- Homepage and global navigation are complete and working
- A redesign pass is in progress to align the homepage and header with `UI-REDESIGN-PLAN.md`

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

### Progress Update
- Liuyao interpretation v1 is shipped and wired through the API flow
- Current redesign work is focused on presentation polish rather than interpretation completeness

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

### Progress Update
- Shared shells, cards, and result sections are in place
- Additional hybrid-theme cleanup is still needed for state patterns and a few legacy cold-tone surfaces

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
- Complete Liuyao Phase 6 by refining the interpretation layer and separating it from API / engine logic
- Continue hardening Liuyao output quality and result presentation
- Move into Phase 8 with the Meihua Yishu input page, API flow, engine v1, and result shell
- Reuse the shared architecture already established by Liuyao

### Current Progress Update
- [x] Extracted the first batch of shared UI primitives
- [x] Added unified divination schemas and per-module schema placeholders
- [x] Built the Liuyao MVP page shell with typed mock data
- [x] Replaced mock chart assembly with the Liuyao engine v1
- [x] Connected the Liuyao page to the typed POST API flow
- [x] Refactored the global header and homepage navigation into the current site-wide product shell
- [x] Began Phase 6 by moving Liuyao interpretation generation into `content/interpretations/liuyao/`
- [x] Began Phase 8 by adding the first Meihua API and engine skeleton
- [x] Built the first interactive Meihua input page with time-based and number-based form modes
- [x] Added the first Meihua result preview page flow on top of the typed API response
- [x] Added a dedicated Meihua interpretation layer outside the route
- [x] Expanded the Meihua engine to output original, mutual, changed, moving-line, and body/use structure
- [x] Refined the Meihua result page into a more formal board presentation
- [x] Verified the current state with `npm run lint`
- [x] Verified the current state with `npm run typecheck`
- [ ] Refine Meihua rule accuracy further with richer traditional derivation and interpretation rules
- [ ] Expand Liuyao interpretation depth beyond the current v1 heuristic layer
- [ ] Execute the hybrid dark-celestial + ink redesign foundation in phases without removing the homepage Bagua hero
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
