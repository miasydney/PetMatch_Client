import { render, screen } from '@testing-library/react';
import App from './App.js';

test('renders login on initial app open', () => {
  render(<App />);
   const login = screen.getByText(/login/i);
   expect(login).toBeInTheDocument();
});
