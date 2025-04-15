
# React Testing Kit

A comprehensive starter template for React projects with Jest and React Testing Library.

## Features

- ✅ React 18 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Jest for test running and assertions
- ✅ React Testing Library for component testing
- ✅ User event simulation for interaction testing
- ✅ TypeScript support with ts-jest

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Testing Guidelines

### File Structure

- Place test files next to the component they test
- Use `.test.tsx` or `.spec.tsx` as the file extension for test files

Example:
```
/src
  /components
    /Button
      Button.tsx
      Button.test.tsx
```

### Writing Tests

#### 1. Basic Component Rendering

```jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

#### 2. Testing User Interactions

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('calls onClick handler when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 3. Testing Async Code

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

test('loads and displays user data', async () => {
  render(<UserProfile userId="123" />);
  
  // First shows loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Then shows the user name when loaded
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not how it's built.
2. **Use data-testid sparingly**: Prefer using accessible attributes and text content for queries.
3. **Mock external dependencies**: Use Jest's mocking capabilities to isolate the component under test.
4. **Test edge cases**: Include tests for error states, boundary conditions, and loading states.
5. **Keep tests simple**: Each test should verify a single piece of functionality.

