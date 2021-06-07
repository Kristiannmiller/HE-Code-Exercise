import React from 'react';
import { useState } from 'react';

import './Search.css';

type Props = {
  handleNewSearch(search: string): void;
  handleError(message: string): void;
  resetSearch: void;
};

const Search: React.FC<Props> = ({
  handleNewSearch,
  handleError,
  resetSearch
}) => {

  const [keyword, setKeyword] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [error, setError] = useState('')

  const popularLanguages = [
    'JavaScript', 'Python', 'C', 'Java', 'Go', 'Perl', 'Ruby', 'Swift', 'Scala', 'PHP', 'C++',
    'R', 'Objective-C', 'SQL', 'MATLAB', 'Rust', 'TypeScript', 'Kotlin', 'CSS', 'HTML', 'Groovy',
    'Dart', 'Assembly', 'PowerShell', 'Julia', 'Scratch', 'COBOL', 'Fortran', 'ABAP', 'Scheme', 'Shell',
    'Prolog', 'VBScript', 'Haskell', 'Delphi', 'Hack', 'Pascal', 'Ada', 'Lua', 'Visual Basic', 'Common Lisp',
    'Bash', 'Clojure', 'MQL4', 'Apex', 'LabVIEW', 'ABL', 'D', 'SAS', 'Logo', 'C#', 'Jupyter Notebook', 'CoffeeScript',
    'QML', 'Less', 'Makefile', 'Lua', 'Roff', 'Vala', 'Solidity', 'Starlark', 'TeX', 'Vue', 'React', 'React Native',
    'Erlang', 'Elixer', 'OCaml', 'OpenSCAD', 'Vim script'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if(keyword === "") {
      setHasResults(false)
      resetSearch()
      handleError('Enter A Keyword to Start Hunting!')
      return
    }
    handleError('loading...')
    let search = `${keyword}`
    if(filter !== '') search += ` language:${filter.toLowerCase()}`
    if(sort === 'Stars') search += `&sort=stars`
    handleNewSearch(search)
    setHasResults(true)
    handleError('')
  }

  const handleChange = (e) => {
    e.preventDefault()
    if(hasResults) {
      setHasResults(false)
      resetSearch()
    }
    if(keyword === "") {
      resetSearch()
    }
    setKeyword(e.target.value)
  }

  const displayingResults = () => {
    return keyword !== "" && hasResults
  }

  const buildDropdownOptions = () => {
    return popularLanguages.map(lang => {
      return (
        <option>{lang}</option>
      )
    })
  }

  return (
    <div className="search-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input className="input" id="keyword" onChange={event => handleChange(event)} type="search" placeholder="Search Repositories By Keyword"/>
        <section className="filter-container">
          <label for="language" className="label">Language :</label>
            <input className="filter" name="language" type="text" placeholder="optional" list="popLanguages" onChange={event => setFilter(event.target.value)}/>
            <datalist id="popLanguages">{buildDropdownOptions()}</datalist>
          <label for="sort" className="label">Sort By :</label>
          <select className="filter" name="sort" onChange={event => setSort(event.target.value)} type="dropdown">
            <option value="Default">Best Match</option>
            <option value="Stars">Number of Stars</option>
          </select>
          <button className="button-search">SEARCH</button>
        </section>
      </form>
    </div>
  );
}

export default Search;
