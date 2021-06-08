import React from 'react';
import fork from '../../assets/fork.png';
import './RepoDetails.css';

type Props = {
  repo: any
};

const RepoDetails: React.FC<Props> = ({
  repo
}) => {

  const createDate = (date: string) => {
    let day = new Date(date).toString().split(" ")
    return ([`${day[0]}day,`, `${day[1]}.`, `${day[2]},`, day[3]]).join(" ")
  }

  return (
    <article className="detail-container">

      <header className="detail-header">
        <img className="detail-avatar" src={repo.ownerIcon} alt={`${repo.ownerName}'s GitHub avatar`}/>
        <section className="detail-intro">
          <h1 className="detail-title"><a className="atag-color" rel="noreferrer" target="_blank" href={repo.repoUrl}>{repo.name}</a></h1>
          <h2 className="detail-owner"><a className="atag-color" rel="noreferrer" target="_blank" href={repo.ownerUrl}>{repo.ownerName}</a></h2>
          <section className="detail-description-wrap">
            {repo.description && <p className="detail-description">{repo.description}</p>}
            {!repo.description && <p className="detail-description">No Description Available</p>}
          </section>
          <section className="detail-badges">
            {repo.language && <div className="card-language">{repo.language}</div>}
            <div className="card-stars">{`⭑ ${repo.stars}`}</div>
            <div className="card-forks">
              <img src={fork} style={{height: "15px"}} alt="forked repo symbol"/>
              {`${repo.forks}`}
            </div>
          </section>
        </section>
      </header>

      <section className="owner-stats">
        <div className="repo-stats">
          <h1 className="repo-stat-title">{`${repo.name} GitHub Stats`}</h1>
          <h2 className="repo-stat">{`Name: ${repo.fullName}`}</h2>
          <h2 className="repo-stat">{`Open Issues: ${repo.openIssues}`}</h2>
          <h2 className="repo-stat">{`Created: ${createDate(repo.created)}`}</h2>
          <h2 className="repo-stat">{`Last Update: ${createDate(repo.lastUpdated)}`}</h2>
          <h2 className="repo-stat">{`SSH: ${repo.ssh}`}</h2>
        </div>
        {repo.ownerType === 'User' &&
          <img
            className="owner-stats-git"
            src={`https://github-readme-stats-sigma-five.vercel.app/api?username=${repo.ownerName}&show_icons=true&include_all_commits=true&count_private=true&theme=vue&line_height=30`}
            alt={`An overview of ${repo.ownerName}'s GitHub statistics`}
          />}
      </section>

    </article>
  );
}

export default RepoDetails;
