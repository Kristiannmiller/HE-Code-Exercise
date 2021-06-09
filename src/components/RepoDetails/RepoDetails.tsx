// ASSETS //
import React, { useState, useMemo } from 'react';
import fork from '../../assets/fork.png';
import './RepoDetails.css';

// TYPES //
type Props = {
  repo: any;
};

const RepoDetails: React.FC<Props> = ({
  repo
}) => {

// Helper Functions //
  const createDate = (date: string) => {
    let day = new Date(date).toString().split(" ")
    return ([`${day[0]},`, `${day[1]}.`, `${day[2]},`, day[3]]).join(" ")
  };

// COMPONENT RENDER //
  return (
    <article className="box detail-container">
      <header className="detail-header">
        <img className="detail-avatar" src={repo.ownerIcon} alt={`${repo.ownerName}'s GitHub avatar`}/>
          <h1 className="detail-title"><a className="atag-color" rel="noreferrer" target="_blank" href={repo.repoUrl}>{repo.name}</a></h1>
          <h2 className="detail-owner"><a className="atag-color" rel="noreferrer" target="_blank" href={repo.ownerUrl}>{repo.ownerName}</a></h2>
          <section className="detail-description-wrap">
            {repo.description && <p className="detail-description">{repo.description}</p>}
            {!repo.description && <p className="detail-description">No Description Available</p>}
          </section>
          <section className="detail-badges">
            {repo.language && <div className="badge language">{repo.language}</div>}
            <div className="badge stars">{`⭑ ${repo.stars}`}</div>
            <div className="badge forks">
              <img src={fork} style={{height: "15px"}} alt="forked repo symbol"/>
              {`${repo.forks}`}
            </div>
          </section>
      </header>
      <section className="stats-container">
        <div className="repo-stats">
          <h1 className="repo-stat-title">{`${repo.name} GitHub Stats`}</h1>
          <h2 className="repo-stat"><span className="stat-cat">Name:</span>{repo.fullName}</h2>
          <h2 className="repo-stat"><span className="stat-cat">Open Issues:</span>{repo.openIssues}</h2>
          <h2 className="repo-stat"><span className="stat-cat">Created:</span>{createDate(repo.created)}</h2>
          <h2 className="repo-stat"><span className="stat-cat">Last Update:</span>{createDate(repo.lastUpdated)}</h2>
          <h2 className="repo-stat"><span className="stat-cat">SSH:</span>{repo.ssh}</h2>
        </div>
        {repo.ownerType === 'User' &&
        <div className="owner-stats">
          <img
            className="owner-stats-git"
            src={`https://github-readme-stats-sigma-five.vercel.app/api?username=${repo.ownerName}&show_icons=true&include_all_commits=true&count_private=true&theme=vue&line_height=30`}
            alt={`An overview of ${repo.ownerName}'s GitHub statistics`}/>
        </div>}
      </section>
    </article>
  );
};

export default RepoDetails;
