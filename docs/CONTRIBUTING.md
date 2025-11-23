# Contributing Guide

## Patagonia Verde - Forest Fire Monitoring

### Initial Setup

```bash
git clone https://github.com/camiloquirogadev/patagonia-verde.git
cd patagonia-verde
npm install
npm run dev
```

**Prerequisites**: Node.js >= 18.0.0, npm >= 8.0.0

---

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useFirmsData, etc.)
├── services/           # APIs and external services
├── types/              # TypeScript definitions
└── utils/              # Utilities and helpers
```

---

## Code Standards

### Naming Conventions

```typescript
// Good - Descriptive
const brightnessTemperatureKelvin = 345.7;

// Bad - Ambiguous  
const temp = 345.7;
```

### JSDoc Comments

```typescript
/**
 * Filters fire hotspots
 * @param fires Array of detections
 * @returns Filtered array
 */
function filterFires(fires: Fire[]): Fire[] {
  // implementation...
}
```

---

## Testing

```bash
# Run tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

**Minimum coverage**: 80%

---

## Contribution Process

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'feat: add new feature'`)
4. Push branch (`git push origin feature/new-feature`)
5. Open Pull Request

### PR Template

```markdown
## Description
Brief description of the change

## Changes
- [ ] New feature X
- [ ] Fix bug Y
- [ ] Update docs Z

## Testing
- [ ] Unit tests included
- [ ] Integration tests passing
- [ ] Build successful
```

---

## Review Checklist

- [ ] Code follows project conventions
- [ ] Tests included and passing
- [ ] Documentation updated
- [ ] Performance not degraded
- [ ] TypeScript without errors
- [ ] Lint without warnings

---

## Useful Scripts

```bash
npm run dev          # Development
npm run build        # Production build
npm run lint         # Verify code
npm run format       # Format code
npm test             # Run tests
```

---

**Contact**: quirogacamilodev@gmail.com  
**Last update**: October 2025