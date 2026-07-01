import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders and handles keyboard/click activation', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Add to cart</Button>);
    await user.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
