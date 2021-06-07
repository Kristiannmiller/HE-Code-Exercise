import React from 'react';
import Search from '../Search/Search';
import './App.css';
import logo from '../../assets/logo.png';
import { getSearchResults } from '../../apiCalls';
import { useState } from 'react';


type Repo = {
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


  const handleNewSearch = (search) => {
    getSearchResults(search)
    .then(response => response.data.items)
    .then(data => setSearchResults(refineResults(data)))
  }

  const refineResults = (results) => {
    return results.map(repo => {
      return {
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

  const updateLanguages = () => {
    if(searchResults.length < 1) {
      return []
    } else {
      return searchResults.reduce((acc, repo) => {
        if(repo.language !== null && !acc.includes(repo.language)) {
          acc.push(repo.language)
        }
        return acc
      }, []).sort()
    }
  }

  const resetSearch = () => {
    setSearchResults([])
  }

  return (
    <div className="app">
      <header className="app-header">
        <img className="logo" src={logo}/>
        <Search
          handleNewSearch={handleNewSearch}
          searchResults={searchResults}
          resetSearch={resetSearch}
        />
      </header>
    </div>
  );
}

export default App;
