/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import UserGolfBagForm from './UserGofBagForm'

class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      userHomeCourse: null,
      data: {
        putter: '',
        sw: '',
        pw: '',
        gw: '',
        lw: '',
        ulw: '',
        irons: '',
        woods: '',
        driver: ''
      },

      errors: {}

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
    // .catch(err => this.setState({ error: err.response.data.message }))
  }

  handleGolfBag(event) {
    event.preventDefault()
    axios.post('/api/profile/golfbag', this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(alert('You have added a new golf bag'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
    location.reload()
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  showCoursesPlayed() {
    document.querySelector('.UserCoursesPlayed').style.display = 'block'
    document.querySelector('.UserCourseWishlist').style.display = 'none'
    document.querySelector('.UserCourseFavourites').style.display = 'none'
    // document.querySelector('.AddCoursePlayedForm').style.display = 'block'
  }
  showCourseWishList() {
    document.querySelector('.UserCourseWishlist').style.display = 'block'
    document.querySelector('.UserCoursesPlayed').style.display = 'none'
    document.querySelector('.UserCourseFavourites').style.display = 'none'
    // document.querySelector('.AddCoursePlayedForm').style.display = 'block'
  }
  showCourseFavourites() {
    document.querySelector('.UserCourseFavourites').style.display = 'block'
    document.querySelector('.UserCoursesPlayed').style.display = 'none'
    document.querySelector('.UserCourseWishlist').style.display = 'none'
    // document.querySelector('.AddCoursePlayedForm').style.display = 'block'
  }

  showNoCourses() {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        document.querySelector('.UserCoursesPlayed').style.display = 'none'
        document.querySelector('.UserCourseWishlist').style.display = 'none'
        document.querySelector('.UserCourseFavourites').style.display = 'none'
        this.setState({ user: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }


  // handleImageChange(e) {
  //   this.setState({
  //     profileImage: e.target.files[0]
  //   })
  // }

  // handleImageSubmit(event) {
  //   event.preventDefault()
  //   console.log(this.state)
  //   const form_data = new FormData()
  //   form_data.append('profileimage', this.state.profileimage)
  //   axios.post('/api/profile/userhomecourse', { course: this.state.course.id }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

  //   axios.post(url, form_data, {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err))
  // }

  render() {
    if (!this.state.user) return <h1>WAITING FOR USER</h1>
    console.log(this.state.user)

    const user = this.state.user
    const userCourseHome = this.state.user.usercourseplayed[0]
    const userCoursesPlayed = this.state.user.usercourseplayed
    const userCourseWishlist = this.state.user.usercoursewishlist
    const userCourseFavourites = this.state.user.usercoursefavourites
    const golfbag = this.state.user.usergolfbag[0]

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    }

    return <main className="mainUserProfile">
      <div className="UserProfileHomeCourseImgContainer">
        <div className="UserProfileHomeCourseImg">
          <figure className="UserProfileHomeCourseFig">
            {userCourseHome && <img src={userCourseHome.hero_image} className="TheUserProfileHomeCourseFig" alt="" />}
          </figure>
        </div>
      </div>
      <div className="UserProfileInfoContainer">
        <div className="UserInfo">
          <h1 className="YourInfoTitle">Your Info</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="UserProfileButtons">
          <button className="button is-dark" onClick={() => this.showCoursesPlayed()}>See Courses Played</button>
          <button className="button is-dark" onClick={() => this.showCourseWishList()}>See Course WishList</button>
          <button className="button is-dark" onClick={() => this.showCourseFavourites()}>See Course Favourites</button>
          <button className="button is-danger" onClick={() => this.showNoCourses()}>Remove courses</button>
        </div>
      </div>

      <div className="UserCoursesPlayed">
        <h2>YOU HAVE PLAYED THESE COURSES</h2>
        <Slider {...settings}>
          {userCoursesPlayed.map((courseplayed, index) => {
            if (!courseplayed.course[0].hero_image) {
              return <div key={index} className="CoursesPlayedImgandStats">
                {/* <figure className="">
                
                  {courseplayed.course[0].hero_image && <img src={courseplayed.course[0].hero_image} className="UserCoursesPlayedImg" />}
                </figure> */}
                <h1 className="NoUserCoursesPlayedImg">NO HOME COURSE SELECTED TO SHOW IMAGE</h1>
                {courseplayed.course[0].name && <h1><strong>{courseplayed.course[0].name}</strong></h1>}
                {courseplayed.rating && <p>Rating: {courseplayed.rating}</p>}
                {courseplayed.score && <p>Score: {courseplayed.score}</p>}
                {courseplayed.time && <p>Date Played: {courseplayed.time} </p>}
              </div>
            }
          })}
        </Slider>
      </div>
      <div className="UserCourseWishlist">
        <h2>YOUR WISHLIST</h2>
        <Slider {...settings}>
          {userCourseWishlist.map((courseWishlist, index) => {
            return <div key={index} className="UserCourseWishlistImgandStats">
              <figure className="">
                {/* <h3>{book.title}</h3> */}
                {courseWishlist.course[0].hero_image && <img
                  src={courseWishlist.course[0].hero_image}
                  className="UserCourseWishlistimg"
                />}
              </figure>
              {courseWishlist.course[0].name && <h1><strong>{courseWishlist.course[0].name}</strong></h1>}
              {courseWishlist.course[0].ranking && <p>Course Ranking: {courseWishlist.course[0].ranking}</p>}
            </div>
          })}
        </Slider>
      </div>
      <div className="UserCourseFavourites">
        <h1>YOUR FAVOURITES</h1>
        <Slider {...settings}>
          {userCourseFavourites.map((coursefavourites, index) => {
            return <div key={index} className="UserCourseFavouritesImgandStats">
              <figure className="">
                {/* <h3>{book.title}</h3> */}
                {coursefavourites.course[0].hero_image && <img
                  src={coursefavourites.course[0].hero_image}
                  className="UserCourseFavouritesImg"
                />}
              </figure>
              {coursefavourites.course[0].name && <h1><strong>{coursefavourites.course[0].name}</strong></h1>}
              {coursefavourites.course[0].ranking && <p>Course Ranking: {coursefavourites.course[0].ranking}</p>}
            </div>
          })}
        </Slider>
      </div>
      {/* {coursesplayed.map((courseplayed, index) => {
        return <h1 key={index}>{courseplayed.</h1>
      })} */}
      <div className="GolfBagContainer">
        <div className="GolfBagFormContainer">
          <h1 className="CreateYourBagTitle">Create Your Golf Bag</h1>
          <UserGolfBagForm
            handleGolfBag={(event) => this.handleGolfBag(event)}
            handleChange={(event) => this.handleChange(event)}
            errors={this.state.errors}
            userGolfBag={this.state.data}
          />
        </div>

        <div className="ShowGolfBag">
          <div className="YourGolfBagTitleContainer">
            <h1 className="YourGolfBagTitle">Your Golf Bag</h1>
          </div>
          <div className="TheUserBagandImageContainer">
            <div className="TheUserbag">
              <h1><strong>Putter:</strong> {golfbag && golfbag.putter}</h1>
              <h1><strong>Sand Wedge:</strong> {golfbag && golfbag.sw}</h1>
              <h1><strong>Pitching Wedge:</strong> {golfbag && golfbag.pw}</h1>
              <h1><strong>Gap Wedge:</strong> {golfbag && golfbag.gw}</h1>
              <h1><strong>Lob Wedge:</strong> {golfbag && golfbag.lw}</h1>
              <h1><strong>Ultra Lob Wedge:</strong> {golfbag && golfbag.ulw}</h1>
              <h1><strong>Irons:</strong> {golfbag && golfbag.irons}</h1>
              <h1><strong>Woods:</strong> {golfbag && golfbag.woods}</h1>
              <h1><strong>Driver:</strong> {golfbag && golfbag.driver}</h1>
            </div>
            <div className="BagImage">
              <figure>
                <img src="https://media.golfdigest.com/photos/5ccb388076cfaef7ba82aed0/1:1/w_2000,h_2000,c_limit/Titleist%20Players%204%20Plus.jpg" className="TheBagImage" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </main>
  }
}

export default UserProfile