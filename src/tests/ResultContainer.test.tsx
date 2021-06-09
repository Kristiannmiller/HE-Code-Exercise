import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ResultContainer from '../components/ResultContainer/ResultContainer';

describe('Result Container', () => {

  const selectRepo = jest.fn();

  const repos = [{
    key: `repo1`, name: 'HE-Code-Exercise', fullName: 'Kristiannmiller/HE-Code-Exercise',
    ownerName: 'Kristiannmiller', ownerIcon: 'https://avatars.githubusercontent.com/u/65047537?v=4',
    ownerUrl: 'https://api.github.com/users/Kristiannmiller', repoUrl: 'https://github.com/Kristiannmiller/HE-Code-Exercise',
    description: 'A coding exercise', language: 'TypeScript', stars: 0, forks: 0, openIssues: 7, created: '2021-06-05T21:42:19Z',
    lastUpdated: '2021-06-09T05:45:08Z', ssh: 'git@github.com:Kristiannmiller/HE-Code-Exercise.git', ownerType: 'User'
  },
  {
    key: `repo2`, name: 'sad-repo', fullName: 'Kristinotmiller/HE-Code-Exercise',
    ownerName: 'Kristinotmiller', ownerIcon: 'https://avatars.githubusercontent.com/u/6193285?v=4',
    ownerUrl: 'https://api.github.com/users/Kristinotmiller', repoUrl: 'https://github.com/Kristinotmiller/HE-Code-Exercise',
    description: '', language: '', stars: 0, forks: 0, openIssues: 7, created: '2021-06-05T21:42:19Z',
    lastUpdated: '2021-06-09T05:45:08Z', ssh: 'git@github.com:Kristiannmiller/HE-Code-Exercise.git', ownerType: 'Organization'
  }];

  const sadPath = {error: "Oh No!", loading: true, results: []}
  const happyPath = {error: "", loading: false, results: [...repos]}

  it('Renders Repo Card', () => {

    render(
      <MemoryRouter>
      <ResultContainer
        error={happyPath.error}
        loading={happyPath.loading}
        searchResults={happyPath.results}
        selectRepo={selectRepo}/>
      </MemoryRouter>
    );

    const resultsContainer = screen.getByTestId('results');
    expect(resultsContainer).toBeInTheDocument();
  });
  it('Displays a welcome message if there is no error and no search results', () => {

    render(
      <MemoryRouter>
      <ResultContainer
        error={happyPath.error}
        loading={happyPath.loading}
        searchResults={sadPath.results}
        selectRepo={selectRepo}/>
      </MemoryRouter>
    );

    const happyHunting = screen.getByText('Happy Hunting!');
    expect(happyHunting).toBeInTheDocument();
  });
  it('Displays an error message', () => {

    render(
      <MemoryRouter>
      <ResultContainer
        error={sadPath.error}
        loading={happyPath.loading}
        searchResults={sadPath.results}
        selectRepo={selectRepo}/>
      </MemoryRouter>
    );

    const noResultError = screen.getByText(`${sadPath.error}`);
    expect(noResultError).toBeInTheDocument();
  });
  it('Renders repo Cards', () => {

    render(
      <MemoryRouter>
      <ResultContainer
        error={happyPath.error}
        loading={happyPath.loading}
        searchResults={happyPath.results}
        selectRepo={selectRepo}/>
      </MemoryRouter>
    );

    const repoCard1 = screen.getByTestId(`${happyPath.results[0].name}-link`);
    const repoCard2 = screen.getByTestId(`${happyPath.results[1].name}-link`);
    expect(repoCard1).toBeInTheDocument();
    expect(repoCard2).toBeInTheDocument();
  });
});
