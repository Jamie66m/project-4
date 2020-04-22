import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      userHomeCourse: null,
      userGolfBag: null
    }
  }

  componentDidMount() {
    // const userId = this.props.match.params.id
    console.log(this.state)
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ user: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.user) return <h1>WAITING FOR USER</h1>
    console.log(this.state.user)

    const user = this.state.user
    // const coursesplayed = this.state.user.usercourseplayed
    return <div>
      <h1>{user.username}</h1>
      {/* {coursesplayed.map((courseplayed, index) => {
        return <h1 key={index}>{courseplayed.</h1>
      })} */}
    </div>
  }
}

export default UserProfile