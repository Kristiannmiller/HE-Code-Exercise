import React from 'react';
import { Repo } from '../App/App';

import { useState } from 'react';
import './Card.css';

type Props = {
  repoData: Repo[]
};

const Card: React.FC<Props> = ({
  repoData
}) => {


  return (
    <article className="card">
      <section className="card-header">
        <img className="card-avatar" src={repoData.ownerIcon} alt={`${repoData.ownerName}'s GitHub avatar`}/>
        <section className="card-badges">
          <div className="card-language">{repoData.language}</div>
          <div className="card-stars">{`⭑ ${repoData.stars}`}</div>
        </section>
      </section>
      <h1 className="card-title">{repoData.name}</h1>
      <section className="description-wrap">
        {repoData.description && <p className="card-description">{repoData.description}</p>}
        {!repoData.description && <p className="card-description">No Description Available</p>}
      </section>
    </article>
  );
}

export default Card;
