import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      users: null,
      userHomeCourse: null,
      userGolfBag: null
    }
  }

  componentDidMount() {
    // const userId = this.props.match.params.id
    console.log(this.state)
    axios.get('/api/profiles')
      .then(res => {
        console.log(res.data)
        this.setState({ users: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.user) return <h1>WAITING FOR USER</h1>
    console.log(this.state.user)
    return <div>
      {this.state.users.map((user, index) => {

        <h1 key={index}>{user.firstname}</h1>

      })}
    </div>
  }
}

export default UserProfile