# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Tasks

### Running the Development Server
```bash
pnpm dev
```

### Running Tests
```bash
pnpm test          # Run tests in watch mode
pnpm test -- --run # Run tests once
```

### Building for Production
```bash
pnpm build
```

### Adding New Venues
Edit the `src/data/venues.json` file. Each venue should follow this structure:
```json
{
  "id": "unique-id",
  "name": "Conference Name",
  "url": "https://conference-website.com",
  "jufo": 1-3,
  "abstractDue": "Date string",
  "paperDue": "Date string",
  "notifications": "Date string",
  "confDates": "Date range string",
  "summary": "Brief description"
}
```

## Code Architecture

### Component Structure
- **UI Components** (`src/components/ui/`): Base shadcn/ui components
- **Feature Components** (`src/components/venues/`): Venue-specific components
- **Layout Components** (`src/components/layout/`): Header and other layout elements

### State Management
Uses React Context (`src/contexts/AppContext.tsx`) for:
- Theme state (dark/light mode)
- Filter state (JUFO rating, search query, upcoming filter)
- Sort state (column and direction)

### Key Technologies
- **React 19** with TypeScript
- **Tailwind CSS** with custom color scheme supporting dark mode
- **TanStack Table** for table functionality
- **Vite** for build tooling
- **Vitest** for testing

### Deployment
The app deploys automatically to GitHub Pages via GitHub Actions when pushing to main branch. The workflow is defined in `.github/workflows/deploy.yml`.