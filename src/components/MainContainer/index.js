import {Component} from 'react-dom'
import {v4 as uuidv4} from 'uuid'
import EachPasswordItem from '../EachPasswordItem'
import './index.css'

class MainContainer extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    PasswordList: [],
    searchInput: '',
    checkBoxStatus: false,
    count: 0,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickAdd = () => {
    const {website, username, password} = this.state

    const newWithPass = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      website: '',
      username: '',
      password: '',
      count: prevState.count + 1,
      PasswordList: [...prevState.PasswordList, newWithPass],
    }))
  }

  onChangeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onDeleteItem = id => {
    const {PasswordList} = this.state
    const afterDeleteWithList = PasswordList.filter(each => each.id !== id)

    this.setState(prevState => ({
      count: prevState.count - 1,
      PasswordList: afterDeleteWithList,
    }))
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({checkBoxStatus: !prevState.checkBoxStatus}))
  }

  renderPasswordList = () => {
    const {checkBoxStatus, PasswordList} = this.state

    return (
      <ul className="password-list-cont">
        {PasswordList.map(each => (
          <EachPasswordItem
            details={each}
            key={each.id}
            onDeleteItem={this.onDeleteItem}
            checkBoxStatus={checkBoxStatus}
          />
        ))}
      </ul>
    )
  }

  renderNoPasswordList = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
      alt="no passwords"
      className="no-password"
    />
  )

  render() {
    const {
      website,
      username,
      password,
      count,
      searchInput,
      PasswordList,
    } = this.state
    const searchResults = PasswordList.filter(each =>
      each.website.includes(searchInput),
    )
    const searchresultslength = searchResults.length()
    return (
      <div className="sub-containers">
        <div className="top-container">
          <div className="entry-container">
            <h1 className="entry-cont-head">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-logo"
                alt="website"
              />
              <input
                type="text"
                value={website}
                onChange={this.onChangeWebsite}
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-logo"
                alt="username"
              />
              <input
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-logo"
                alt="password"
              />
              <input
                type="text"
                value={password}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
              <button
                className="add-button"
                type="button"
                onClick={this.onClickAdd}
              >
                Add
              </button>
            </div>
          </div>
          <div className="password-manager" />
        </div>
        <div className="bottom-container">
          <div className="bottom-head-cont">
            <h1 className="bottom-main-head">
              Your Password <span className="span">{count}</span>
            </h1>
            <div className="search-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input type="search" onChange={this.onChangeSearch} />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="password-checkbox-cont">
            <input
              type="checkbox"
              id="checkboxId"
              onClick={this.onClickCheckBox}
            />
            <label htmlFor="checkboxId" className="checkBox-label">
              Show Passwords
            </label>
          </div>
          {searchresultslength > 0
            ? this.renderPasswordList()
            : this.renderNoPasswordList()}
        </div>
      </div>
    )
  }
}

export default MainContainer
