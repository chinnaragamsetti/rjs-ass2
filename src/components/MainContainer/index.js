import {Component} from 'react'
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

  onClickAdd = event => {
    event.preventDefault()
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

  renderPasswordList = searchResults => {
    const {checkBoxStatus} = this.state
    return (
      <ul className="password-list-cont">
        {searchResults.map(each => (
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
    <div className="no-password-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password"
      />
      <p className="no-pass">No Passwords</p>
    </div>
  )

  render() {
    const {website, username, password, searchInput, PasswordList} = this.state

    const searchResults = PasswordList.filter(each =>
      each.website.includes(searchInput),
    )
    const searchresultslength = searchResults.length
    return (
      <div className="sub-containers">
        <div className="top-container">
          <form className="entry-container" onSubmit={this.onClickAdd}>
            <h1 className="entry-cont-head">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-logo"
                alt="website"
              />
              <hr className="top-hrline" />
              <input
                type="text"
                className="input"
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
              <hr className="top-hrline" />

              <input
                type="text"
                className="input"
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
              <hr className="top-hrline" />

              <input
                type="password"
                value={password}
                className="input"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="add-button" type="submit" data-testid="delete">
              Add
            </button>
          </form>
          <div className="password-manager-cont">
            <img
              className="password-manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-head-cont">
            <div className="password-list-count-cont">
              <h1 className="bottom-main-head">Your Passwords</h1>
              <p className="span">{searchresultslength}</p>
            </div>

            <div className="search-cont">
              <div className="search-icon-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>

              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearch}
              />
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
            ? this.renderPasswordList(searchResults)
            : this.renderNoPasswordList()}
        </div>
      </div>
    )
  }
}

export default MainContainer
