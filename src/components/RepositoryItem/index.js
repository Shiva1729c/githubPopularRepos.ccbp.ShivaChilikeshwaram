// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="language-avatar" />
      <p className="language-name">{name}</p>
      <ul className="stats-container">
        <li className="stats">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stats-icon"
          />
          <p className="stats-count">{starsCount} stars</p>
        </li>
        <li className="stats">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stats-icon"
          />
          <p className="stats-count">{forksCount} forks</p>
        </li>
        <li className="stats">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stats-icon"
          />
          <p className="stats-count">{issuesCount} open issues</p>
        </li>
      </ul>
    </li>
  )
}

export default RepositoryItem
