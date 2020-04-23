import React, { useState, useEffect } from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Pagination from './Pagination'

class coursePagination extends React.Component {

  constructor() {
    super()
    this.state = {
      courses: [],
      loading: false,
      currentPage: 1,
      coursesPerPage: 2,
      query: ''
    }
  }

  componentDidMount() {
    axios.get('/api/golfcourses/courses', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ courses: res.data, loading: false })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }


  render() {
    console.log(this.state.courses)


    const loading = this.state.loading

    const indexOfLastCourse = this.state.currentPage * this.state.coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - this.state.coursesPerPage
    const currentPost = this.state.courses.slice(indexOfFirstCourse, indexOfLastCourse)


    const courses = currentPost
    // const setCurrentPage = this.state.currentPage

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber })

    if (loading) {
      return <h2>Loading...</h2>
    }
    return (
      <div className='container'>
        <h1>My App</h1>
        {courses.map((course, index) => {
          return <h1 key={index}>{course.name}</h1>
        })}
        <Pagination
          coursesPerPage={this.state.coursesPerPage}
          totalCourses={this.state.courses.length}
          paginate={paginate}
        />
      </div>
    )
  }
}


export default coursePagination