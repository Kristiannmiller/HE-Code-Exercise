import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import RepoDetails from '../components/RepoDetails/RepoDetails';
window.scrollTo = jest.fn();

describe('Repo Card', () => {

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
    lastUpdated: '2021-06-09T05:45:08Z', ssh: 'git@github.com:Kristiannmiller/HE-Code-Exercise.git', ownerType: 'Organization'
  };

  it('Renders the Repo Details component', () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const detailsContainer = screen.getByTestId(`repo-details`);
    expect(detailsContainer).toBeInTheDocument();
  });
  it('Displays the Repository name', () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const repoName = screen.getByText(`${repo.name}`);
    expect(repoName).toBeInTheDocument();
  });
  it("Displays the User's avatar", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const userAvatarAlt = screen.getByAltText(`${repo.ownerName}'s GitHub avatar`);
    expect(userAvatarAlt).toBeInTheDocument();
    expect(userAvatarAlt.src).toBe(`${repo.ownerIcon}`);
  });
  it("Displays the Owner's name", () => {

    render(
      <MemoryRouter>
      <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const ownerName = screen.getByText(`${repo.ownerName}`);
    expect(ownerName).toBeInTheDocument();
  });
  it("Displays the Repository description", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const repoDescription = screen.getByText(`${repo.description}`);
    expect(repoDescription).toBeInTheDocument();
  });
  it("Displays placeholder text if Repository description is unavailable", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={sadRepo}/>
      </MemoryRouter>
    );

    const noDescription = screen.getByText(`No Description Available`);
    expect(noDescription).toBeInTheDocument();
  });
  it("Displays the Repository's star count", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const noDescription = screen.getByText(`⭑ ${repo.stars}`);
    expect(noDescription).toBeInTheDocument();
  });
  it("Displays the Repository's language", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const repoLanguage = screen.getByText(`${repo.language}`);
    expect(repoLanguage).toBeInTheDocument();
  });
  it("Does not display the language if the language data is unavailable", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={sadRepo}/>
      </MemoryRouter>
    );

    const repoLanguage = screen.queryByText(`${repo.language}`);
    const languageBadge = screen.queryByTestId('language');
    expect(repoLanguage).not.toBeInTheDocument();
    expect(languageBadge).not.toBeInTheDocument();
  });
  it("Displays the Repository's fork count", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={repo}/>
      </MemoryRouter>
    );

    const repoForks = screen.getByText(`${repo.forks}`);
    expect(repoForks).toBeInTheDocument();
  });
  it("Displays the Owner's GitHub stats", () => {

    render(
      <MemoryRouter>
        <RepoDetails repo={sadRepo}/>
      </MemoryRouter>
    );

    const ownerStats = screen.queryByAltText(`An overview of ${repo.ownerName}'s GitHub statistics`);
    expect(ownerStats).not.toBeInTheDocument();
  });

});
