/**** ASSETS ****/
import React, { useState } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import './App.css';
import logo from '../../assets/logo.png';
import { getSearchResults } from '../../apiCalls';
/**** COMPONENTS ****/
import Search from '../Search/Search';
import ResultContainer from '../ResultContainer/ResultContainer';
import RepoDetails from '../RepoDetails/RepoDetails';

/**** TYPES ****/
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

/**** GLOBAL VARIABLES ****/
  const blankRepo = {
    key: `0`, name: '', fullName: '', ownerName: '', ownerIcon: '',
    ownerUrl: '', repoUrl: '', description: '', language: '', stars: 0,
    forks: 0, openIssues: 0, created: '', lastUpdated: '', ssh: '',
    ownerType: ''
  }; // needed for TypeScript verification


/**** STATE ****/
  const [searchResults, setSearchResults] = useState<Repo[]>([]); //an array of repo objects that have been tailored (see refineResults)
  const [selectedRepo, setSelectedRepo] = useState<Repo>(blankRepo); //if a user clicks on a repo card, this stores the data for the selected repo
  const [isDetailView, setIsDetailView] = useState(false); //boolean determining if the RepoDetails component is rendered - Used for conditional rendering of Search component
  const [error, setError] = useState(''); //custom error message
  const [isLoading, setIsLoading] = useState(false); //loading boolean

/**** HANDLER FUNCTIONS ****/
  const handleNewSearch = (search: any) => {
    setIsLoading(true)
    getSearchResults(search)
    .then(response => setSearchResults(handleResults(response.items)))
    .catch(error => setError(error.message))
  }; //fetches data from api, and sets it to state

  const handleResults = (results: any) => {
    if(results.length < 1) {
      setError('No Results Found For Those Parameters. Please Try Again!')
      return []
    } else {
      const newResults = refineResults(results)
      setIsLoading(false)
      return newResults
    };
  }; //called in handleNewSearch fn - error handling for empty results - returns tailored results using refineResults fn

  const handleError = (message: string) => setError(message); //prop for Search component to change error status

  const selectRepo = (repoKey: string) => {
    setIsLoading(true)
    setIsDetailView(true)
    let repo = searchResults.find(repo => repo.key === repoKey)
    if(repo) setSelectedRepo(repo)
    setIsLoading(false)
  }; //prop for ResultContainer - sets selectedRepo and switches to RepoDetail view

/**** HELPER FUNCTIONS ****/
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
  }; //cleans up data for ease of use

  const resetSearch = () => setSearchResults([]); //prop for Search component to clear results

  const resetView = () => {
    setSelectedRepo(blankRepo)
    setIsDetailView(false)
  }; //resets the state to change pages. Allows user to navigate back to their search.

/**** RENDER FUNCTIONS ****/
  const renderSearch = () => {
    if(!isDetailView) {
      return (
        <Search
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />)
    } else {
      return (
        <Link className="button back" to={`/`} onClick={() => resetView()}>{`< back to search`}</Link>
      )
    };
  }; //renders the 'BACK' button when in RepoDetails view, and the Search component otherwise

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
  }; //renders the ResultContainer component to handle an error (or an empty result/page refresh), and the RepoDetails component otherwise

/**** COMPONENT RENDER ****/
  return (
    <BrowserRouter>
    <div className="app" data-testid="app-wrap">
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
    </BrowserRouter>
  );
};

export default App;
