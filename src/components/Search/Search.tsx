// ASSETS //
import React, { useState } from 'react';
import './Search.css';

// TYPES //
type Props = {
  handleNewSearch: any;
  handleError(message: string): void;
  resetSearch(): void;
};

const Search: React.FC<Props> = ({
  handleNewSearch,
  handleError,
  resetSearch
}) => {

// State //
  const [keyword, setKeyword] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

// Global Variables //
  const popularLanguages = [
    'JavaScript', 'Python', 'C', 'Java', 'Go', 'Perl', 'Ruby', 'Swift', 'Scala', 'PHP', 'C++',
    'R', 'Objective-C', 'SQL', 'MATLAB', 'Rust', 'TypeScript', 'Kotlin', 'CSS', 'HTML', 'Groovy',
    'Dart', 'Assembly', 'PowerShell', 'Julia', 'Scratch', 'COBOL', 'Fortran', 'ABAP', 'Scheme', 'Shell',
    'Prolog', 'VBScript', 'Haskell', 'Delphi', 'Hack', 'Pascal', 'Ada', 'Lua', 'Visual Basic', 'Common Lisp',
    'Bash', 'Clojure', 'MQL4', 'Apex', 'LabVIEW', 'ABL', 'D', 'SAS', 'Logo', 'C#', 'Jupyter Notebook', 'CoffeeScript',
    'QML', 'Less', 'Makefile', 'Lua', 'Roff', 'Vala', 'Solidity', 'Starlark', 'TeX', 'Vue', 'React', 'React Native',
    'Erlang', 'Elixer', 'OCaml', 'OpenSCAD', 'Vim script'
  ];

// Handler Functions //
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(keyword === "") {
      setHasResults(false)
      resetSearch()
      handleError('Enter A Keyword to Start Hunting!')
      return
    } else {
      handleError('loading...')
      submitSearch()
    };
  };

  const submitSearch = () => {
    const search = {q: `${keyword}+`, sort: ''}
    if(filter !== '') search.q += `language:${filter.toLowerCase()}`
    if(sort === 'Stars') search.sort = `stars`
    handleNewSearch(search)
    setHasResults(true)
    handleError('')
  };

  const handleChange = (e: any) => {
    e.preventDefault()
    if(hasResults) {
      setHasResults(false)
      resetSearch()
    }
    if(keyword === "") resetSearch()
    setKeyword(e.target.value)
  };

// Render Functions //
  const buildDropdownOptions = () => {
    return popularLanguages.map((lang: string, index: number) => {
      return (
        <option key={index}>{lang}</option>
      )
    });
  };

  return (
    <section className="search-container" data-testid="search-wrap">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input className="input" id="keyword" onChange={event => handleChange(event)} type="search" placeholder="Search Repositories By Keyword"/>
        <section className="filter-container">
        <div className="filter-wrap">
          <label className="label" htmlFor="language">Language :</label>
          <input className="filter" name="language" type="text" placeholder="optional" list="popLanguages" onChange={event => setFilter(event.target.value)}/>
          <datalist id="popLanguages">{buildDropdownOptions()}</datalist>
        </div>
        <div className="filter-wrap" id="sort">
          <label className="label" htmlFor="sort">Sort By :</label>
          <select className="filter" name="sort" onChange={event => setSort(event.target.value)}>
            <option value="Default">Best Match</option>
            <option value="Stars">Number of Stars</option>
          </select>
        </div>
          <button className="button search">SEARCH</button>
        </section>
      </form>
    </section>
  );
};

export default Search;
