# Articles Management System

A modern React application for managing articles with advanced features like categorization, ratings, and favorites.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Running Tests
```bash
# Run Jest tests
npm run test

# Run Cypress E2E tests
npm run cypress:open
```

## 🏗️ Technical Decisions

### State Management Strategy

#### Redux vs React Query
- **Redux** is used for:
    - UI state (theme, loading states)
    - User preferences
    - Favorites management
    - Rating system

- **React Query** is used for:
    - Server state management
    - Article data fetching
    - Categories and filtering
    - Caching and invalidation

### Project Architecture

The project follows a hybrid approach combining vertical slice architecture with hexagonal architecture principles:

```
src/
  ├── core/               # Domain and infrastructure
  ├── features/           # Feature slices
  ├── shared/            # Shared components/utilities
  └── store/             # Global state management
```

#### Vertical Slices
Each feature (e.g., articles, categories) contains its own:
- Components
- API integration
- Tests
- Types
- Hooks

#### Hexagonal Architecture
- **Domain Layer**: Business logic and entities
- **Application Layer**: Use cases and ports
- **Infrastructure Layer**: External integrations and adapters

### Authentication & Persistence

- **Favorites**: Stored in Redux with persistence in localStorage
- **Ratings**: Managed through Redux with localStorage backup
- **Article Data**: Mocked API with simulated network delays

## 🛠️ Technical Stack

- **Core**: React 18, TypeScript
- **State Management**: Redux Toolkit, React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form, Zod
- **Styling**: TailwindCSS
- **Testing**: Jest, React Testing Library, Cypress

## 🧪 Testing Strategy

- **Unit Tests**: Components and hooks
- **Integration Tests**: Redux and React Query interactions
- **E2E Tests**: Critical user flows
- **Mock Service Worker**: API simulation

## 🔍 Error Handling

- Global Error Boundary
- Route-specific error handling
- Form validation
- API error management

## 📱 Responsive Design

- Mobile-first approach
- Tailwind breakpoints
- Flexible layouts

## 🚀 Performance Considerations

- React Query caching
- Redux state optimization
- Code splitting
- Lazy loading

## 📚 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run Jest tests
- `npm run cypress:open`: Open Cypress test runner
- `npm run lint`: Run ESLint