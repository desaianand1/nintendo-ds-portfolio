# Nintendo DS Lite Portfolio - Technical Context

## Technology Stack

### Core Framework

- **SvelteKit 5**
  - Using new runes syntax for reactive state management
  - File-based routing
  - Server-side rendering capabilities
  - TypeScript integration

### Language

- **TypeScript 5.4+**
  - Strict type checking enabled
  - ESNext features
  - Path aliases configured
  - Type definitions for all libraries

### 3D Rendering

- **Threlte 8**
  - Svelte bindings for Three.js
  - Performance optimized for Svelte
  - Component-based 3D scene management
  - Animation system integration

### Styling

- **TailwindCSS 4**
  - Utility-first CSS framework
  - Custom design system configuration
  - Dark mode support
  - JIT compilation

### Build Tools

- **Vite**
  - Fast HMR development server
  - Optimized production builds
  - Plugin ecosystem
  - Asset optimization

### Emulation

- **DeSmuME WASM**
  - Nintendo DS emulator compiled to WebAssembly
  - Local storage save state support
  - Touch input handling
  - Audio emulation

## Documentation Resources

### Offline Documentation

- **Svelte 5 Docs** (`docs/cline-reference/svelte-docs/`)
  - Comprehensive runes documentation
  - Syntax guides and examples
  - Component patterns
  - Migration guides

- **Threlte 8 Docs** (`docs/cline-reference/threlte-docs/`)
  - Core concepts and tutorials
  - API reference
  - Advanced usage guides
  - Performance optimization

### Knowledge Cache

Located in `docs/memory-bank/reference/`:

- **svelte-essentials.md**
  - Condensed Svelte 5 knowledge
  - Runes syntax and patterns
  - Best practices
  - Common gotchas
  - Migration notes

- **threlte-essentials.md**
  - Essential Threlte patterns
  - Scene management
  - Animation systems
  - Performance optimization
  - Common pitfalls

These resources provide both comprehensive documentation (offline docs) and quick-reference guides (knowledge cache) for the core technologies used in this project.

## Development Environment

### Required Software

- Node.js 20+
- pnpm (package manager)
- VSCode (recommended editor)
- Git

### VSCode Extensions

- Svelte for VS Code
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)

### Environment Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
```

## Project Configuration

### TypeScript Configuration

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "target": "ESNext",
    "module": "ESNext",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Vite Configuration

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  ssr: {
    noExternal: ['three', '@threlte/core', '@threlte/extras']
  },
  optimizeDeps: {
    exclude: ['@threlte/core', '@threlte/extras']
  }
});
```

### TailwindCSS Configuration

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ds-gray': '#ADB5BD',
        'ds-blue': '#339AF0'
      }
    }
  }
};
```

## Dependencies

### Production Dependencies

```json
{
  "@threlte/core": "^8.0.0",
  "@threlte/extras": "^8.0.0",
  "three": "^0.160.0",
  "svelte": "^5.0.0",
  "@sveltejs/kit": "^2.0.0",
  "tailwindcss": "^4.0.0"
}
```

### Development Dependencies

```json
{
  "typescript": "^5.4.0",
  "vite": "^5.0.0",
  "vitest": "^1.0.0",
  "@types/three": "^0.160.0",
  "prettier": "^3.0.0",
  "eslint": "^8.0.0"
}
```

## Technical Constraints

### Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

### WebGL Requirements

- WebGL 2.0 support required
- Fallback message for unsupported browsers
- Performance monitoring for 3D rendering

### Device Support

- Desktop (primary target)
- Tablet (limited functionality)
- Mobile (basic viewing only)

### Performance Targets

- Initial load < 3s on fast connections
- 60fps 3D rendering on desktop
- Memory usage < 200MB
- WASM initialization < 2s

## Development Workflow

### Git Workflow

- Feature branches from main
- Pull request reviews required
- Automated testing on PR
- Semantic versioning

### Code Quality

- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Unit test coverage requirements

### Build Process

1. TypeScript compilation
2. Asset optimization
3. WASM packaging
4. CSS purging
5. Bundle optimization

### Deployment

- Static site generation
- Asset preloading
- Cache optimization
- Performance monitoring

## Testing Strategy

### Unit Testing

- Vitest for component testing
- DOM testing with @testing-library/svelte
- Mocked 3D context
- Isolated component tests

### Integration Testing

- End-to-end with Playwright
- 3D interaction testing
- Emulator integration testing
- Cross-browser testing

### Performance Testing

- Lighthouse CI
- Bundle size monitoring
- Frame rate tracking
- Memory leak detection

## Security Considerations

### WASM Security

- Sandboxed execution
- Memory isolation
- Resource limitations
- Error boundaries

### Asset Security

- Content Security Policy
- Subresource Integrity
- CORS configuration
- Asset validation

### Data Security

- Local storage encryption
- Save state validation
- Input sanitization
- Error handling

## Monitoring & Debugging

### Performance Monitoring

- Frame rate tracking
- Memory usage
- Load times
- Asset loading

### Error Tracking

- Console logging
- Error boundaries
- Performance marks
- User feedback

### Development Tools

- Chrome DevTools
- Three.js Inspector
- Svelte DevTools
- Performance profiling

This technical context provides a comprehensive overview of the development environment, tools, and considerations for the Nintendo DS Lite Portfolio project.
