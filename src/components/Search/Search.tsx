/**** ASSETS ****/
import React, { useState } from 'react';
import './Search.css';

/**** TYPES ****/
type Props = {
  handleNewSearch: any; //not sure why TypeScript is erroring on this fn when I assign it a proper type
  handleError(message: string): void;
  resetSearch(): void;
};

const Search: React.FC<Props> = ({
  handleNewSearch, //fn from App - fetches data from api, and sets it to state
  handleError, //fn from App - changes App error status
  resetSearch //fn from App - clears search results in App
}) => {

/**** STATE ****/
  const [keyword, setKeyword] = useState(''); //current value of keyword input (updates on change)
  const [hasResults, setHasResults] = useState(false); //boolean determining if there are currently search results being displayed
  const [filter, setFilter] = useState(''); //current value of language filter input (updates on change)
  const [sort, setSort] = useState(''); //current value of sort input (updates on change)

/**** STATE ****/
  const popularLanguages = [
    'JavaScript', 'Python', 'C', 'Java', 'Go', 'Perl', 'Ruby', 'Swift', 'Scala', 'PHP', 'C++',
    'R', 'Objective-C', 'SQL', 'MATLAB', 'Rust', 'TypeScript', 'Kotlin', 'CSS', 'HTML', 'Groovy',
    'Dart', 'Assembly', 'PowerShell', 'Julia', 'Scratch', 'COBOL', 'Fortran', 'ABAP', 'Scheme', 'Shell',
    'Prolog', 'VBScript', 'Haskell', 'Delphi', 'Hack', 'Pascal', 'Ada', 'Lua', 'Visual Basic', 'Common Lisp',
    'Bash', 'Clojure', 'MQL4', 'Apex', 'LabVIEW', 'ABL', 'D', 'SAS', 'Logo', 'C#', 'Jupyter Notebook', 'CoffeeScript',
    'QML', 'Less', 'Makefile', 'Lua', 'Roff', 'Vala', 'Solidity', 'Starlark', 'TeX', 'Vue', 'React', 'React Native',
    'Erlang', 'Elixer', 'OCaml', 'OpenSCAD', 'Vim script'
  ]; //autopopulated options for the language filter to make search results more probable

/**** HANDLER FUNCTIONS ****/
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
  }; //called when form is submitted - handles delegation of events to display search results or error message

  const submitSearch = () => {
    const search = {q: `${keyword}+`, sort: ''}
    if(filter !== '') search.q += `language:${filter.toLowerCase()}`
    if(sort === 'Stars') search.sort = `stars`
    handleNewSearch(search)
    setHasResults(true)
    handleError('')
  }; //handles delegation of events to display search results

  const handleChange = (e: any) => {
    e.preventDefault()
    if(hasResults) {
      setHasResults(false)
      resetSearch()
    }
    if(keyword === '') resetSearch()
    setKeyword(e.target.value)
  }; //handles setting state to current input values on change, and resets results if needed

/**** RENDER FUNCTIONS ****/
  const buildDropdownOptions = () => {
    return popularLanguages.map((lang: string, index: number) => {
      return (
        <option key={index}>{lang}</option>
      )
    });
  }; //returns an array of autocomplete options for the languages input (input still works with any text)

/**** COMPONENT RENDER ****/
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
