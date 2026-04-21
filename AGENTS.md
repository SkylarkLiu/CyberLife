# AGENTS.md

## Project
Build a Chinese traditional divination website with a premium dark iOS-like celestial aesthetic.

## Product Goals
The site includes these modules:
- Bagua
- Da Liu Ren
- Liuyao
- Ziwei Doushu
- Meihua Yishu

## Implementation Strategy
- Do NOT implement all five systems at once.
- First build the full website skeleton.
- First fully ship Liuyao as the MVP module.
- Second implement Meihua Yishu.
- Keep Bagua, Da Liu Ren, and Ziwei Doushu as placeholder modules first.
- Separate UI, engine, and interpretation layers.
- Keep all module outputs under a unified schema.

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS

## UI Style
- Minimal
- Dark
- Calm
- Celestial / starry
- iOS-inspired
- Glassmorphism cards
- Soft border and shadow
- Mobile-first
- No gaudy traditional fortune-telling visuals

## Code Rules
- Use functional React components.
- Keep files focused and small.
- Do not put calculation logic inside page components.
- Put engines under `engines/`.
- Put schemas under `schemas/`.
- Put interpretation content under `content/interpretations/`.
- Reuse components whenever possible.
- Keep all API responses typed.

## Commands
- Install dependencies
- Run dev server
- Run lint
- Run typecheck
- Run build

## Done Criteria
A task is only done when:
1. The code runs
2. Types pass
3. Lint passes
4. The UI matches the visual direction
5. The feature is wired end-to-end if the phase requires it

## Planning Rule
For any task involving:
- multi-file changes
- architectural changes
- new module implementation
- engine design
- shared schema updates

use `PLANS.md` as the execution source of truth and update progress there.