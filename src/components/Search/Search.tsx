import React from 'react';
import { useState, useMemo } from 'react';

import './Search.css';

type Props = {
  handleNewSearch(search: string): void;
  languages: string[];
  resetSearch: void;
};

const Search: React.FC<Props> = ({
  handleNewSearch,
  languages,
  resetSearch
}) => {

  const [keyword, setKeyword] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [currentLanguages, setCurrentLanguages] = useState([])
  const [error, setError] = useState('')
  useMemo(() => setCurrentLanguages(languages), [languages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(keyword === "") {
      setHasResults(false)
      setCurrentLanguages([])
      resetSearch()
      setError('Enter A Keyword to Start Hunting!')
    }
    let search = `${keyword}`
    if(filter !== '' && filter !== '0') search += ` language:${filter.toLowerCase()}`
    if(sort === 'Stars') search += `&sort=stars`
    handleNewSearch(search)
    setHasResults(true)
  }

  const displayingResults = () => {
    return keyword !== "" && hasResults
  }

  return (
    <div className="search-container">
      <form onSubmit={(e) => handleChange(e)}>
        <input className="input" id="keyword" onChange={event => setKeyword(event.target.value)} type="search" placeholder="Search Repositories By Keyword"/>
        <button className="button-search">SEARCH</button>
      </form>
        {displayingResults() &&
          <section className="filter-container">
            <label className="label">Filter By :</label>
            <select className="drop" id="filter" onChange={event => setFilter(event.target.value)} type="dropdown">
              <option value="0">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Assembly">Assembly</option>
              <option value="Ruby">Ruby</option>
            </select>
            <label className="label">Sort By :</label>
            <select className="drop" id="sort" onChange={event => setSort(event.target.value)} type="dropdown">
              <option value="0">Select Sort Option</option>
              <option value="Default">Best Match</option>
              <option value="Stars">Number of Stars</option>
            </select>
          </section>
        }
    </div>
  );
}

export default Search;
