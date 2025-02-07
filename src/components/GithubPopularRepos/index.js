import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const activeStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_Progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeFilterId: languageFiltersData[0].id,
    apiStatus: activeStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    this.setState({apiStatus: activeStatusConstants.in_Progress})
    const {activeFilterId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        repositoryList: formattedData,
        apiStatus: activeStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: activeStatusConstants.failure})
    }
  }

  updateActiveFilter = id => {
    this.setState({activeFilterId: id}, this.getRepositories)
  }

  renderRepositories = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repositories-container">
        {repositoryList.map(eachRepository => (
          <RepositoryItem
            repositoryDetails={eachRepository}
            key={eachRepository.id}
          />
        ))}
      </ul>
    )
  }

  renderLanguages = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="language-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageFilterDetails={eachLanguage}
            key={eachLanguage.id}
            updateActiveFilter={this.updateActiveFilter}
            isActive={activeFilterId === eachLanguage.id}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p className="failure-message">Something Went Wrong</p>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderRepositories()
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-repos-bg-container">
        <div className="responsive-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguages()}
          {this.renderApiStatus()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
