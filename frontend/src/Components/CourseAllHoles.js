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

    const course = this.state.holes[0].course
    console.log(course)

    console.log(this.state)
    return <main className="MainCourseAllHolesContainer">
      <div className="MainCourseAllHolesContainer">
        <h1 className="NameandRankingTitle">{course.name}/<span className="RankingTitle">{course.ranking}</span></h1>
      </div>
      <div className="mainCourseAllHolesPageImageandUsefulInfo">
        <figure className="mainCourseAllHolesFigureImage">
          <img src={course.hero_image} className="mainCourseAllHolesImage" alt="" />
        </figure>
        <div className="UserAddsCourseandInfoContainer">
          <div className="mainCourseAllHolesUsefulInfo">
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Address:</span> {course.address.address_line_1},{course.address.address_line_2},{course.address.town},{course.address.county}, {course.address.postcode}</p>
            <p className="CourseUsefulInfo">📞{course.phone_number}</p>
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Website Link:</span> {course.website_link}</p>
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Email Address:</span> {course.email_address}</p>
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Contact Name:</span> {course.contact_name}</p>
          </div>
        </div>
      </div>

      <div className="CourseAllHolesHoles">
        <div className="AllHolesContainer">
          <Link to={`../${course.id}/holes`}><h1 className="AllHoles">All Holes</h1></Link>
        </div>
        <div className="CourseAllHolesSingularHoles">
          {this.state.holes.map((hole, index) => {
            return <Link to={`../${course.id}/holes/${hole.id}`} key={index}><p className="CourseAllHolesSingularHole">{hole.number}</p></Link>
          })}
        </div>
      </div>

      <div className="CourseAllHolesContainer">
        <h1 className="CourseAllHolesOutTitle">OUT</h1>
        <div className="CourseAllHolesOutContainer">
          {this.state.holes.slice(0, 9).map((hole, index) => {
            if (hole.hole_graph === '') {
              return <div className="CourseOutHoles" key={index}>
                <div className="CourseOutHolesInfo">
                  <Link to={`../${course.id}/holes/${hole.id}`}><h1 className="CourseOutHolesNumber">{hole.number}.</h1></Link>
                  <div className="CourseOutHolesInfoStats">
                    <p>Par {hole.Mens_Par}/{hole.Ladies_Par}</p>
                    <p>{hole.holes[0].length}yds</p>
                    <p>SI {hole.Mens_SI}/{hole.Ladies_SI}</p>
                  </div>
                </div>
                <div className="CourseOutHolesNoGraph">
                  <figure className="CourseOutHolesNoGraphFig">
                    <img src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6"  className="CourseOutHolesNoGraphImg"alt=""/>
                  </figure>
                </div>
              </div>
            } else {
              return <div className="CourseOutHolesWithTheGraph" key={index}>
                <div className="CourseOutHolesInfo">
                  <Link to={`../${course.id}/holes/${hole.id}`}><h1 className="CourseOutHolesNumber">{hole.number}.</h1></Link>
                  <div className="CourseOutHolesInfoStats">
                    <p>Par {hole.Mens_Par}/{hole.Ladies_Par}</p>
                    <p>{hole.holes[0].length}yds</p>
                    <p>SI {hole.Mens_SI}/{hole.Ladies_SI}</p>
                  </div>
                </div>
                <div className="CourseOutHolesWithGraph">
                  <figure className="CourseOutHolesWithGraphFig">
                    <img src={hole.hole_graph} className="CourseOutHolesWithGraphImg"alt=""/>
                  </figure>
                </div>
              </div>
            }
          })}
        </div>

        <h1 className="CourseAllHolesInTitle">IN</h1>
        <div className="CourseAllHolesInContainer">
          {this.state.holes.slice(9, 19).map((hole, index) => {
            if (hole.hole_graph === '') {
              return <div className="CourseInHoles" key={index}>
                <div className="CourseInHolesInfo">
                  <Link to={`../${course.id}/holes/${hole.id}`}><h1 className="CourseInHolesNumber">{hole.number}.</h1></Link>
                  <div className="CourseInHolesInfoStats">
                    <p>Par {hole.Mens_Par}/{hole.Ladies_Par}</p>
                    <p>{hole.holes[0].length}yds</p>
                    <p>SI {hole.Mens_SI}/{hole.Ladies_SI}</p>
                  </div>
                </div> 
                <div className="CourseInHolesNoGraph">
                  <figure className="CourseInHolesNoGraphFig">
                    <img src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6"  className="CourseInHolesNoGraphImg"alt=""/>
                  </figure>
                </div>             
              </div>
            } else {
              return <div className="CourseInHolesWithTheGraph" key={index}>
                <div className="CourseInHolesInfo">
                  <Link to={`../${course.id}/holes/${hole.id}`}><h1 className="CourseInHolesNumber">{hole.number}.</h1></Link>
                  <div className="CourseInHolesInfoStats">
                    <p>Par {hole.Mens_Par}/{hole.Ladies_Par}</p>
                    <p>{hole.holes[0].length}yds</p>
                    <p>SI {hole.Mens_SI}/{hole.Ladies_SI}</p>
                  </div>
                </div>
                <div className="CourseInHolesWithGraph">
                  <figure className="CourseInHolesWithGraphFig">
                    <img src={hole.hole_graph} className="CourseInHolesWithGraphImg"alt=""/>
                  </figure>
                </div>
              </div>
            }
          })}
        </div>
      </div>
    </main>

  }
}

export default CourseAllHoles