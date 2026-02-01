# Mo's IT Services Website

A modern, professional website for Mo's IT Services - a Managed Service Provider (MSP) offering enterprise-grade IT solutions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Features

- Responsive design (mobile, tablet, desktop)
- Smooth scroll navigation
- Animated sections with Framer Motion
- Modern glassmorphism UI effects
- Contact form with validation
- Mobile hamburger menu

## Sections

1. **Hero** - Bold headline with animated status dashboard
2. **Services** - 6 service cards (Managed IT, Cloud, Cybersecurity, Help Desk, Network, Backup)
3. **About** - Company story, stats, and trust badges
4. **Pricing** - 3-tier pricing (Essential, Professional, Enterprise)
5. **Testimonials** - Client reviews with ratings
6. **Contact** - Contact form and company information
7. **Footer** - Links, social media, contact details

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
Mo's IT Services/
├── app/
│   ├── globals.css      # Tailwind imports + custom styles
│   ├── layout.tsx       # Root layout with Navbar/Footer
│   └── page.tsx         # Home page with all sections
├── components/
│   ├── Navbar.tsx       # Sticky navigation
│   ├── Hero.tsx         # Hero section
│   ├── Services.tsx     # Services grid
│   ├── About.tsx        # About section
│   ├── Pricing.tsx      # Pricing tiers
│   ├── Testimonials.tsx # Client testimonials
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the color palette:

- `primary` - Main brand color (blue)
- `dark` - Background colors (navy/slate)

### Content

- Update company info in each component
- Modify services in `components/Services.tsx`
- Adjust pricing in `components/Pricing.tsx`
- Edit testimonials in `components/Testimonials.tsx`

## License

Private - All rights reserved.
