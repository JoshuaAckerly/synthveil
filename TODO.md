# TODO

## 🔒 Security (HIGH PRIORITY)
- [ ] Implement rate limiting on API endpoints (currently missing)

## Features
- [ ] File upload functionality (release artwork, event images)
- [ ] Configure queue driver (Redis/database)
- [ ] Set up file storage (S3/local)
- [ ] Real-time notifications

## Testing
- [ ] Create frontend component tests
- [ ] Set up end-to-end testing
- [ ] Add test coverage reporting

## Performance
- [ ] Implement caching strategy
- [ ] Optimize database queries
- [ ] Add image optimization
- [ ] Set up CDN for assets
- [ ] Implement lazy loading

## Documentation
- [ ] API documentation
- [ ] Component documentation

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
