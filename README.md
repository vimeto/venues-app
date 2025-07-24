# ML Venues App

A beautiful, responsive web application for tracking upcoming machine learning research conferences and their important dates.

## Features

- 📊 **Sortable Table**: Click on column headers to sort by venue name, abstract due date, and more
- 🔍 **Smart Filtering**: Filter by JUFO rating, search venues by name or summary, show only upcoming conferences
- 🌓 **Dark/Light Mode**: Automatic theme detection with manual toggle
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ♿ **Accessible**: Built with accessibility in mind using ARIA attributes
- ⚡ **Lightning Fast**: Built with Vite for instant hot module replacement

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **TanStack Table** for advanced table functionality
- **Heroicons** for icons
- **Vitest** for testing
- **GitHub Actions** for CI/CD

## Development

### Prerequisites

- Node.js 22+
- pnpm 9+

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/venues_app.git
cd venues_app
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Run tests:
```bash
pnpm test
```

### Adding New Venues

To add new venues, edit the `src/data/venues.json` file:

```json
{
  "id": "unique-id",
  "name": "Conference Name",
  "url": "https://conference-website.com",
  "jufo": 3,
  "abstractDue": "Jan 1 2025",
  "paperDue": "Jan 8 2025",
  "notifications": "Mar 1 2025",
  "confDates": "Jun 1–5 2025",
  "summary": "Brief description of the conference"
}
```

**Note**: Wrap dates in `**double asterisks**` to make them bold in the table.

## Deployment

The app automatically deploys to GitHub Pages when you push to the `main` branch.

To deploy manually:

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.