import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../lib/auth'
import { withRouter } from 'react-router-dom'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  handleLogout() {
    auth.logout()
    this.props.history.push('/')
  }

  render() {
    const isLoggedIn = auth.isLoggedIn()
    return <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item" id="BirdieTimeTitle">Birdie Time</h1>

        <a role="button"
          className={`navbar-burger burger ${this.state.navMobileOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => this.setState({ navMobileOpen: !this.state.navMobileOpen })}
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>


      <div className={`navbar-menu ${this.state.navMobileOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {isLoggedIn && <a className="navbar-item">
            <Link to="/birdie_time_user_home">Home</Link>
          </a>}
          {!isLoggedIn && <a className="navbar-item">
            <Link to="/">Home</Link>
          </a>}
          <a className="navbar-item">
            <Link to="/map">Map of Courses</Link>
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isLoggedIn && <div className="button is-primary"><Link to="/register"><strong>Register</strong></Link></div>}
              {!isLoggedIn && <div className="button is-light"><Link to="/login">Log in</Link></div>}
              {isLoggedIn && <div className="button is-warning"><Link to="/profile">Profile</Link></div>}
              {isLoggedIn && <div
                onClick={() => this.handleLogout()}
                className="button is-light"
              >
                Logout
              </div>}
            </div>
          </div>
        </div>

      </div>
    </nav>
  }

}

export default withRouter(Navbar)