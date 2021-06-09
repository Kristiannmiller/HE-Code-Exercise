/**** ASSETS ****/
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

/**** TYPES ****/
type Props = {
  repoData: any; //would ideally like to export the Repo type from App to use here
  selectRepo(repoKey: string): void;
};

const Card: React.FC<Props> = ({
  repoData, //single repo object
  selectRepo //fn that sets the selected repo to be displayed in RepoDetails
}) => {

/**** COMPONENT RENDER ****/
  return (
    <Link className="card-wrap" onClick={() => selectRepo(repoData.key)} to={`/${repoData.key}/${repoData.name}`} data-testid={`${repoData.name}-link`}>
      <header className="card-header">
        <img className="card-avatar" src={repoData.ownerIcon} alt={`${repoData.ownerName}'s GitHub avatar`}/>
        <section className="card-badges">
          {repoData.language && <div data-testid="lang" className="badge language">{repoData.language}</div>}
          <div className="badge stars">{`⭑ ${repoData.stars}`}</div>
        </section>
      </header>
      <h1 className="card-title">{repoData.name}</h1>
      <section className="description-wrap">
        {repoData.description && <p className="card-description">{repoData.description}</p>}
        {!repoData.description && <p className="card-description">No Description Available</p>}
      </section>
    </Link>
  );
};

export default Card;
