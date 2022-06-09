import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
// import App from './App';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("Landing Page", () => {
  test('Loads and displays Landing Page', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
  });
  it("Should have an active Link", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    expect(screen.getByRole("link")).toBeEnabled();
  });
});
