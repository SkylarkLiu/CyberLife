# CyberLife

CyberLife is a premium dark Chinese divination web app built with Next.js, TypeScript, and Tailwind CSS. The product direction is calm, celestial, mobile-friendly, and iOS-inspired, with a shared architecture for UI, engines, schemas, and interpretation content.

## Current Scope

- Global product-style site header and navigation
- Immersive homepage with celestial background visuals
- Liuyao as the current MVP module
- Placeholder routes for:
  - Meihua Yishu
  - Bagua
  - Da Liu Ren
  - Ziwei Doushu

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Ant Design
- element-china-area-data

## Project Structure

```text
app/                       App Router pages and API routes
components/                Shared UI, layout, and module components
engines/                   Divination engine logic
schemas/                   Typed shared schemas
content/interpretations/   Structured interpretation content
```

## Liuyao MVP

The Liuyao module currently includes:

- Typed API flow via `/api/divination/liuyao`
- Manual mode and generated mode input flow
- Structured six-line chart generation
- Original hexagram and changed hexagram output
- Moving lines, palace, six relations, six gods, and related chart fields
- Location selection with China cascader data

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Routes

- `/` Homepage
- `/liuyao` Liuyao MVP
- `/meihua` Meihua placeholder
- `/bagua` Bagua placeholder
- `/daliuren` Da Liu Ren placeholder
- `/ziwei` Ziwei Doushu placeholder

## Design Direction

- Minimal
- Dark
- Calm
- Celestial / starry
- iOS-inspired
- Glassmorphism used selectively, not excessively
- Mobile-first and reduced-motion aware

## Status

This repository is currently in the skeleton + Liuyao MVP phase. The near-term roadmap is:

1. Continue polishing Liuyao interaction and chart presentation
2. Expand Liuyao engine rules and interpretation depth
3. Implement Meihua Yishu as the second real module
4. Keep other modules as typed placeholders until their engines are introduced
