/* eslint-env jest */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '../components/Navbar';

jest.mock('next/router', () => ({
  useRouter: () => ({ basePath: '' }),
}));

describe('Navbar', () => {
  it('toggles navigation menu when button is clicked', () => {
    const { container } = render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('ul')).toBeNull();
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('ul')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    return waitFor(() => {
      expect(container.querySelector('ul')).toBeNull();
    });
  });
});
