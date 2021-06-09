// ASSETS //
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import logo from '../../assets/logo.png';
import { getSearchResults } from '../../apiCalls';
// COMPONENTS //
import Search from '../Search/Search';
import ResultContainer from '../ResultContainer/ResultContainer';
import RepoDetails from '../RepoDetails/RepoDetails';

// TYPES //
export type Repo = {
  key: string,
  name: string,
  fullName: string,
  ownerName: string,
  ownerIcon: string,
  ownerUrl: string,
  repoUrl: string,
  description: string,
  language: string,
  stars: number,
  forks: number,
  openIssues: number,
  created: string,
  lastUpdated: string,
  ssh: string,
  ownerType: string
};

const App = () => {

// Global Variables //
  const blankRepo = {
    key: `0`, name: '', fullName: '', ownerName: '', ownerIcon: '',
    ownerUrl: '', repoUrl: '', description: '', language: '', stars: 0,
    forks: 0, openIssues: 0, created: '', lastUpdated: '', ssh: '',
    ownerType: ''
  };

// State //
  const [searchResults, setSearchResults] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo>(blankRepo);
  const [isDetailView, setIsDetailView] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

// Handler Functions //
  const handleNewSearch = (search: any) => {
    setIsLoading(true)
    getSearchResults(search)
    .then(response => setSearchResults(handleResults(response.items)))
    .catch(error => setError(error.message))
  };

  const handleResults = (results: any) => {
    if(results.length < 1) {
      setError('No Results Found For Those Parameters. Please Try Again!')
      return []
    } else {
      const newResults = refineResults(results)
      setIsLoading(false)
      return newResults
    };
  };

  const handleError = (message: string) => setError(message);

  const selectRepo = (repoKey: string) => {
    setIsLoading(true)
    setIsDetailView(true)
    let repo = searchResults.find(repo => repo.key === repoKey)
    if(repo) setSelectedRepo(repo)
    setIsLoading(false)
  };

// Helper Functions //
  const refineResults = (results: any) => {
    return results.map((repo: any, index: number) => {
      return {
        key: `repo${index}`,
        name: repo.name,
        fullName: repo.full_name,
        ownerName: repo.owner.login,
        ownerIcon: repo.owner.avatar_url,
        ownerUrl: repo.owner.html_url,
        repoUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks,
        openIssues: repo.open_issues,
        created: repo.created_at,
        lastUpdated: repo.updated_at,
        ssh: repo.ssh_url,
        ownerType: repo.owner.type
      }
    });
  };

  const resetSearch = () => setSearchResults([]);

  const resetView = () => {
    setSelectedRepo(blankRepo)
    setIsDetailView(false)
  };

// Render Functions //
  const renderSearch = () => {
    if(!isDetailView) {
      return (
        <Search
        errorMessage={error}
        handleNewSearch={handleNewSearch}
        resetSearch={resetSearch}
        handleError={handleError}
        />)
    } else {
      return (
        <Link className="button back" to={`/`} onClick={() => resetView()}>{`< back to search`}</Link>
      )
    };
  };

  const renderRepoDetails = () => {
    if(error || selectedRepo.key === '0') {
      return (
        <ResultContainer error={error} loading={isLoading} searchResults={searchResults} selectRepo={selectRepo}/>
      )
    } else {
      return (
        <RepoDetails repo={selectedRepo}/>
      )
    };
  };

// COMPONENT RENDER //
  return (
    <div className="app">
      <header className="app-header">
        <Link to={`/`}>
          <img onClick={() => resetView()} className="logo" src={logo} alt="GitHunt logo: Octocat inside of a magnifying glass with GitHunt next to it in white lettering"/>
        </Link>
        {renderSearch()}
      </header>
      <Switch>
        <Route path='/:repoKey/:repoName'
        render={({ match }) => renderRepoDetails()}>
        </Route>
        <Route exact path='/'>
          <ResultContainer error={error} loading={isLoading} searchResults={searchResults} selectRepo={selectRepo}/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
