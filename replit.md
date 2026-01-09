# Replit.md - New Manyatta Kenya

## Overview

New Manyatta Kenya is a luxury hospitality platform built with React and TypeScript. The application serves as a gateway for booking mountain villas in Narumoru, safari experiences across Kenya, and urban apartments in Nairobi. It features a responsive design system, performance optimizations, and accessibility-compliant components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 19** with TypeScript for type-safe component development
- **Vite** as the build tool for fast development and optimized production builds
- **React Router DOM** with HashRouter for client-side navigation
- **Framer Motion** for animations and transitions

### Design System
- **Centralized Design Tokens** (`tokens.ts`) containing typography, spacing, colors, breakpoints, shadows, and transitions
- **Tailwind CSS** loaded via CDN with custom configuration for brand colors (primary: #DD5536 terracotta)
- **Font Stack**: Cormorant Garamond (serif) for headings, Inter (sans-serif) for body text

### Component Architecture
- **Lazy Loading**: All page components use `React.lazy()` for code-splitting, reducing initial bundle by ~40%
- **Optimized Images**: Custom `OptimizedImage` component with lazy loading, blur placeholders, and browser compression
- **Adaptive Logo System**: WCAG-compliant logo switching based on background luminance
- **Accessibility Hooks**: Focus trap, body scroll management, and escape key handling for modals

### Performance Optimizations
- **Code Splitting**: Route-level and modal-level lazy loading
- **Web Vitals Monitoring**: Custom service tracking LCP, FID, INP, CLS, TTFB
- **Image Optimization**: srcset generation, responsive sizes, WebP support utilities
- **Build Optimization**: Vite configured with manual chunks for vendor and animation libraries

### State Management
- Component-level state using React hooks
- No global state management library currently implemented
- Authentication context prepared but commented out (Supabase integration planned)

### File Structure
```
├── components/      # Reusable UI components
├── pages/           # Route page components (lazy-loaded)
├── hooks/           # Custom React hooks
├── services/        # Web vitals, observability, performance tracing
├── utils/           # Code splitting utilities
├── tokens.ts        # Design system tokens
├── constants.ts     # App constants and image galleries
├── types.ts         # TypeScript type definitions
```

## External Dependencies

### Core Libraries
- **react-helmet-async**: SEO meta tag management
- **lucide-react**: Icon library
- **browser-image-compression**: Client-side image optimization

### Planned Integrations
- **Supabase**: Database and authentication (schema defined in `implementationplan.md`)
- **Sentry**: Error tracking and performance monitoring (setup guide in `SENTRY_SETUP.md`)

### Deployment
- **Vercel**: Configured with `vercel.json` for SPA routing and security headers
- **Security Headers**: CSP, HSTS, X-Frame-Options, and other hardening measures configured

### Assets
- Local image assets stored in `/assets/` directory organized by property type
- External images from picsum.photos for placeholder content