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

### Component Naming

- Use Pascal Case for component names and file names 

### Component Props

- Use camelCase for prop names
- Use Pascal Case for prop types

### Component Events

- Use camelCase for event names
- Use Pascal Case for event handlers

### Component State

- Use camelCase for state names
- Use Pascal Case for state types

### Constants and Types

- Make sure to use the constant file for API_CONFIG for the backend points and FRONTEND_ROUTES for the frontend routes
- Make sure to use the http-service file for the http methods for the usage of api calls
- Make sure to use the types file for the types of the data
- Make sure to use the services for the business logic

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

## 2️⃣5️⃣ Application State Handling Standards (MANDATORY)

Every data-driven view MUST explicitly handle the following states:

- Loading
- Error
- Empty
- Not Found
- Unauthorized

No screen may silently fail or render incomplete UI.

---

### 🟡 Loading State Rules

- Always show a loading state when data is fetching
- Prefer skeleton loaders over spinners
- Maintain layout consistency during loading
- Prevent layout shift (CLS-safe)
- Disable interactive elements while loading
- Do not block the entire page unless necessary

Use:

- Route-level `loading.tsx` when appropriate
- Component-level skeletons for partial loading

❌ Never render blank screens  
❌ Never render undefined data  

---

### 🔴 Error State Rules

All errors must be handled gracefully.

Rules:
- Never expose stack traces
- Never show raw backend error messages
- Map technical errors to user-friendly messages
- Provide retry mechanism when applicable
- Log errors for monitoring

Must handle:
- Network errors
- 4xx errors
- 5xx errors
- Mutation failures

Use:
- React Query `isError`
- Error boundaries where appropriate

---

### 📭 Empty State Rules

If data exists but contains no results:

- Show a clear empty state UI
- Provide explanation
- Provide CTA if applicable (Create, Add, Refresh)
- Maintain visual hierarchy

Empty state must:
- Be intentional
- Not feel broken
- Not look like loading

---

### 🔍 Not Found State (404)

If resource does not exist:

- Use Next.js `not-found.tsx`
- Provide helpful message
- Offer navigation back
- Maintain brand consistency

Never:
- Show blank screen
- Redirect silently without explanation

---

### 🚫 Unauthorized State (401 / 403)

If user lacks permission:

- Do not render restricted content
- Redirect to login (401) when session invalid
- Show access denied page (403) when insufficient permission
- Provide clear explanation

Create:
- `/app/unauthorized/page.tsx` (or equivalent)

Never:
- Hide UI visually but allow interaction
- Fetch restricted data
- Rely only on frontend checks

Frontend RBAC must complement backend validation.

---

## 2️⃣6️⃣ Next.js App Router File Conventions

Follow proper App Router structure strictly.

---

### Required Route-Level Files

Each major route may include:

- `page.tsx` → Main UI
- `layout.tsx` → Shared layout wrapper
- `loading.tsx` → Route-level loading UI
- `error.tsx` → Route-level error boundary
- `not-found.tsx` → Route-specific 404
- `template.tsx` (only if necessary)
- `default.tsx` (parallel routes only if required)

---

### 🔄 loading.tsx Rules

- Must show skeleton UI
- Must prevent layout shift
- Must match final layout structure
- Must not contain heavy logic

---

### ❗ error.tsx Rules

- Must be client component
- Must accept error and reset props
- Provide retry mechanism
- Log error silently (RUM compatible)
- Must not expose sensitive info

---

### 🔎 not-found.tsx Rules

- Provide contextual message
- Offer navigation options
- Maintain accessibility

---

### 🧩 layout.tsx Rules

- Used for:
  - Shared wrappers
  - Providers
  - Motion wrappers
  - RBAC guards
- Avoid heavy business logic
- Avoid unnecessary client conversion

---

## 2️⃣7️⃣ Global Error Handling Architecture

At root level:

- Implement global `error.tsx`
- Implement global `not-found.tsx`
- Implement global fallback UI
- Capture unhandled errors
- Send errors to monitoring service

Must handle:
- Unexpected crashes
- Suspense failures
- Async rendering issues

---

## 2️⃣8️⃣ State Handling Discipline Checklist

Before shipping any screen:

- [ ] Loading state implemented
- [ ] Error state implemented
- [ ] Empty state implemented
- [ ] Not Found handled
- [ ] Unauthorized handled
- [ ] No blank screens
- [ ] No silent failures
- [ ] No layout shifts

If any box is unchecked → not production ready.

---

## 🚫 Strictly Forbidden (State Handling)

- Rendering undefined data
- Showing blank pages
- Silent API failure
- Infinite spinners
- No retry option on recoverable errors
- Ignoring 401/403 handling

---

## 🏁 Reliability Standard

The application must:

- Fail gracefully
- Recover intelligently
- Communicate clearly
- Never confuse users
- Never expose internal system details

Every screen must feel deliberate, even in failure.


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
