import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).not.toBeDisabled();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-blue-600');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-gray-200');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByTestId('button');
    expect(button).toHaveClass('border-blue-600');
  });

  test('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByTestId('button');
    expect(button).toHaveClass('py-1 px-3 text-sm');

    rerender(<Button size="md">Medium</Button>);
    button = screen.getByTestId('button');
    expect(button).toHaveClass('py-2 px-4');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByTestId('button');
    expect(button).toHaveClass('py-3 px-6 text-lg');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('can be disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50 cursor-not-allowed');
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
