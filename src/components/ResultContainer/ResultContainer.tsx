/**** ASSETS ****/
import React, { useState, useMemo }  from 'react';
import { Repo } from '../App/App';
import './ResultContainer.css';
/**** COMPONENTS ****/
import Card from '../Card/Card';

/**** TYPES ****/
type Props = {
  error: string;
  loading: boolean;
  searchResults: Repo[]; //the Repo type works great here, but not in RepoDetails or Card
  selectRepo(repoKey: string): void;
};

const ResultContainer: React.FC<Props> = ({
  error, //string error message
  loading, //boolean for loading message display
  searchResults, //array of tailored repo objects
  selectRepo //selected repo or empty array if none selected
}) => {

/**** STATE ****/
  const [hasError, setHasError] = useState(error !== ''); //boolean determining if there is an error message in error prop (just makes error handling a little easier)
  const [isLoading, setIsLoading] = useState(true); //boolean determining loading status for loading message display
  useMemo(() => setIsLoading(loading), [loading]); //sets isLoading if the loading prop changes on rerender

/**** HELPER FUNCTIONS ****/
  const welcomePage = () => {
    if(!hasError && searchResults.length < 1 && !isLoading) {
      return true
    }
  }; //handles a long conditional to determine if there is no error, the searchResults aren't empty, and the loading status is false. Returns boolean

/**** RENDER FUNCTIONS ****/
  const createCards = () => {
    return searchResults.map((repo: any, index: number) => {
      return (
        <Card
          key={index}
          repoData={repo}
          selectRepo={selectRepo}
        />
      )
    });
  }; //returns an array of Card components with individual repo data

  const displayError = () => {
    return (
      <section className="box message-container">
        <h1>Whoops!</h1><h2 className="error">{error}</h2>
      </section>
    )
  }; //displays an error message

  const displayLoading = () => {
    return (
      <section className="box message-container">
        <h1>Loading...</h1><h2 className="error">This should just take a second</h2>
      </section>
    )
  }; //displays a loading message

/**** COMPONENT RENDER ****/
  return (
    <section className="result-container" data-testid="results">
      {welcomePage() &&
        <section className="box message-container">
          <h1 className="greeting"><span>Welcome To</span> <strong>GitHunt</strong></h1>
          <article className="directions">
            <p>
            <span>GitHub</span> is a code hosting platform for version control and collaboration.
            It lets you and others work together on projects from anywhere.</p>
            <br></br><p><span>GitHunt</span> makes it easy to search for public repositories on GitHub using keywords and language filters.</p>
            <br></br><p><span>To get started</span> just type a keyword into the search bar and click 'SEARCH' or press 'Enter'.</p>
          </article>
          <h2>Happy Hunting!</h2>
        </section>
      }
      {isLoading && displayLoading()}
      {!hasError ? createCards() : displayError()}
    </section>
  );
};

export default ResultContainer;
