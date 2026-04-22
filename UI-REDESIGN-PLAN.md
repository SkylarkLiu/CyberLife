# UI Redesign Plan

## Goal

Translate the pure ink-painting direction from `DESIGN.md` into a hybrid visual system that fits the current product:

- keep the premium dark product feel
- keep the rotating Bagua hero on the homepage
- introduce restrained Chinese ink aesthetics
- preserve readability and tool usability on Liuyao and Meihua pages

This is not a full switch to a light xuan-paper site. It is a **dark celestial + ink aesthetic fusion**.

## Core Principle

The current app already has strong product qualities:

- immersive dark atmosphere
- glassmorphism containers
- product-style top navigation
- reusable module shells
- animated homepage Bagua visual

The redesign should **elevate** those traits with ink-inspired texture, typography, and composition instead of replacing them with a museum-style or poster-style interface.

## Visual Direction

### Target Mood

- dark
- quiet
- scholarly
- celestial
- Eastern
- restrained
- premium

### Design Formula

`Current dark product shell + subtle ink atmosphere + selective calligraphy + structured editorial spacing`

## What Must Stay

- Homepage rotating Bagua background in [components/home/home-background-bagua.tsx](/Users/superskylark/myproject/life/components/home/home-background-bagua.tsx)
- Current product-grade usability for Liuyao and Meihua
- Shared layout architecture in [components/layout](/Users/superskylark/myproject/life/components/layout)
- Shared card system and shells in [components/ui](/Users/superskylark/myproject/life/components/ui) and [components/divination](/Users/superskylark/myproject/life/components/divination)
- Mobile-first responsiveness
- Reduced-motion support

## What Should Change

### 1. Theme Tokens

Replace the current purely sci-fi dark tokens with a hybrid ink palette.

#### Recommended base tokens

- `--background`: deep ink black, not pure blue-black
- `--background-soft`: dark warm charcoal
- `--color-panel`: layered dark ink wash
- `--color-panel-strong`: denser ink slab
- `--color-border`: softer, less neon, more mist-like
- `--color-accent`: muted gold
- `--color-accent-muted`: washed gold
- `--color-seal`: restrained cinnabar red
- `--color-ink-1` to `--color-ink-4`: for focal hierarchy

#### Texture layer

Introduce subtle:

- paper grain
- mist / ink bloom
- diffuse radial washes

These should live in `globals.css`, not per page.

### 2. Typography System

Use calligraphic type selectively.

#### Recommended role mapping

- Homepage hero title: calligraphic or semi-calligraphic display font
- Section titles: elegant serif / Songti style
- Body text: readable serif or sans-serif, not cursive
- Labels / pills / controls: modern UI font for clarity

#### Rule

Never use expressive calligraphy for:

- form labels
- button text
- input values
- dense result explanations

Use it only for:

- hero title
- module names
- editorial pull quotes
- subtle decorative headings

### 3. Surfaces

Current glass cards should evolve into **ink glass** rather than disappear.

#### Surface behavior

- retain soft blur where useful
- reduce overt iOS “frosted card” brightness
- add layered ink wash depth
- make card edges feel softer and calmer

#### Surface hierarchy

- Level 1: major panels, dense background
- Level 2: secondary cards, more transparent
- Level 3: inline blocks, nearly flat with faint borders

### 4. Header

Keep the current structure:

- brand left
- nav pill center
- actions right

But restyle it to feel more literary and atmospheric:

- darker, quieter top background
- nav pill like a lacquered ink capsule
- gentler highlight states
- more refined typography

Do not turn the header into a decorative antique banner.

### 5. Homepage

Keep the current composition:

- left information island
- right Bagua visual

Enhance it with:

- more white space
- stronger editorial hierarchy
- poetic pull-quote treatment
- subtle vertical text accents if used sparingly
- softer ink cloud overlays around the Bagua, never obscuring it

### 6. Module Pages

Liuyao and Meihua are tool pages, so usability comes first.

#### Keep

- clear inputs
- obvious result structure
- panel-based information grouping

#### Enhance

- page headers can become more editorial
- result cards can use more elegant titles and dividers
- chart areas can adopt “board” presentation with calmer ink framing

Do not make tool pages feel like static posters.

## Component-Level Translation

### Global

Files:

- [app/globals.css](/Users/superskylark/myproject/life/app/globals.css)

Tasks:

- redefine color tokens
- add subtle paper-grain and ink-wash layers
- create utility classes for:
  - `ink-panel`
  - `ink-title`
  - `seal-accent`
  - `mist-divider`
  - `paper-noise`

### Header

Files:

- [components/layout/SiteHeader.tsx](/Users/superskylark/myproject/life/components/layout/SiteHeader.tsx)
- [components/layout/HeaderBrand.tsx](/Users/superskylark/myproject/life/components/layout/HeaderBrand.tsx)
- [components/layout/HeaderNavPill.tsx](/Users/superskylark/myproject/life/components/layout/HeaderNavPill.tsx)
- [components/layout/HeaderActions.tsx](/Users/superskylark/myproject/life/components/layout/HeaderActions.tsx)

Tasks:

- restyle nav pill as the only luminous surface
- simplify brand typography
- add calmer hover states
- integrate seal-red or gold only as tiny accents

### Shared UI

Files:

- [components/ui/glass-panel.tsx](/Users/superskylark/myproject/life/components/ui/glass-panel.tsx)
- [components/ui/button.tsx](/Users/superskylark/myproject/life/components/ui/button.tsx)
- [components/ui/pill.tsx](/Users/superskylark/myproject/life/components/ui/pill.tsx)
- [components/divination/detail-card.tsx](/Users/superskylark/myproject/life/components/divination/detail-card.tsx)
- [components/divination/module-shell.tsx](/Users/superskylark/myproject/life/components/divination/module-shell.tsx)

Tasks:

- create a new surface style vocabulary
- reduce “generic glass card” look
- introduce more differentiated card hierarchy
- make buttons and pills less app-default and more editorial

### Homepage

Files:

- [components/home/home-hero.tsx](/Users/superskylark/myproject/life/components/home/home-hero.tsx)
- [components/home/home-background-bagua.tsx](/Users/superskylark/myproject/life/components/home/home-background-bagua.tsx)
- [app/page.tsx](/Users/superskylark/myproject/life/app/page.tsx)

Tasks:

- restyle hero title system
- add restrained ink atmosphere around the Bagua
- preserve Bagua legibility and motion
- keep content anchored left

### Liuyao

Files:

- [components/liuyao/liuyao-input-preview.tsx](/Users/superskylark/myproject/life/components/liuyao/liuyao-input-preview.tsx)
- [components/liuyao/hexagram-lines.tsx](/Users/superskylark/myproject/life/components/liuyao/hexagram-lines.tsx)
- [components/liuyao/liuyao-result-preview.tsx](/Users/superskylark/myproject/life/components/liuyao/liuyao-result-preview.tsx)

Tasks:

- retain form clarity
- refine section spacing
- convert result areas into more scholarly “board” presentation
- use calligraphic accents only in titles or separators

### Meihua

Files:

- [components/meihua/meihua-input-panel.tsx](/Users/superskylark/myproject/life/components/meihua/meihua-input-panel.tsx)
- [components/meihua/meihua-result-preview.tsx](/Users/superskylark/myproject/life/components/meihua/meihua-result-preview.tsx)

Tasks:

- formalize board presentation further
- make original / mutual / changed relationships clearer
- strengthen body/use presentation with refined typography and separators

## Implementation Phases

### Phase A — Foundation

Scope:

- `globals.css`
- shared tokens
- shared surfaces
- typography classes

Goal:

- establish the hybrid design system without touching every page yet

### Phase B — Header and Homepage

Scope:

- site header
- homepage hero
- homepage Bagua atmosphere

Goal:

- prove the new direction on the two most visible surfaces

### Phase C — Tool Page Translation

Scope:

- Liuyao input and result pages
- Meihua input and result pages

Goal:

- align core tools with the new visual language while preserving clarity

### Phase D — Content and Micro-Details

Scope:

- module placeholders
- glossary / notes pages in future
- loading states
- error states
- empty states

Goal:

- make the whole site feel coherent, not partially redesigned

## Non-Goals

- Do not convert the whole site to a light parchment background
- Do not replace all UI text with calligraphy
- Do not remove the homepage rotating Bagua
- Do not introduce heavy ornamental motifs that harm usability
- Do not make interactive tools feel like static artwork

## Success Criteria

The redesign is successful if:

- the site still feels like a modern product
- the homepage Bagua remains the main visual anchor
- the visual language feels more Chinese and more poetic
- Liuyao and Meihua remain easy to use
- the redesign looks intentional across all pages, not just decorative in isolated spots

## Recommended Next Step

Start with **Phase A + Phase B only**:

1. redefine global tokens
2. restyle shared surfaces
3. restyle header
4. restyle homepage hero while keeping the rotating Bagua intact

Only after that should Liuyao and Meihua be translated page by page.
