# TODO

## 🔒 Security (HIGH PRIORITY)
- [x] Implement rate limiting on API endpoints and contact form

## Features
- [x] File upload functionality (release artwork, event images — S3)
- [x] Configure queue driver (Redis/database) — set `QUEUE_CONNECTION=redis` in production; see .env.example
- [x] Set up file storage (S3/local) — set `FILESYSTEM_DISK=s3` in production; AWS credentials in .env.example
- [ ] Real-time notifications

## Testing
- [x] Create frontend component tests
- [ ] Set up end-to-end testing
- [ ] Add test coverage reporting

## Performance
- [x] Implement caching strategy (releases.index + events.index via Cache::remember)
- [ ] Optimize database queries
- [x] Add image optimization (lazy loading on all img tags)
- [ ] Set up CDN for assets
- [ ] Implement lazy loading

## Documentation
- [ ] API documentation
- [ ] Component documentation

## Automation
- [x] Add Dependabot (`.github/dependabot.yml`) for npm + composer automated dependency PRs

## Completed
- [x] Admin auth middleware (`auth`, `verified` on all admin routes)
- [x] CSRF protection (Laravel default)
- [x] HTTPS configured (Let's Encrypt)
- [x] Dark mode (HandleAppearance middleware)
- [x] Loading states and error handling
- [x] Search and filtering
- [x] Pagination components
- [x] CI/CD pipeline
- [x] Production environment
- [x] Monitoring and logging
- [x] Backup strategy
- [x] Update documentation to reflect Linux backend setup
