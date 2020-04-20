import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'

class CourseDetailedPage extends React.Component {

  constructor() {
    super()
    this.state = {
      course: null,
      user: null
    }
  }

  componentDidMount() {
    const courseId = this.props.match.params.id
    console.log()
    axios.get(`/api/golfcourses/courses/${courseId}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ course: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.course) return <h1>WAITING FOR COURSE</h1>

    const course = this.state.course

    return <div>
      <h1>{course.name}</h1>
      <Link to={`../course/${course.id}/holes`} course={course}><h1>AllHoles</h1></Link>
    </div>
  }
}

export default CourseDetailedPage