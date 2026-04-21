# Homepage Execution Plan

## Goal
Implement the homepage of the divination website with this structure:

- Left side: card-based entry area
- Right side: animated rotating Bagua formation
- Overall style: minimalist, celestial, dark, iOS-inspired, premium

The right-side Bagua animation should be inspired by the uploaded reference file `bagua.html`.

---

## Core Homepage Layout

### Layout Requirements
- Desktop:
  - left column: entry cards and intro content
  - right column: animated Bagua visual centerpiece
- Mobile:
  - Bagua visual moves above or below the card area
  - preserve readability and performance
- Use a responsive two-column layout
- Keep large spacing and a calm visual rhythm

### Acceptance Criteria
- Homepage has a clear left-right split on desktop
- Homepage remains elegant on small screens
- The right-side Bagua area does not feel crowded or oversized
- Left-side cards remain the primary navigation focus

---

## Left Column Requirements

### Content Blocks
1. Brand / site title
2. Short subtitle
3. Brief intro text
4. Card-based entry section
5. Optional disclaimer / note

### Entry Cards
Create 5 feature cards:
- 八卦
- 大六壬
- 六爻
- 紫微斗数
- 梅花易数

Each card should include:
- title
- short description
- enter button or click action
- hover state
- premium glass-like style

### Visual Rules
- glassmorphism cards
- soft border
- large radius
- restrained shadow
- subtle hover motion
- no gaudy traditional fortune-telling visual language

### Acceptance Criteria
- All 5 cards are clickable
- Cards look consistent and premium
- Card hierarchy is clear
- Text is readable on dark background

---

## Right Column Bagua Visual Requirements

### Reference Source
Use `bagua.html` as the visual and motion reference.

### Visual Features to Preserve from Reference
- dark cosmic background feeling
- golden Bagua ring system
- central Taiji / Taichi symbol
- rotating Bagua arrangement
- subtle particles / stars
- soft radial glow
- elegant ring decorations
- restrained animation pacing

### Features to Adapt
- The original reference is fullscreen canvas.
- Convert it into a homepage-side visual module.
- It must fit inside the right column instead of occupying the entire viewport.
- It should feel like a hero visual, not a standalone landing page.

### Interaction Rules
- default state: slow continuous rotation
- hover over trigram: highlight the corresponding trigram
- optional: show small label or tooltip
- click: optional ripple or glow effect
- interaction must remain subtle and premium

### Performance Rules
- animation must be smooth
- avoid excessive CPU usage
- use requestAnimationFrame
- reduce particle count on small screens
- respect prefers-reduced-motion

### Acceptance Criteria
- Bagua animation renders correctly inside right-side hero area
- It does not break layout flow
- Motion is smooth and elegant
- Interaction feedback is subtle
- Performance is acceptable on common mobile and desktop devices

---

## Architectural Requirements

### Implementation Strategy
- Do not copy the original HTML file directly into the page as-is
- Extract the Bagua animation into a reusable component
- Separate rendering logic from page layout
- Keep the homepage clean and maintainable

### Suggested File Structure
- `app/page.tsx`
- `components/home/HomeHero.tsx`
- `components/home/EntryCards.tsx`
- `components/home/BaguaHero.tsx`
- `components/home/BaguaCanvas.tsx`
- `lib/theme/homepage.ts`
- `lib/animations/bagua.ts`

### Acceptance Criteria
- homepage layout code is separated from animation code
- Bagua animation logic is isolated in its own component/module
- components are reusable and readable

---

## Styling Requirements

### Global Direction
- premium dark UI
- starry / celestial atmosphere
- iOS-inspired minimalism
- calm and spacious
- gold accents only as subtle highlights

### Background
- dark blue-black gradient
- optional soft ambient radial glow
- subtle stars, not noisy
- background must not compete with the cards

### Typography
- clean modern Chinese typography
- title should feel premium and restrained
- avoid overly ornate traditional decorative font in core UI
- if decorative script is used, use it only sparingly

### Acceptance Criteria
- Homepage feels premium, calm, and modern
- Visual hierarchy is obvious
- Animation and cards feel like one unified design

---

## Responsive Behavior

### Desktop
- two-column layout
- left content aligned for reading and navigation
- right animation centered visually

### Tablet
- maintain two columns if space allows
- reduce Bagua size if needed

### Mobile
- stack layout vertically
- Bagua visual should not dominate the screen
- cards remain easy to tap
- particle density and ring complexity may be reduced

### Acceptance Criteria
- no overflow issues
- no unreadable text
- no broken animation container
- no unusable card layout

---

## Motion Rules

### Motion Language
- slow rotation
- soft fade-ins
- subtle hover lift for cards
- restrained glow and ripple effects
- no aggressive motion

### Accessibility
- support `prefers-reduced-motion`
- reduce or disable animation intensity when requested

### Acceptance Criteria
- motion improves polish without distraction
- reduced-motion mode remains functional and visually coherent

---

## Content Requirements for Homepage

### Title Direction
Use a modern and premium tone, not a superstitious or theatrical tone.

### Suggested Content Blocks
- site name
- one-line introduction
- short paragraph describing the five systems
- note: for cultural exploration / reference / entertainment only

### Acceptance Criteria
- copywriting is concise
- tone is modern and restrained
- homepage is understandable at a glance

---

## Implementation Phases

### Phase H1 — Homepage Layout Shell
Tasks:
- build two-column hero layout
- add left content area
- add right visual container
- add responsive behavior

Done when:
- homepage structure is complete
- desktop and mobile layout both work

### Phase H2 — Entry Card Section
Tasks:
- build 5 module cards
- add hover states
- add route links
- style cards in premium glass style

Done when:
- all module cards work
- visual consistency is achieved

### Phase H3 — Bagua Visual Refactor
Tasks:
- analyze `bagua.html`
- extract relevant visual rules
- rebuild as React/Next-compatible component
- scope animation to right-side container

Done when:
- Bagua animation runs inside the homepage hero
- layout remains stable

### Phase H4 — Interaction and Polish
Tasks:
- add subtle hover highlight
- add optional trigram labels or tooltip
- add click ripple/glow effect if elegant
- optimize animation performance
- add reduced motion support

Done when:
- animation feels polished
- performance is acceptable
- interactions remain restrained

### Phase H5 — Final Homepage Polish
Tasks:
- tune spacing
- tune sizes
- tune typography
- improve background blending
- ensure cards and Bagua feel unified

Done when:
- homepage looks production-ready

---

## Constraints

- Do not make the homepage look like a traditional flashy fortune-telling website
- Do not use excessive gold decoration
- Do not let the Bagua animation overpower navigation
- Do not leave animation logic embedded inline in `page.tsx`
- Do not sacrifice mobile usability for visual complexity

---

## Final Output Requirements
After implementation, report:
1. files created
2. files modified
3. homepage layout decisions
4. animation decisions adapted from `bagua.html`
5. responsive behavior summary
6. remaining improvements if any