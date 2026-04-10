# Synthveil Architecture Documentation

This document provides an overview of the Synthveil application architecture, design patterns, and technical decisions.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Architecture Patterns](#architecture-patterns)
- [Technology Stack](#technology-stack)
- [Application Layers](#application-layers)
- [SSR Architecture](#ssr-architecture)
- [Design Decisions](#design-decisions)

## 🎯 System Overview

Synthveil is a modern full-stack web application built with **Laravel 12** and **React 19**, emphasizing **server-side rendering (SSR)** for production reliability, performance, and SEO optimization.

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Client (Browser)                       │
│ ┌────────────────────────────────────────────────────┐  │
│ │     React 19 + TypeScript Frontend (Hydrated)      │  │
│ │    (Inertia.js Client / Tailwind CSS / Lucide)     │  │
│ └────────────────────────────────────────────────────┘  │
└───────────────────────┬────────────────────────────────┘
                        │ HTTP/HTTPS
                        │
     ┌──────────────────┼──────────────────┐
     │                  │                  │
┌────▼────┐      ┌─────▼──────┐    ┌────▼────┐
│  Nginx   │      │  PHP-FPM   │    │   SSR   │
│ Reverse  │      │  + Laravel │    │  Node   │
│  Proxy   │      └────────────┘    │ Service │
└────┬─────┘                        └────┬────┘
     │                                   │
     └───────────────┬───────────────────┘
                     │
            ┌────────▼────────┐
            │  SQLite/MySQL    │
            │   Database       │
            └──────────────────┘
```

### Core Principles

1. **SSR-First**: Server-side rendering for all pages by default
2. **Production Ready**: Systemd service management for SSR
3. **Performance Optimized**: Fast initial page loads and SEO
4. **Type Safe**: Full TypeScript support throughout
5. **Scalable**: Designed for growth with proper architecture

## 🏗️ Architecture Patterns

### 1. Model-View-Controller (MVC) + SSR

- **Models** (`app/Models/`): Business entities
- **Views** (`resources/js/Pages/`): React components rendered server-side
- **Controllers** (`app/Http/Controllers/`): Request handling

### 2. Service Layer Pattern

Business logic encapsulation:

```
Controller → Service → Model → Database
     ↓
   Inertia → SSR Service → Browser
```

### 3. SSR Service Architecture

Separate Node.js process handles server-side React rendering:

```
SSR Request → Inertia SSR Server → React Render → HTML
                      ↓
              Laravel Backend
```

### 4. Repository Pattern

Data access abstraction for testing and flexibility.

### 5. Component-Driven Frontend

```
resources/js/
├── Components/       # Reusable UI components
│   └── ui/          # Icon library (Lucide React)
├── Layouts/         # Page layouts
├── Pages/           # Full SSR pages
└── types/           # TypeScript definitions
```

## 🛠️ Technology Stack

### Backend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Laravel 12 | Application framework |
| **Language** | PHP 8.2+ | Server-side programming |
| **Database** | SQLite/MySQL | Data storage (configurable) |
| **Cache** | File/Redis | Session and caching |
| **Static Analysis** | PHPStan | Code quality checking |

### Frontend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 19 | UI library |
| **Language** | TypeScript 5.7 | Type-safe JavaScript |
| **Build Tool** | Vite 7 | Development & bundling |
| **Routing** | Inertia.js 2 | Full-stack SPA framework |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **UI Components** | Radix UI, Headless UI | Accessible primitives |
| **Icons** | Lucide React | SVG icon library |

### SSR Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Node.js 18+ | SSR server runtime |
| **SSR Framework** | Inertia.js SSR | Full-stack SSR support |
| **Process Manager** | systemd | Service management |

### Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Web Server** | Nginx | Reverse proxy & static files |
| **Process Manager** | systemd | Quality process management |
| **SSL** | Let's Encrypt | HTTPS support |
| **Service Management** | systemd Units | Automatic startup/restart |

## 📚 Application Layers

### 1. Presentation Layer

**Responsibilities**: User interface and request handling

**Components**:
- Inertia Pages (`resources/js/Pages/`)
- React Components (`resources/js/Components/`)
- Controllers (`app/Http/Controllers/`)
- SSR Service (`resources/js/ssr.js`)

### 2. Application Layer

**Responsibilities**: Business logic and workflows

**Components**:
- Services (`app/Services/`)
- Form Requests (`app/Http/Requests/`)
- Middleware (`app/Http/Middleware/`)
- Validation Rules

### 3. Domain Layer

**Responsibilities**: Core business entities

**Components**:
- Models (`app/Models/`)
- Contracts (`app/Contracts/`)
- Value Objects

### 4. Infrastructure Layer

**Responsibilities**: Data persistence and external services

**Components**:
- Database Migrations (`database/migrations/`)
- Seeders (`database/seeders/`)
- Configuration (`config/`)
- Providers (`app/Providers/`)

## 🚀 SSR Architecture

### SSR Flow

```
1. Browser requests /page
2. Nginx → Laravel (PHP-FPM)
3. Controller prepares data → Inertia
4. Inertia forwards to SSR Service
5. SSR Service renders React component
6. Returns fully rendered HTML
7. Browser receives complete page
8. React hydrates client-side
```

### Benefits of SSR

- **SEO Optimized**: Search engines receive complete HTML
- **Fast Initial Load**: No waiting for JavaScript bundle
- **Better Accessibility**: Content available without JS execution
- **Performance**: Reduced time to first contentful paint

### SSR Service Management

The SSR service is managed via systemd:

```bash
# View status
systemctl status synthveil-ssr

# Restart service
systemctl restart synthveil-ssr

# View logs
journalctl -u synthveil-ssr -f
```

## 🎨 Design Decisions

### Why Server-Side Rendering?

- Improved SEO for search engine crawlers
- Faster perceived load time
- Reduced JavaScript execution on client
- Better support for users with JavaScript disabled
- More reliable initial page content

### Why Systemd Service Management?

- Automatic process restart on failure
- Clean shutdown handling
- Resource management and limits
- Integration with system monitoring
- No additional process manager needed

### Database Flexibility

- **Development**: SQLite for zero configuration
- **Production**: MySQL/PostgreSQL for scalability
- Fully compatible schema

### UI Component Library

- **Radix UI**: Unstyled, accessible components
- **Headless UI**: Alternative accessible components
- **Lucide React**: Consistent icon system
- All fully typed with TypeScript

## 🔄 Request/Response Lifecycle

### SSR Rendering

```
Request → Router → Form Validation
   ↓
Controller → Service → Models → Database
   ↓
Middleware Processing
   ↓
Inertia Props → SSR Process
   ↓
React Component Tree
   ↓
Server-side Render → HTML Markup
   ↓
Browser Receives Complete Page
   ↓
React Hydration on Client
   ↓
Interactive App
```

## 🔒 Security Architecture

### Input Validation

- Form Request validation
- Model attribute protection
- API request validation

### Output Protection

- React auto-escapes content
- CSRF protection via Inertia
- Content Security Policy headers

### Authentication

- Shared auth-system integration
- Session management
- Bearer token support

## 📊 Monitoring & Debugging

### SSR Logs

View SSR service logs:
```bash
journalctl -u synthveil-ssr -n 50  # Last 50 lines
```

### Laravel Logs

Application logs in `storage/logs/`

### Performance Profiling

Use Laravel Telescope or custom timing middleware.

## 📝 Directory Structure

```
synthveil/
├── app/
│   ├── Models/           # Database models
│   ├── Http/
│   │   ├── Controllers/  # Request handlers
│   │   └── Requests/     # Form validation
│   ├── Services/         # Business logic
│   └── Providers/        # Service registration
├── routes/
│   ├── web.php           # Web routes (SSR)
│   └── api.php           # API routes
├── resources/
│   └── js/
│       ├── Components/   # React components
│       ├── Layouts/      # Page layouts
│       ├── Pages/        # Full-page components
│       ├── types/        # TypeScript types
│       ├── ssr.ts        # SSR entry point
│       └── app.ts        # Client entry point
├── database/
│   ├── migrations/       # Database structure
│   └── seeders/          # Test data
├── public/               # Static assets
├── storage/              # Logs and uploads
├── config/               # App configuration
└── systemd/              # Service configuration
    └── synthveil-ssr.service
```
