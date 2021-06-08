import React from 'react';
import { Repo } from '../App/App';
import Card from '../Card/Card';
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

  const welcomePage = () => {
    if(error === '' && searchResults.length < 1) {
      return true
    }
  }

  const createCards = () => {
    return searchResults.map((repo:any, index:number) => {
      return (
        <Card
          key={index}
          repoData={repo}
          selectRepo={selectRepo}
        />)
    })
  }

  return (
    <section className="result-container">

      { welcomePage() &&
        <section className="welcome">
          <h1 className="greeting"><span>Welcome To</span> <strong>GitHunt</strong></h1>
          <article className="directions">
            <p>
            <span>GitHub</span> is a code hosting platform for version control and collaboration.
            It lets you and others work together on projects from anywhere.</p>
            <br></br><p><span>GitHunt</span> makes it easy to search for public repositories on GitHub using keywords and language filters.</p>
            <br></br><p><span>To get started</span> just type a keyword into the search bar and click 'SEARCH' or press 'Enter'.</p>
          </article>
          <h2>Happy Hunting!</h2>
        </section> }

      { error === '' ? createCards() : <h1>{error}</h1> }

    </section>
  );
}

export default ResultContainer;
