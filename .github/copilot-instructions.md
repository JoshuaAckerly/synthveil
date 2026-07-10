# synthveil

## Purpose
Music artist website. Showcases releases, upcoming events, and provides a contact form. Leans frontend-heavy with SSR support.

## Tech Stack
- **Backend**: Laravel 12, PHP 8.2+, Sanctum (session)
- **Frontend**: React 19, TypeScript, Inertia.js 3, Tailwind CSS 4, Radix UI, Headless UI, Heroicons, Vite (with `dev:ssr` concurrently script)
- **Testing**: PHPUnit 11 (`php artisan test`), Vitest + React Testing Library
- **Storage**: MySQL (prod), SQLite (tests), optional Redis/S3

## Architecture

### Controllers (`app/Http/Controllers/`)
- `ContactController` — contact form submission
- `Admin/` — admin panel
- `Auth/` — Breeze-based auth
- `Settings/` — user settings

### Models (`app/Models/`)
- `Release` — music releases, ordered by `release_date` desc
- `Event` — upcoming events, ordered by `event_date` desc
- `Contact` — contact form submissions
- `User`

### Routes (`routes/web.php`)
- `/` — welcome page
- `/about` — about page
- `/music` — passes `Release::orderBy('release_date', 'desc')->get()` to `music` page
- `/events` — passes `Event::orderBy('event_date', 'desc')->get()` to `events` page
- `/contact` — contact form (GET + POST)
- Legacy auth routes (`/login`, `/register`, etc.) redirect 301 to `/`
- Also loads `settings.php`, `auth.php`, `admin.php`

### Frontend (`resources/js/`)
- Pages: `pages/` (kebab-case)
- Components: `components/`
- Layouts: `layouts/`
- Hooks: `hooks/`, Lib: `lib/`, Data stubs: `data/`
- SSR entry: `ssr.tsx`

## Key Patterns
- Auth routes exist but are redirected away — this site does not expose login UI to end users.
- Pass model data directly from route closures to Inertia — no dedicated resource controllers for read-only public pages.
- SSR dev mode: `npm run dev:ssr` runs `build:ssr` + node SSR server concurrently.

## Build & Test
```bash
php artisan test
npm run test            # Vitest
npm run build:ssr
npm run dev:ssr       # SSR dev mode
npm run types
npm run lint
./vendor/bin/pint
```
