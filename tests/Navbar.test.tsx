/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

jest.mock('next/router', () => ({
  useRouter: () => ({ basePath: '' }),
}));

describe('Navbar', () => {
  it('toggles navigation menu when button is clicked', () => {
    const { container } = render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    const navLinks = container.querySelector('ul');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(navLinks).not.toHaveClass('open');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(navLinks).toHaveClass('open');
  });
});
