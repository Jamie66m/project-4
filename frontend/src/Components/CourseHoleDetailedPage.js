import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'

class CourseHoleDetailedPage extends React.Component {

  constructor() {
    super()
    this.state = {
      hole: null
    }
  }

  componentDidMount() {
    const courseId = this.props.match.params.id
    const holeId = this.props.match.params.id
    console.log(this.props)
    axios.get(`/api/golfcourses/courses/${courseId}/holes/${holeId}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ hole: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.hole) return <h1>WAITING FOR HOLE</h1>
    console.log(this.state.hole)
    const hole = this.state.hole
    return <div>
      <h1>{hole.number}</h1>
      <img src={hole.hole_graph} alt=""/>
    </div>
  }
}

export default CourseHoleDetailedPage