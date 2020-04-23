import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import AllCoursesCard from './AllCoursesCard'
import Pagination from './Pagination'

class BirdieTimeUserHome extends React.Component {

  constructor() {
    super()
    this.state = {
      courses: [],
      filteredCourses: [],
      loading: false,
      currentPage: 1,
      coursesPerPage: 4,
      userscoursesplayed: [],
      userscoursefavourites: [],
      query: ''
    }
  }

  componentDidMount() {
    axios.get('/api/golfcourses/courses', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ courses: res.data, filteredCourses: res.data, loading: false })
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

    const loading = this.state.loading

    const indexOfLastCourse = this.state.currentPage * this.state.coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - this.state.coursesPerPage
    const currentCourse = this.state.filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)


    const courses = currentCourse
    // const setCurrentPage = this.state.currentPage

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber })

    if (loading) {
      return <h2>Loading...</h2>
    }
    return <main className="mainUserHome">
      <section className="mainUserHomeCoursesContainer">
        <div className="MediaGalleryandCoursesContainer">
          <section className="coursesMediaGallery">
            <h1 className="HomeMediaGalleryTitle">MEDIA GALLERY</h1>
            {this.state.courses.map((course, index) => {
              return <div className="courseVideoHiglight" key={index}>
                <iframe src={course.video_highlight_link}></iframe>
              </div>
            })}
          </section>
          <section className="showAllTheCoursesContainer">
            <div className="showAllTheCourses">
              {courses.map((course, index) => {

                return <AllCoursesCard key={index} course={course} />
                // return <div className="course" key={index}>
                //   <Link to={`../course/${course.id}`}><h1>{course.name}</h1></Link>
                //   <img src={course.hero_image} alt="" />
                // </div>
              })}
            </div>
            <div className="PaginationContainer">
              <Pagination
                coursesPerPage={this.state.coursesPerPage}
                totalCourses={this.state.courses.length}
                paginate={paginate}
              />
            </div>
          </section>
        </div>
      </section>
      <section className="UserStatsContainer">
        <div className="UserCoursePlayedStats">
          <h1 className="UserCoursePlayedTitle">MOST RECENT USER COURSES PLAYED</h1>
          {this.state.userscoursesplayed.slice(0, 4).map((courseplayed, index) => {
            return <div key={index} className="UserCoursePlayedInfo">
              <p><strong>Username:</strong> {courseplayed.user.username}</p>
              <p><strong>Course:</strong> {courseplayed.course[0].name}</p>
              <p><strong>Round Score:</strong> {courseplayed.score}</p>
            </div>
          })}
        </div>
        <div className="UserCourseWishListStats">
          <h1 className="UserWishListTitle">MOST RECENT COURSES ADDED TO USERS FAVOURITES</h1>
          {this.state.userscoursefavourites.slice(0, 4).map((coursefavourites, index) => {
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