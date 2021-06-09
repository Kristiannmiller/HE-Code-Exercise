import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card/Card';

describe('Repo Card', () => {

  const selectRepo = jest.fn();
  const repo = {
    key: `repo1`, name: 'HE-Code-Exercise', fullName: 'Kristiannmiller/HE-Code-Exercise',
    ownerName: 'Kristiannmiller', ownerIcon: 'https://avatars.githubusercontent.com/u/65047537?v=4',
    ownerUrl: 'https://api.github.com/users/Kristiannmiller', repoUrl: 'https://github.com/Kristiannmiller/HE-Code-Exercise',
    description: 'A coding exercise', language: 'TypeScript', stars: 0, forks: 0, openIssues: 7, created: '2021-06-05T21:42:19Z',
    lastUpdated: '2021-06-09T05:45:08Z', ssh: 'git@github.com:Kristiannmiller/HE-Code-Exercise.git', ownerType: 'User'
  };
  const sadRepo = {
    key: `repo1`, name: 'HE-Code-Exercise', fullName: 'Kristiannmiller/HE-Code-Exercise',
    ownerName: 'Kristiannmiller', ownerIcon: 'https://avatars.githubusercontent.com/u/65047537?v=4',
    ownerUrl: 'https://api.github.com/users/Kristiannmiller', repoUrl: 'https://github.com/Kristiannmiller/HE-Code-Exercise',
    description: '', language: '', stars: 0, forks: 0, openIssues: 7, created: '2021-06-05T21:42:19Z',
    lastUpdated: '2021-06-09T05:45:08Z', ssh: 'git@github.com:Kristiannmiller/HE-Code-Exercise.git', ownerType: 'User'
  };

  it('Renders Repo Card', () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const cardContainer = screen.getByTestId(`${repo.name}-link`);
    expect(cardContainer).toBeInTheDocument();
  });
  it('Displays the Repository name', () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const repoName = screen.getByText(`${repo.name}`);
    expect(repoName).toBeInTheDocument();
  });
  it("Displays the User's avatar", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const userAvatarAlt = screen.getByAltText(`${repo.ownerName}'s GitHub avatar`);
    expect(userAvatarAlt).toBeInTheDocument();
    expect(userAvatarAlt.src).toBe(`${repo.ownerIcon}`);
  });
  it("Displays the Repository description", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const repoDescription = screen.getByText(`${repo.description}`);
    expect(repoDescription).toBeInTheDocument();
  });
  it("Displays placeholder text if Repository description is unavailable", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={sadRepo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const noDescription = screen.getByText(`No Description Available`);
    expect(noDescription).toBeInTheDocument();
  });
  it("Displays the Repository's star count", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const noDescription = screen.getByText(`⭑ ${repo.stars}`);
    expect(noDescription).toBeInTheDocument();
  });
  it("Displays the Repository's language", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const repoLanguage = screen.getByText(`${repo.language}`);
    expect(repoLanguage).toBeInTheDocument();
  });
  it("Does not display the language if the language data is unavailable", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={sadRepo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const repoLanguage = screen.queryByText(`${repo.language}`);
    const languageBadge = screen.queryByTestId('language');
    expect(repoLanguage).not.toBeInTheDocument();
    expect(languageBadge).not.toBeInTheDocument();
  });
  it("Runs selectRepo function when clicked", () => {

    render(
      <MemoryRouter>
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      </MemoryRouter>
    );

    const cardContainer = screen.getByTestId(`${repo.name}-link`);
    expect(cardContainer).toBeInTheDocument();
    userEvent.click(cardContainer);
    expect(selectRepo).toHaveBeenCalled();
  });
});
