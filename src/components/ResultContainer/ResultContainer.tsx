import React from 'react';
import { Repo } from '../App/App';
import Card from '../Card/Card';


import { useState } from 'react';
import './ResultContainer.css';

type Props = {
  error: string;
  searchResults: Repo[];
  selectRepo(repoKey: string): void;
};

const ResultContainer: React.FC<Props> = ({
  error,
  searchResults,
  selectRepo
}) => {

  const [keyword, setKeyword] = useState('');

  const welcomePage = () => {
    if(error === '' && searchResults.length < 1) {
      return true
    }
  }

  const createCards = () => {
    return searchResults.map(repo => {
      return (
        <Card
          repoData={repo}
          selectRepo={selectRepo}
        />
      )
    })
  }

  const displayError = () => {
    return (
      <section className="box message-container">
        <h1>Whoops!</h1><h2 className="error">{error}</h2>
      </section>
    )
  }

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
      {error === '' ? createCards() : displayError()}
    </section>
  );
}

export default ResultContainer;
