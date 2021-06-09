// ASSETS //
import React, { useState, useMemo }  from 'react';
import { Repo } from '../App/App';
import './ResultContainer.css';
// COMPONENTS //
import Card from '../Card/Card';

// TYPES //
type Props = {
  error: string;
  loading: boolean;
  searchResults: Repo[];
  selectRepo(repoKey: string): void;
};

const ResultContainer: React.FC<Props> = ({
  error,
  loading,
  searchResults,
  selectRepo
}) => {

// State //
  const [keyword, setKeyword] = useState('');
  const [hasError, setHasError] = useState(error !== "");
  const [isLoading, setIsLoading] = useState(true);
  useMemo(() => setIsLoading(loading), [loading]);

// Helper Functions //
  const welcomePage = () => {
    if(!hasError && searchResults.length < 1 && !isLoading) {
      return true
    }
  };

// Render Functions //
  const createCards = () => {
    return searchResults.map(repo => {
      return (
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      )
    });
  };

  const displayError = () => {
    return (
      <section className="box message-container">
        <h1>Whoops!</h1><h2 className="error">{error}</h2>
      </section>
    )
  };

  const displayLoading = () => {
    return (
      <section className="box message-container">
        <h1>Loading...</h1><h2 className="error">This should just take a second</h2>
      </section>
    )
  };

// COMPONENT RENDER //
  return (
    <section className="result-container">
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
