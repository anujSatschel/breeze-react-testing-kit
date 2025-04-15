
import { useState } from 'react';
import Button from '../Button/Button';

type CounterProps = {
  initialCount?: number;
  step?: number;
  min?: number;
  max?: number;
  onCountChange?: (count: number) => void;
};

const Counter = ({
  initialCount = 0,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  onCountChange
}: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    const newCount = Math.min(count + step, max);
    setCount(newCount);
    if (onCountChange) onCountChange(newCount);
  };

  const decrement = () => {
    const newCount = Math.max(count - step, min);
    setCount(newCount);
    if (onCountChange) onCountChange(newCount);
  };

  const isIncrementDisabled = count >= max;
  const isDecrementDisabled = count <= min;

  return (
    <div className="flex flex-col items-center space-y-2" data-testid="counter">
      <div className="text-2xl font-bold" data-testid="count-display">
        {count}
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={decrement} 
          disabled={isDecrementDisabled}
          variant="secondary"
          data-testid="decrement-button"
        >
          -
        </Button>
        <Button 
          onClick={increment} 
          disabled={isIncrementDisabled}
          variant="primary"
          data-testid="increment-button"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;
