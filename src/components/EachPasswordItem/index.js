import './index.css'

const EachPasswordItem = props => {
  const {details, checkBoxStatus, onDeleteItem} = props
  const {id, username, password, website} = details
  const onDeleteList = () => {
    onDeleteItem(id)
  }

  return (
    <li className="list">
      <div className="profile-cont">
        <p className="pro">{username[0]}</p>
      </div>
      <div className="details-cont">
        <h1 className="website">{website}</h1>
        <p className="username">{username}</p>
        {checkBoxStatus ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button type="button" className="delete-button" onClick={onDeleteList}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default EachPasswordItem
