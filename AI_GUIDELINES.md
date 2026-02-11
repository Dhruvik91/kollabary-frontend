# 🧠 AI Development Guidelines – Enterprise Next.js Platform

These rules MUST be followed for all AI-generated code.  
**No exceptions.**

---

## 1️⃣ Core Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Data Fetching:** React Query (@tanstack/react-query)
- **Forms:** React Hook Form
- **Validation:** Zod
- **Toast System:** Sonner
- **Date Handling:** date-fns
- **Motion Library:** Framer Motion
- **Architecture:** Smart / Dumb Component Pattern

---

## 2️⃣ Architecture Pattern

### Smart Components (Container)

Handle:
- React Query calls
- Mutations
- Form submission logic
- Data transformation

Rules:
- No heavy UI markup
- Located in:
  - `/features/*`
  - Route-level containers

---

### Dumb Components (Presentational)

- Pure UI
- No API calls
- No business logic
- Fully typed props
- Reusable & composable
- Located in:
  - `/components/ui`
  - `/components/shared`

⚠ Never mix UI with business logic.

---

## 3️⃣ React Query Rules (MANDATORY)

- NEVER fetch inside `useEffect`
- Always use `useQuery` / `useMutation` / `useInfiniteQuery`
- Stable query keys required
- Handle loading, error, and empty states
- Use optimistic updates when appropriate
- Invalidate queries correctly
- Configure `staleTime` intentionally
- All queries must live inside reusable hooks:
  - `/hooks/queries`

---

## 4️⃣ Forms Standard (React Hook Form + Zod)

### Form Rules

- ALWAYS use React Hook Form
- NEVER manage complex forms with `useState`
- Use `zodResolver`
- Infer types from schema
- Disable submit during submission
- Display accessible error messages

### Validation Rules

- Schemas live in: `/lib/validations`
- Never duplicate validation logic
- Use `refine()` when necessary
- Schemas must be reusable

---

## 5️⃣ Toast Rules (Sonner)

- Use Sonner for:
  - Success
  - Error
  - Warning
- Never use `alert()`
- Never expose backend stack traces
- Toasts must be short & user-friendly
- Trigger inside mutation lifecycle

---

## 6️⃣ Date Handling (date-fns)

- NEVER use native Date formatting
- NEVER use moment.js
- Always use date-fns
- All utilities in: `/lib/date.ts`
- Parse ISO via `parseISO()`
- Use `format()`, `differenceIn*`, `isBefore()`, `isAfter()`
- Never show raw ISO strings
- Always format for readability
- Support locale-aware formatting

---

## 7️⃣ shadcn/ui Standards

- Use shadcn components only
- Extend via `className`
- Never edit core files
- Maintain built-in accessibility
- Use consistent variant patterns

---

## 8️⃣ Responsiveness

- Mobile-first
- No fixed layouts
- No horizontal overflow
- Flexible grid & flex
- 8px spacing system
- Works 320px → 2xl

---

## 9️⃣ Accessibility (NON-NEGOTIABLE)

- Semantic HTML required
- Proper ARIA labels
- `aria-invalid` for forms
- Keyboard accessible
- Visible focus states
- WCAG AA contrast
- Reduced motion support
- Never rely only on color

Accessibility overrides aesthetics.

---

## 🔟 SEO (App Router)

- Use `generateMetadata()`
- Include:
  - title
  - description
  - openGraph
  - twitter
- One H1 per page
- Proper heading hierarchy
- Structured data (JSON-LD)
- Canonical URLs
- Optimize images (Next/Image)

---

## 1️⃣1️⃣ GEO (AI Discoverability)

- Structured headings
- Intent-driven content
- Short summaries
- FAQ sections when relevant
- Machine-readable formatting
- Avoid vague language

---

## 1️⃣2️⃣ Dark & Light Theme

- Class-based theming
- Persist preference in localStorage
- Follow system preference by default
- No hardcoded colors
- Token-based theming
- Full accessibility in both modes

---

## 1️⃣3️⃣ Glassmorphism

- backdrop-blur
- Semi-transparent backgrounds
- Subtle borders
- Maintain readability
- Use sparingly

---

## 1️⃣4️⃣ Neumorphism

- Soft shadows
- Subtle elevation
- Minimal usage
- Must not reduce contrast

---

## 1️⃣5️⃣ CSS Performance & Smooth UX

### Scrolling
- `scroll-behavior: smooth`
- Avoid scroll jank
- Use IntersectionObserver over scroll listeners
- Passive event listeners

### Animation Rules
Only animate:
- `transform`
- `opacity`

Never animate layout properties.

### GPU Optimization
- Use `translate3d()` / `translateZ(0)`
- Avoid layout thrashing
- Use `will-change` sparingly
- Remove `will-change` when not needed

### Reduced Motion
- Respect `prefers-reduced-motion`
- Disable parallax & heavy motion

🎯 Target: 60fps.

---

## 1️⃣6️⃣ Motion Design System (Framer Motion)

- Use single motion library
- Centralize variants in `/lib/motion.ts`
- Never hardcode animation values
- Define `initial` / `animate` / `exit` / `transition`

### Duration
- 150–300ms (micro)
- 250–400ms (page)
- Never exceed 500ms

---

## 1️⃣7️⃣ Page Transition Architecture

- Use `AnimatePresence` correctly
- Wrap in `layout.tsx`
- Avoid layout remounting
- Use subtle fade + translateY
- No blocking transitions
- Preserve scroll when appropriate
- Use skeleton loaders instead of spinners

---

## 1️⃣8️⃣ Animation Token System

Centralize in:  
`/styles/animation-tokens.ts`

Tokens:
- duration-fast
- duration-base
- duration-slow
- ease-standard
- ease-accelerate
- ease-decelerate

Never hardcode duration/easing.

---

## 1️⃣9️⃣ Performance Budgeting

### JS
- Minimal initial bundle
- Code split aggressively
- Avoid heavy libraries

### CSS
- Minimal global CSS
- Avoid unused utilities

### Images
- Use WebP/AVIF
- Compress assets
- Lazy load non-critical images

### Targets
- Lighthouse ≥ 90
- Minimal CLS
- No long tasks > 200ms

---

## 2️⃣0️⃣ Real User Monitoring (RUM)

Track:
- LCP
- CLS
- INP/FID
- TTFB
- Route transition time
- API latency
- JS runtime errors

- Monitor regressions
- Log slow endpoints
- Track performance by device/network

Performance must be measured continuously.

---

## 2️⃣1️⃣ Design Token System

All styling must use tokens.

### Color Tokens
- primary
- secondary
- accent
- success
- warning
- error
- muted
- background
- foreground
- border

Never hardcode hex values.

### Spacing Scale (8px grid)
- space-1 → space-16

### Typography Scale
- text-xs → text-5xl
- font-regular → font-bold

### Radius Tokens
- radius-sm → radius-2xl

### Shadow Tokens
- shadow-xs → shadow-xl

---

## 2️⃣2️⃣ RBAC UI Rendering Rules

- Never render unauthorized UI
- Centralized permissions in `/lib/permissions.ts`
- Use `useHasPermission()` / `useHasRole()`
- Protect routes at layout level
- Do not fetch restricted data
- Frontend RBAC complements backend validation

---

## 2️⃣3️⃣ Security-First Standards

### XSS Prevention
- No dangerous HTML without sanitization
- Escape dynamic content

### Sensitive Data
- Never expose tokens
- Prefer HTTP-only cookies
- Do not store secrets in localStorage

### API Security
- Centralized API client
- Handle 401 properly
- Logout on invalid session

### Error Handling
- No stack traces to users
- Friendly error mapping

### Headers
- CSP
- HSTS
- X-Frame-Options
- X-Content-Type-Options

---

## 2️⃣4️⃣ Testing Architecture

### Unit Testing
- Vitest/Jest + React Testing Library
- Test hooks, utilities, schemas, permissions

### Integration Testing
- Test form flows
- Test mutations
- Test RBAC rendering

### E2E Testing
- Playwright
- Test auth flows
- Test protected routes
- Test critical journeys
- Test page transitions

### Visual Regression
- Playwright snapshots or Chromatic
- Validate dark/light mode

Avoid fake coverage.

---

## 🚫 Strictly Forbidden

- Mixing UI & business logic
- Native Date formatting
- Hardcoded colors
- Animating layout properties
- Overusing `will-change`
- Exposing backend errors
- Ignoring accessibility
- Ignoring performance regressions

---

## 🏁 Final Engineering Standard

The platform must feel:

- Fluid
- Fast
- Secure
- Accessible
- Scalable
- Maintainable
- Premium
- Intentional

If it feels janky, insecure, inconsistent, or unstructured — refactor it.
