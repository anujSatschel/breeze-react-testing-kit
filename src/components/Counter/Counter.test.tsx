import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter Component', () => {
  test('renders with default props', () => {
    render(<Counter />);
    
    const counter = screen.getByTestId('counter');
    const countDisplay = screen.getByTestId('count-display');
    
    expect(counter).toBeInTheDocument();
    expect(countDisplay).toHaveTextContent('0');
  });

  test('initializes with initialCount prop', () => {
    render(<Counter initialCount={10} />);
    
    const countDisplay = screen.getByTestId('count-display');
    expect(countDisplay).toHaveTextContent('10');
  });

  test('increments count when + button is clicked', () => {
    render(<Counter initialCount={5} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(incrementButton);
    
    expect(countDisplay).toHaveTextContent('6');
  });

  test('decrements count when - button is clicked', () => {
    render(<Counter initialCount={5} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(decrementButton);
    
    expect(countDisplay).toHaveTextContent('4');
  });

  test('respects step prop', () => {
    render(<Counter initialCount={10} step={5} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('15');
    
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('10');
  });

  test('respects min prop', () => {
    render(<Counter initialCount={1} min={0} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('0');
    
    // Should not go below min
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent('0');
  });

  test('respects max prop', () => {
    render(<Counter initialCount={9} max={10} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('10');
    
    // Should not go above max
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent('10');
  });

  test('calls onCountChange when count changes', () => {
    const handleCountChange = jest.fn();
    render(<Counter onCountChange={handleCountChange} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);
    
    expect(handleCountChange).toHaveBeenCalledWith(1);
  });
});
