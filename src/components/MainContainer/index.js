import {Component} from 'react-dom'
import {v4 as uuidv4} from 'uuid'
import EachPasswordItem from '../EachPasswordItem'
import './index.css'

class MainContainer extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    withPasswordList: [],
    withOutPasswordList: [],
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
      password:
        'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png',
    }
    const newWithOutPass = {
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
      withPassWordList: [...prevState.withPassWordList, newWithPass],
      withOutPasswordList: [...prevState.withOutPasswordList, newWithOutPass],
    }))
  }

  onChangeSearch = event => {
    const {withOutPasswordList, withPassWordList, searchInput} = this.state
    const afterSearchListWith = withPassWordList.filter(each =>
      each.website.includes(event.target.value),
    )

    const afterSearchListWithOut = withOutPasswordList.filter(each =>
      each.website.includes(event.target.value),
    )

    this.setState({
      searchInput: event.target.value,
      withOutPassWordList: afterSearchListWithOut,
      withPassWordList: afterSearchListWith,
    })
  }

  onDeleteItem = id => {
    const {withPassWordList, withOutPasswordList} = this.state
    const afterDeleteWithList = withPassWordList.filter(each => each.id !== id)
    const afterDeleteWithOutList = withOutPassWordList.filter(
      each => each.id !== id,
    )
    this.setState(prevState => ({
      count: prevState.count - 1,
      withPasswordList: afterDeleteWithList,
      withOutPasswordList: afterDeleteWithOutList,
    }))
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({checkBoxStatus: !prevState.checkBoxStatus}))
  }

  renderPasswordList = () => {
    const {checkBoxStatus, withOutPasswordList, withPasswordList} = this.state

    return (
      <ul className="password-list-cont">
        {checkBoxStatus
          ? withOutPasswordList
          : withPasswordList.map(each => (
              <EachPasswordItem
                details={each}
                key={each.id}
                onDeleteItem={this.onDeleteItem}
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
      withPasswordList,
      withOutPasswordList,
      checkBoxStatus,
      count,
    } = this.state
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
            <label htmlFor="checkboxId">Show Passwords</label>
          </div>
          {count > 0 ? this.renderPasswordList() : this.renderNoPasswordList()}
        </div>
      </div>
    )
  }
}

export default MainContainer
