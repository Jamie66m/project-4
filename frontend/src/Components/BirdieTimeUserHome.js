import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
import SearchFormBirdieUserHome from './SearchForm'
import AllCoursesCard from './AllCoursesCard'

class BirdieTimeUserHome extends React.Component {

  constructor() {
    super()
    this.state = {
      courses: [],
      filteredCourses: [],
      userscoursesplayed: [],
      userscoursefavourites: [],
      query: ''
    }
  }

  componentDidMount() {
    axios.get('/api/golfcourses/courses', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ courses: res.data, filteredCourses: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))

    axios.get('/api/allcoursesplayed', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ userscoursesplayed: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))

    axios.get('/api/allcoursefavourites', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ userscoursefavourites: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  handleSearch(event) {

    const searchQuery = event.target.value
    const filteredCourses = this.state.courses.filter(course => {
      const regex = new RegExp(searchQuery, 'i')
      return course.name.match(regex)
    })
    this.setState({ query: searchQuery, filteredCourses: filteredCourses })
  }

  CountryFilter(event) {
    const nation = event.target.innerHTML
    console.log(nation)
    const courses = this.state.courses
    console.log(courses)
    const filterCourses = courses
      .filter(course => {
        if (nation === 'All') {
          return course
        } else {
          return course.country === nation
        }
      })
    this.setState({ filteredCourses: filterCourses })
  }

  CourseTypeFilter(event) {
    const coursetype = event.target.innerHTML
    console.log(coursetype)
    const courses = this.state.courses
    console.log(courses)
    const filterCourseType = courses
      .filter(course => {
        if (coursetype === 'All') {
          return course
        } else {
          return course.course_type === coursetype
        }
      })
    this.setState({ filteredCourses: filterCourseType })
  }


  render() {
    if (!this.state.courses) return <h1>WAITING FOR COURSES</h1>

    return <main className="mainUserHome">
      <section className="mainUserHomeCoursesContainer">
        <div className="mainUserHomeCoursesHeader">
          <div className="DropDownsContainer">
            <div className="mainUserHomeCoursesDropDown1">
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Filter By Nation</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content" onClick={() => this.CountryFilter(event)} >
                    <a className="dropdown-item">
                      All
                    </a>
                    <a value='Northern Ireland' className="dropdown-item">
                      Northern Ireland
                    </a>
                    <a className="dropdown-item">
                      Scotland
                    </a>
                    <a className="dropdown-item">
                      England
                    </a>
                    <a className="dropdown-item">
                      Wales
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mainUserHomeCoursesDropDown2">
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Filter By Course Type</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content" onClick={() => this.CourseTypeFilter(event)}>
                    <a className="dropdown-item">
                      All
                    </a>
                    <a className="dropdown-item">
                      Links
                    </a>
                    <a className="dropdown-item">
                      Parkland
                    </a>
                    <a className="dropdown-item">
                      Downland
                    </a>
                    <a className="dropdown-item">
                      Heathland
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainUserHomeCoursesHeaderSearchBar">
            <SearchFormBirdieUserHome
              query={this.state.query}
              onChange={() => this.handleSearch(event)}
            />
          </div>
        </div>
        <div className="MediaGalleryandCoursesContainer">
          <section className="coursesMediaGallery">
            <h1 className="HomeMediaGalleryTitle">MEDIA GALLERY</h1>
            {this.state.courses.map((course, index) => {
              return <div className="courseVideoHiglight" key={index}>
                <iframe src={course.video_highlight_link}></iframe>
              </div>
            })}
          </section>
          <section className="showAllTheCourses">
            {this.state.filteredCourses.reverse().map((course, index) => {

              return <AllCoursesCard key={index} course={course} />
              // return <div className="course" key={index}>
              //   <Link to={`../course/${course.id}`}><h1>{course.name}</h1></Link>
              //   <img src={course.hero_image} alt="" />
              // </div>
            })}
          </section>
        </div>
      </section>
      <section className="UserStatsContainer">
        <div className="UserCoursePlayedStats">
          <h1 className="UserCoursePlayedTitle">MOST RECENT USER COURSES PLAYED</h1>
          {this.state.userscoursesplayed.slice(0, 10).map((courseplayed, index) => {
            return <div key={index} className="UserCoursePlayedInfo">
              <p><strong>Username:</strong> {courseplayed.user.username}</p>
              <p><strong>Course:</strong> {courseplayed.course[0].name}</p>
              <p><strong>Round Score:</strong> {courseplayed.score}</p>
            </div>
          })}
        </div>
        <div className="UserCourseWishListStats">
          <h1 className="UserWishListTitle">MOST RECENT COURSES ADDED TO USERS FAVOURITES</h1>
          {this.state.userscoursefavourites.slice(0, 10).map((coursefavourites, index) => {
            return <div key={index} className="UserWishListInfo">
              <p><strong>Username:</strong> {coursefavourites.user.username}</p>
              <p><strong>Course:</strong> {coursefavourites.course[0].name}</p>
            </div>
          })}
        </div>
      </section>
    </main>
  }
}

export default BirdieTimeUserHome