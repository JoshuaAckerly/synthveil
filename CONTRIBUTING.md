# Contributing to Synthveil

Thank you for your interest in contributing to Synthveil! This guide explains how to contribute.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)

## 🤝 Code of Conduct

We foster a welcoming, inclusive environment for all contributors.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of different viewpoints
- Accept constructive criticism gracefully
- Focus on community benefit
- Show empathy

### Unacceptable Behavior
- Harassment or trolling
- Personal or political attacks
- Unwanted disclosure of private information
- Inappropriate conduct

## 🚀 Getting Started

### Prerequisites

- PHP 8.2+ with Composer
- Node.js 18+ with npm
- SQLite or MySQL 8.0+
- Git

### Development Setup

```bash
# Fork repository
# Clone your fork
git clone https://github.com/YOUR-USERNAME/synthveil.git
cd synthveil

# Add upstream
git remote add upstream https://github.com/JoshuaAckerly/synthveil.git

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database
touch database/database.sqlite
php artisan migrate

# Development
composer dev
```

## 🔄 Development Workflow

### 1. Create Branch

```bash
# Feature
git checkout -b feat/add-ssr-feature

# Bug fix
git checkout -b fix/rendering-issue

# Refactor
git checkout -b refactor/improve-service

# Tests
git checkout -b test/add-ssr-tests
```

### 2. Make Changes

```bash
# Edit code
# Test locally
./vendor/bin/phpunit
npm test

# Commit with clear messages
git commit -m "feat: add SSR feature"

# Keep updated
git fetch upstream
git rebase upstream/main
```

### 3. Quality Checks

```bash
# Backend tests
./vendor/bin/phpunit

# Frontend tests
npm test

# Code analysis
./vendor/bin/phpstan analyse
vendor/bin/pint
npm run lint

# Type checking
npm run types
```

## 📝 Coding Standards

### PHP Standards

- Use **PSR-12** style
- Type all parameters and returns
- Meaningful names
- Single responsibility principle

**Example**:
```php
<?php
namespace App\Services;

class RenderService
{
    public function render(string $component, array $props): string {
        return $this->inertia->render($component, $props);
    }
}
```

### TypeScript Standards

- Type all variables
- Use ESLint configuration
- Meaningful component names
- Single-purpose components

**Example**:
```typescript
interface PageProps {
    title: string;
    content: string;
}

export function PageComponent({ title, content }: PageProps): JSX.Element {
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
}
```

## 📋 Commit Guidelines

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Code reorganization
- `perf`: Performance improvement

**Example**:
```
feat(ssr): improve server-side rendering performance

Optimize React component rendering in SSR service.
- Cache rendered components
- Reduce memory usage
- Improve response times

Closes #789
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Tests pass
- [ ] Code quality checks pass
- [ ] Documentation updated
- [ ] Branch is updated
- [ ] Commits are clean

### PR Title

```
feat: add SSR feature
fix: resolve rendering bug
docs: update contributing guide
```

### PR Description

```markdown
## Description
What changes?

## Motivation
Why needed?

## Types
- [ ] Feature
- [ ] Bug fix
- [ ] Docs
- [ ] Breaking change

## Testing
How tested?

## Checklist
- [ ] Tests pass
- [ ] QA checks pass
- [ ] Docs updated
```

## ✅ Testing Requirements

### Backend Tests

```bash
./vendor/bin/phpunit
./vendor/bin/phpunit --coverage-html coverage
```

Must include:
- SSR rendering tests
- API endpoint tests
- Service logic tests
- Error handling tests

### Frontend Tests

```bash
npm test
npm test -- --coverage
```

Must include:
- Component tests
- Integration tests
- Page tests
- Both SSR and client hydration

## 🎯 Contribution Areas

- **Features**: New components, SSR improvements
- **Bug Fixes**: Help fix reported issues
- **Tests**: Increase coverage
- **Documentation**: Improve guides
- **Performance**: Optimize rendering
- **Accessibility**: Improve a11y

## 📞 Questions?

- Open an issue
- Check documentation
- Comment on PRs
- Contact maintainers

Thank you for contributing! 🚀
