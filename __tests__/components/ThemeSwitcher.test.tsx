import { fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const setTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSwitcher', () => {
  const mockUseTheme = jest.mocked(useTheme);

  beforeEach(() => {
    setTheme.mockReset();
  });

  it.each([
    ['terminal', 'Terminal Theme'],
    ['cyberpunk', 'Cyberpunk Theme'],
    ['retro', 'Retro Theme'],
  ])('renders and switches to the %s theme', (theme, buttonTitle) => {
    mockUseTheme.mockReturnValue({
      theme,
      setTheme,
      themes: ['terminal', 'cyberpunk', 'retro'],
    });

    render(<ThemeSwitcher />);
    expect(screen.getByText('SYS_ADMIN')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle(buttonTitle));
    expect(setTheme).toHaveBeenCalledWith(theme);
  });
});
