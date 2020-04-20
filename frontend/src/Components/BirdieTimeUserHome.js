import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'

class BirdieTimeUserHome extends React.Component {

  constructor() {
    super()
    this.state = {
      courses: null,
      filteredcourses: null,
      userscoursesplayed: null,
      userscourseswishlist: null
    }
  }

  componentDidMount() {
    axios.get('/api/golfcourses/courses', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ courses: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.courses) return <h1>WAITING FOR COURSES</h1>

    return <div>
      {this.state.courses.map((course, index) => {
        return <div className="course" key={index}>
          <Link to={`../course/${course.id}`} ><h1>{course.name}</h1></Link>
          <img src={course.hero_image} alt=""/>
        </div>
      })}
    </div>
  }
}

export default BirdieTimeUserHome