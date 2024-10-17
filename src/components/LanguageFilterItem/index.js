// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, updateActiveFilter, isActive} = props
  const {language, id} = languageFilterDetails

  const onClickLanguage = () => {
    updateActiveFilter(id)
  }

  const activeLanguageClass = isActive ? 'active-language' : ''
  const activeButtonClass = isActive ? 'active-btn' : ''

  return (
    <li className={`language-item ${activeLanguageClass}`}>
      <button
        type="button"
        className={`language-button ${activeButtonClass}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
