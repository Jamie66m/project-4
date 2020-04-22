import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import CourseComments from './CourseComments'
import AddCoursePlayedForm from './AddCoursePlayedForm'

class CourseDetailedPage extends React.Component {

  constructor() {
    super()
    this.state = {
      course: null,
      user: null,
      data: {
        rating: Number,
        score: Number,
        time: '',
        course: []
      },
      errors: {}
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

    axios.get('/api/profile/', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ user: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value, course: [this.state.course.id] }
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    const course = this.state.course
    document.querySelector('.AddCoursePlayedFormContainer').style.display = 'none'
    document.querySelector('.AddCoursePlayedForm').style.display = 'none'
    axios.post('/api/profile/coursesplayed', this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(alert(`Congrats on playing ${course.name}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  addWishlist(event) {
    event.preventDefault()
    const course = this.state.course
    axios.post('/api/profile/courseswishlist', { course: [this.state.course.id] }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(alert(`You have added the ${course.name} to your wishlist`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  addFavourites(event) {
    event.preventDefault()
    const course = this.state.course
    axios.post('/api/profile/coursesfavourites', { course: [this.state.course.id] }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(alert(`You have added the ${course.name} to your favourites`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  addHomeCourse(event) {
    event.preventDefault()
    const course = this.state.course
    axios.post('/api/profile/userhomecourse', { course: this.state.course.id }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(alert(`You have added the ${course.name} as your home course`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  showAddCoursePlayedForm() {
    document.querySelector('.AddCoursePlayedFormContainer').style.display = 'block'
    document.querySelector('.AddCoursePlayedForm').style.display = 'block'
  }

  render() {
    if (!this.state.course) return <h1>WAITING FOR COURSE</h1>

    console.log(this.state.user)

    const course = this.state.course
    const courseholes = this.state.course.coursesholes
    const courseimage = this.state.course.coursesimages

    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return <main className="mainCourseDetailedPage">
      <div className="mainCourseDetailedPageTitleandRating">
        <h1 className="NameandRankingTitle">{course.name}/<span className="RankingTitle">{course.ranking}</span></h1>
      </div>
      <div className="mainCourseDetailedPageImageandUsefulInfo">
        <figure className="mainCourseDetailedPageFigureImage">
          <img src={course.hero_image} className="mainCourseDetailedPageImage" alt="" />
        </figure>
        <div className="UserAddsCourseandInfoContainer">
          <div className="mainCourseDetailedPageUsefulInfo">
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Address:</span> {course.address.address_line_1},{course.address.address_line_2},{course.address.town},{course.address.county}, {course.address.postcode}</p>
            <p className="CourseUsefulInfo">📞{course.phone_number}</p>
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Website Link:</span> {course.website_link}</p>
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Email Address:</span> {course.email_address}</p>
            <p className="CourseUsefulInfo"><span className="UsefulInfoTitle">Contact Name:</span> {course.contact_name}</p>
          </div>
          <div className="UserAddsCourse">
            <button className="UserAddsCourseButton" onClick={() => this.showAddCoursePlayedForm()}>+Add to courses played</button>
            <button className="UserAddsCourseButton" onClick={() => this.addWishlist(event)}>+Add to course wishlist</button>
            <button className="UserAddsCourseButton" onClick={() => this.addFavourites(event)}>+Add to course favourites</button>
            <button className="UserAddsCourseButton" onClick={() => this.addHomeCourse(event)}>Make Home Course</button>
          </div>
        </div>
      </div>
      <div className="AddCoursePlayedFormContainer">
        <div className="AddCoursePlayedForm">
          <AddCoursePlayedForm
            handleSubmit={(event) => this.handleSubmit(event)}
            handleChange={(event) => this.handleChange(event)}
            errors={this.state.errors}
            data={this.state.data}
            courseId={this.state.course.id}
          />
        </div>
      </div>
      <div className="CourseDetailedPageHoles">
        <div className="AllHolesContainer">
          <Link to={`../course/${course.id}/holes`}><h1 className="AllHoles">All Holes</h1></Link>
        </div>
        <div className="CourseDetailedPageSingularHoles">
          {courseholes.map((coursehole, index) => {
            return <Link to={`../course/${course.id}/holes/${coursehole.id}`} key={index}><p className="CourseDetailedPageSingularHole">{coursehole.number}</p></Link>
          })}
        </div>
      </div>
      <div className="CourseDetailedPageInfoContainer">
        <div className="CourseDetailedPageInfoStats">
          <div className="CourseDetailedPageInfoTheStats">
            <div className="StatTitle">
              <p className="StatInfoTitle">Nation</p>
            </div>
            <div className="StatAnswer">
              <p>{course.country}</p>
            </div>
          </div>
          <div className="CourseDetailedPageInfoTheStats">
            <div className="StatTitle">
              <p className="StatInfoTitle">Year Built</p>
            </div>
            <div className="StatAnswer">
              <p>{course.year_built}</p>
            </div>
          </div>
          <div className="CourseDetailedPageInfoTheStats">
            <div className="StatTitle">
              <p className="StatInfoTitle">Green Fees</p>
            </div>
            <div className="StatAnswer">
              <p>{course.green_fees}</p>
            </div>
          </div>
          <div className="CourseDetailedPageInfoTheStats">
            <div className="StatTitle">
              <p className="StatInfoTitle">Ranking</p>
            </div>
            <div className="StatAnswer">
              <p>{course.ranking}</p>
            </div>
          </div>
          <div className="CourseDetailedPageInfoTheStats">
            <div className="StatTitle">
              <p className="StatInfoTitle">Number Of Holes</p>
            </div>
            <div className="StatAnswer">
              <p>{course.number_of_holes}</p>
            </div>
          </div>
          <div className="CourseDetailedPageInfoTheStats">
            <div className="StatTitle">
              <p className="StatInfoTitle">Course Type</p>
            </div>
            <div className="StatAnswer">
              <p>{course.course_type}</p>
            </div>
          </div>
        </div>
        <div className="CourseDetailedPageInfoDescription">
          <div className="TheCourseDescription">
            {/* // eslint-disable-next-line react/no-unescaped-entities */}
            <p className="TheCourseDescriptionDetail">"{course.description}"</p>
          </div>
        </div>
      </div>
      <div className="CourseDetailedPageBigImageContainer">
        <figure className="CourseDetailedPageBigImage">
          {/* {coursesimage.filter((courseimage, index) => { */}
          <img src={courseimage[0].image} className="CourseDetailedPageTheBigImage" alt="" />
        </figure>
      </div>
      <div className="GalleryandCommentsContainer">
        <div className="CourseDetailedPageMediaGallery">
          <h1 className="CourseMediaGalleryTitle">Course Media Gallery</h1>
          <div className="CourseDetailedPageVideo">
            <iframe src={course.video_highlight_link} className="CourseDetailedPageTheVideo"></iframe>
          </div>
          <div className="CourseDetailedPagePhotos">
            <Slider {...settings}>
              {courseimage.map((courseimage, index) => {
                return <figure key={index} className="CourseDetailedPageThePhotos">
                  {/* <h3>{book.title}</h3> */}
                  <img
                    src={courseimage.image}
                    className="CarouselImg"
                  />
                </figure>
              })}
            </Slider>

          </div>
        </div>
        <div className="CommentsandPlayerReviewsContainer">
          <div className="Comments">
            <CourseComments course={this.state.course} user={this.state.user} />
          </div>
          <div className="PlayerReviews">
            <div>
              <h1 className="PlayerReviewsTitle">Pro Reviews</h1>
            </div>
            <div className="PlayerReviewsContainer">
              <div className="PlayerReview1">
                <figure className="PlayerReview1Fig">
                  <img src={course.pro_golfer_img_1} className="PlayerReview1Img" alt="" />
                </figure>
                <div className="PlayerReview1Info">
                  <p>
                    {course.pro_golfer_1_review}
                  </p>
                </div>
              </div>
              <div className="PlayerReview2">
                <figure className="PlayerReview2Fig">
                  <img src={course.pro_golfer_img_2} className="PlayerReview2Img" alt="" />
                </figure>
                <div className="PlayerReview2Info">
                  <p>
                    {course.pro_golfer_2_review}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  }
}

export default CourseDetailedPage