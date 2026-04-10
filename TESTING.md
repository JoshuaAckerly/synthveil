# Testing Guide - Synthveil

Comprehensive guide to testing the Synthveil application.

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [SSR Testing](#ssr-testing)
- [Best Practices](#best-practices)

## 🎯 Testing Philosophy

1. **Test Behavior**: Focus on what code does, not how
2. **Arrange-Act-Assert**: Clear test structure
3. **Test Isolation**: Independent tests
4. **Meaningful Names**: Descriptive test names
5. **Fast Tests**: Quick feedback loop
6. **Real-World Scenarios**: Realistic test cases

## 🔬 Test Types

### 1. Unit Tests

Test individual classes in isolation.

**Location**: `tests/Unit/`

**Example**:
```php
<?php
namespace Tests\Unit;

use App\Services\ExampleService;
use Tests\TestCase;

class ExampleServiceTest extends TestCase
{
    public function test_service_returns_data(): void
    {
        $service = new ExampleService();
        $result = $service->getData();
        
        $this->assertIsArray($result);
    }
}
```

### 2. Feature Tests

Test complete features and endpoints.

**Location**: `tests/Feature/`

**Example**:
```php
<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageRenderTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_renders(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_authenticated_page_requires_login(): void
    {
        $response = $this->get('/dashboard');
        $response->assertRedirect('/login');
    }
}
```

### 3. API Tests

Test API endpoints and responses.

**Example**:
```php
<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_endpoint_with_authentication(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer valid-token')
            ->json('GET', '/api/messages');
        
        $response->assertStatus(200)
            ->assertJsonIsArray();
    }
}
```

## 🏃 Running Tests

### Backend Tests (PHPUnit)

```bash
# Run all tests
./vendor/bin/phpunit

# Run specific suite
./vendor/bin/phpunit tests/Unit
./vendor/bin/phpunit tests/Feature

# Run specific test file
./vendor/bin/phpunit tests/Feature/PageRenderTest.php

# Run specific test
./vendor/bin/phpunit --filter test_home_page_renders

# With coverage
./vendor/bin/phpunit --coverage-html coverage

# Stop on failure
./vendor/bin/phpunit --stop-on-failure
```

### Frontend Tests (Jest)

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Specific file
npm test -- HomePage

# Coverage report
npm test -- --coverage
```

## 🚀 SSR Testing

### Testing Server-Side Rendering

```php
<?php
namespace Tests\Feature;

use Tests\TestCase;

class SsrRenderTest extends TestCase
{
    public function test_ssr_renders_complete_html(): void
    {
        $response = $this->get('/');

        // SSR should provide complete HTML
        $response->assertStatus(200);
        $response->assertSee('<html', false);  // Raw HTML check
    }

    public function test_ssr_includes_page_data(): void
    {
        $response = $this->get('/');

        // Check for inertia props
        $response->assertSee('window.__INITIAL_STATE__');
    }
}
```

### Testing SSR Service Health

```bash
# Check SSR service status
systemctl status synthveil-ssr

# View recent logs
journalctl -u synthveil-ssr -n 50

# Restart service
systemctl restart synthveil-ssr
```

## ✍️ Writing Tests

### Test Naming

```php
// Good
test_ssr_page_renders_with_correct_title()
test_api_requires_bearer_token()

// Bad
test_page()
test_api()
```

### AAA Pattern

```php
public function test_example(): void
{
    // Arrange - Set up test data
    $page = '/dashboard';
    
    // Act - Perform action
    $response = $this->get($page);
    
    // Assert - Verify result
    $response->assertStatus(200);
}
```

## 📊 Test Coverage

```bash
# Generate coverage report
./vendor/bin/phpunit --coverage-html coverage

# Text output
./vendor/bin/phpunit --coverage-text
```

Target coverage:
- Services: 90%+
- Controllers: 80%+
- Components: 80%+

## 🎯 Best Practices

1. **Test with browser** - use Dusk for end-to-end testing
2. **Test SSR rendering** - verify HTML is complete
3. **Test without JavaScript** - ensure graceful degradation
4. **Test authentication** - verify protected pages
5. **Test edge cases** - empty data, errors, redirects
6. **Mock external services** - don't call real APIs
7. **Use factories** - consistent test data
8. **Fast feedback** - run tests frequently

## 🔍 Debugging Failed Tests

```bash
# Run single failing test
./vendor/bin/phpunit --filter test_name

# With verbose output
./vendor/bin/phpunit -v

# Show console output
./vendor/bin/phpunit --display-incomplete

# Stop on first failure
./vendor/bin/phpunit --stop-on-failure
```

## 📚 Resources

- [PHPUnit Documentation](https://phpunit.de/)
- [Jest Documentation](https://jestjs.io/)
- [Laravel Testing](https://laravel.com/docs/testing)
