import { render, screen } from '@testing-library/react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'terminal',
    setTheme: jest.fn(),
  }),
}));

describe('ThemeSwitcher', () => {
  it('renders correctly', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByText('SYS_ADMIN')).toBeInTheDocument();
  });
});
