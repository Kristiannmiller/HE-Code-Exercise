import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Search from '../Search/Search';
import ResultContainer from '../ResultContainer/ResultContainer';
import './App.css';
import logo from '../../assets/logo.png';
import { getSearchResults } from '../../apiCalls';
import { useState } from 'react';


export type Repo = {
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
  lastUpdated: string
};

function App() {

  const [searchResults, setSearchResults] = useState<Repo[]>([]);
  const [error, setError] = useState('')

  const handleNewSearch = (search) => {
    getSearchResults(search)
    .then(response => response.data.items)
    .then(data => setSearchResults(refineResults(data)))
  }

  const refineResults = (results) => {
    if(results.length < 1) setError('No Results Found For Those Parameters. Please Try Again!')
    return results.map((repo, index) => {
      return {
        key: `repo${index}`,
        name: repo.name,
        fullName: repo.full_name,
        ownerName: repo.owner.login,
        ownerIcon: repo.owner.avatar_url,
        ownerUrl: repo.owner.url,
        repoUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks,
        openIssues: repo.open_issues,
        created: repo.created_at,
        lastUpdated: repo.updated_at
      }
    })
  }

  const resetSearch = () => {
    setSearchResults([])
  }

  const handleError = (message) => {
    setError(message)
  }

  return (
    <div className="app">
      <header className="app-header">
        <img className="logo" src={logo}/>
        <Search
          error={error}
          handleNewSearch={handleNewSearch}
          resetSearch={resetSearch}
          handleError={handleError}
        />
      </header>
        <ResultContainer
          error={error}
          searchResults={searchResults}
        />
    </div>
  );
}

export default App;
