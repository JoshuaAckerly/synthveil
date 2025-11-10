# SynthVeil

A modern web application built with Laravel and React using Inertia.js for seamless full-stack development.

## Tech Stack

- **Backend**: Laravel 12.x (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI, Headless UI, Lucide React
- **Build Tool**: Vite
- **Full-Stack Bridge**: Inertia.js

## Quick Start

### Prerequisites
- PHP 8.2 or higher
- Node.js 18+ and npm
- Composer

### Installation

1. Clone the repository
2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Set up environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Set up database:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

### Development

Start the development server:
```bash
composer run dev
```

This runs Laravel server, queue worker, and Vite dev server concurrently.

For SSR development:
```bash
composer run dev:ssr
```

### Building for Production

```bash
npm run build:ssr
```

## Available Scripts

### PHP/Laravel
- `composer run dev` - Start development servers
- `composer run test` - Run PHP tests
- `php artisan serve` - Laravel development server

### Node.js/Frontend
- `npm run dev` - Vite development server
- `npm run build` - Production build
- `npm run lint` - ESLint with auto-fix
- `npm run format` - Prettier formatting
- `npm run types` - TypeScript type checking

## Project Structure

```
├── app/                 # Laravel application code
├── resources/js/        # React components and frontend code
├── resources/css/       # Stylesheets
├── routes/             # Laravel routes
├── database/           # Migrations, seeders, factories
├── tests/              # PHP tests
└── public/             # Public assets
```

## License

MIT License