import React, { useState } from 'react';
import type Repo from '../App/App';
import { Link } from 'react-router-dom';
import './Card.css';

type Props = {
  repoData: any
  selectRepo(repoKey: string): void;
};

const Card: React.FC<Props> = ({
  repoData,
  selectRepo
}) => {


  return (
    <Link className="card" onClick={() => selectRepo(repoData.key)} to={`/${repoData.key}/${repoData.name}`} data-testid={`${repoData.name}-link`}>
      <section className="card-header">
        <img className="card-avatar" src={repoData.ownerIcon} alt={`${repoData.ownerName}'s GitHub avatar`}/>
        <section className="card-badges">
          {repoData.language && <div className="card-language">{repoData.language}</div>}
          <div className="card-stars">{`⭑ ${repoData.stars}`}</div>
        </section>
      </section>
      <h1 className="card-title">{repoData.name}</h1>
      <section className="description-wrap">
        {repoData.description && <p className="card-description">{repoData.description}</p>}
        {!repoData.description && <p className="card-description">No Description Available</p>}
      </section>
    </Link>
  );
}

export default Card;
