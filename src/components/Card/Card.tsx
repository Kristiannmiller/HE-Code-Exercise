// ASSETS //
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

// TYPES //
type Props = {
  repoData: any;
  selectRepo(repoKey: string): void;
};

const Card: React.FC<Props> = ({
  repoData,
  selectRepo
}) => {

// COMPONENT RENDER //
  return (
    <Link className="card-wrap" onClick={() => selectRepo(repoData.key)} to={`/${repoData.key}/${repoData.name}`} data-testid={`${repoData.name}-link`}>
      <header className="card-header">
        <img className="card-avatar" src={repoData.ownerIcon} alt={`${repoData.ownerName}'s GitHub avatar`}/>
        <section className="card-badges">
          {repoData.language && <div className="badge language">{repoData.language}</div>}
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
