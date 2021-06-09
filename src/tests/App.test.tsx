import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../components/App/App';

describe('App', () => {

  it('Renders the App component', () => {

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const appContainer = screen.getByTestId(`app-wrap`);
    expect(appContainer).toBeInTheDocument();
  });
  it('Displays the GitHunt logo', () => {

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("GitHunt logo: Octocat inside of a magnifying glass with GitHunt next to it in white lettering");
    expect(logo).toBeInTheDocument();
  });
  it('Renders the Search component', () => {

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const keywordInput = screen.getByPlaceholderText("Search Repositories By Keyword");
    expect(keywordInput).toBeInTheDocument();
  });
});
