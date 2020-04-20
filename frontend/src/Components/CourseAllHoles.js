import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'

class CourseAllHoles extends React.Component {

  constructor() {
    super()
    this.state = {
      holes: null
    }
  }

  componentDidMount() {
    const courseId = this.props.match.params.id
    console.log(this.props)
    axios.get(`/api/golfcourses/courses/${courseId}/holes`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ holes: res.data })
      })
    // .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.holes) return <h1>WAITING FOR HOLES</h1>

    console.log(this.state)
  
    return <div>
      {this.state.holes.map((hole, index) => {
        if (hole.hole_graph === '') {
          return <div className="course" key={index}>
            <Link to={`../course/${hole.course.id}/holes/${hole.id}`}><h1>{hole.number}</h1></Link>
          </div>
        } else {
          return <div className="course" key={index}>
            <Link to={`../course/${hole.course.id}/holes/${hole.id}`}><h1>{hole.number}</h1></Link>
            <img src={hole.hole_graph} alt=""/>
          </div>
        }
      })}
    </div>

  }
}

export default CourseAllHoles