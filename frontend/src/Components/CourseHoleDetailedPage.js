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
    const course = this.state.hole.course
    const holeteebox = this.state.hole.holes


    if (hole.video && hole.hole_graph) {
      return <main className="mainSingleHole">
        <div className="singleHoleContainer">
          <h1 className="NameandRankingTitle">{course.name}/<span className="RankingTitle">{course.ranking}</span></h1>
        </div>
        <div className="singleHolePageImageandUsefulInfo">
          <figure className="singleHoleFigureImage">
            <img src={course.hero_image} className="singleHoleImage" alt="" />
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

        <div className="singleHoleDetailContainer">
          <div className="singleHoleDetailHeader">
            <div className="HoleNumberContainer">
              <h1 className="HoleNumber">{hole.number}.</h1>
            </div>
            <p><span className="HolePar">Mens Par: </span> {hole.Mens_Par}</p>
            <p><span className="HolePar">Mens SI: </span> {hole.Mens_SI}</p>
            <p><span className="HolePar">Ladies Par: </span> {hole.Ladies_Par}</p>
            <p><span className="HolePar">Ladies SI: </span> {hole.Ladies_SI}</p>
          </div>
          <div className="GraphandVideoContainer">
            <div className="GraphContainer">
              <figure className="GraphFigure">
                <img src={hole.hole_graph} className="GraphImg" alt="" />
              </figure>
            </div>
            <div className="VideoContainerandTeeBoxes">
              <div className="HoleVideo">
                <iframe src={hole.video} className="HoleVideoIframe" frameborder="0"></iframe>
              </div>
              <div className="TeeBoxes">
                {/* <div className="HoleTeeBoxesDropDown">
                  <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                      <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Course TeeBoxes</span>
                        <span className="icon is-small">
                          <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                      <div className="dropdown-content" onClick={() => this.CountryFilter(event)} >
                        <a className="dropdown-item">
                          🏌🏻‍♂️ Championship
                        </a>
                        <a className="dropdown-item">
                          🏌️ Mens
                        </a>
                        <a className="dropdown-item">
                          🏌️‍♀️ Ladies
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="HoleTeeBoxContent">
                  <div className="HoleTeeBoxOne">
                    <p className="HoleTeeBoxOneColor">🏌🏻‍♂️ {holeteebox[0].teeboxtype}</p>
                    <p className="HoleTeeBoxOneColor">Teebox Color: {holeteebox[0].color}</p>
                    <p className="HoleTeeBoxOneLength">Length to Green: {holeteebox[0].length}yds</p>
                  </div>
                  <div className="HoleTeeBoxTwo">
                    <p className="HoleTeeBoxOneColor">🏌️ {holeteebox[1].teeboxtype}</p>
                    <p className="HoleTeeBoxTwoColor">Teebox Color: {holeteebox[1].color}</p>
                    <p className="HoleTeeBoxTwoLength">Length to Green: {holeteebox[1].length}yds</p>
                  </div>
                  <div className="HoleTeeBoxThree">
                    <p className="HoleTeeBoxOneColor">🏌️‍♀️ {holeteebox[2].teeboxtype}</p>
                    <p className="HoleTeeBoxThreeColor">Teebox Color: {holeteebox[2].color}</p>
                    <p className="HoleTeeBoxThreeLength">Length to Green: {holeteebox[2].length}yds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>




    } else if (hole.video === '') {
      return <main className="mainSingleHole">
        <div className="singleHoleContainer">
          <h1 className="NameandRankingTitle">{course.name}/<span className="RankingTitle">{course.ranking}</span></h1>
        </div>
        <div className="singleHolePageImageandUsefulInfo">
          <figure className="singleHoleFigureImage">
            <img src={course.hero_image} className="singleHoleImage" alt="" />
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

        <div className="singleHoleDetailContainer">
          <div className="singleHoleDetailHeader">
            <h1 className="HoleNumber">{hole.number}</h1>
          </div>
        </div>
      </main>



    } else if (hole.hole_graph === '') {
      return <main className="mainSingleHole">
        <div className="singleHoleContainer">
          <h1 className="NameandRankingTitle">{course.name}/<span className="RankingTitle">{course.ranking}</span></h1>
        </div>
        <div className="singleHolePageImageandUsefulInfo">
          <figure className="singleHoleFigureImage">
            <img src={course.hero_image} className="singleHoleImage" alt="" />
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

        <div className="singleHoleDetailContainer">
          <div className="singleHoleDetailHeader">
            <h1 className="HoleNumber">{hole.number}</h1>
          </div>
        </div>
      </main>
    }
  }
}

export default CourseHoleDetailedPage