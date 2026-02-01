# CLAUDE.md - Project Guide for Claude Code

This file provides context for Claude Code when working on this project.

## Working Guidelines

- **Ask questions** if you're confused or if instructions are unclear. It's better to clarify than to assume.

## Project Overview

This is a Next.js 14 website for Mo's IT Services, a Managed Service Provider (MSP). The site is a single-page application with smooth scroll navigation between sections.

## Tech Stack

- **Next.js 14** with App Router (`/app` directory)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, includes Navbar and Footer |
| `app/page.tsx` | Main page, imports all section components |
| `app/globals.css` | Global styles, Tailwind directives, custom utilities |
| `tailwind.config.ts` | Tailwind configuration with custom colors |
| `components/*.tsx` | Individual section components |

## Component Structure

Each section is a self-contained component in `/components`:

- `Navbar.tsx` - Sticky header with mobile menu (uses useState for menu toggle)
- `Hero.tsx` - Landing section with CTA buttons
- `Services.tsx` - Grid of 6 service offerings
- `About.tsx` - Company info with stats
- `Pricing.tsx` - 3-tier pricing cards
- `Testimonials.tsx` - Client reviews
- `Contact.tsx` - Form with local state management
- `Footer.tsx` - Site footer with links

## Styling Conventions

### Custom Tailwind Classes (defined in globals.css)

- `.gradient-text` - Blue-to-cyan gradient text
- `.glass` - Glassmorphism effect (blur + semi-transparent)
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.section-padding` - Consistent section vertical padding
- `.container-width` - Max-width container with padding

### Color Palette

- Primary: Blue (`primary-500: #3b82f6`)
- Accent: Cyan (`cyan-500: #06b6d4`)
- Background: Dark navy (`dark-900: #0f172a`)

## Common Tasks

### Adding a new section

1. Create component in `/components/NewSection.tsx`
2. Import and add to `app/page.tsx`
3. Add navigation link in `Navbar.tsx` if needed

### Modifying services

Edit the `services` array in `components/Services.tsx`

### Updating pricing

Edit the `plans` array in `components/Pricing.tsx`

### Changing company information

- Company name: Search for "Mo's IT Services" across components
- Contact info: Update in `Footer.tsx` and `Contact.tsx`
- Social links: Update in `Footer.tsx`

## Development Commands

```bash
npm run dev    # Start dev server (http://localhost:3000)
npm run build  # Production build
npm run start  # Run production build
npm run lint   # Run ESLint
```

## Notes

- All components use `'use client'` directive for client-side interactivity
- Framer Motion animations use `whileInView` for scroll-triggered effects
- Contact form has simulated submission (no backend connected)
- Navigation uses anchor links (`#services`, `#about`, etc.)
