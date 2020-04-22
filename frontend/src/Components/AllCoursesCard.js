import React from 'react'
import { Link } from 'react-router-dom'

const AllCoursesCard = ({ course }) => {

  return (
    <div className="CourseCardContainer">
      <div className="CourseCardImageContainer">
        <figure className="CourseHeroImageContainer">
          <img src={course.hero_image} className="CourseHeroImage"></img>
        </figure>
      </div>
      <div className="CourseCardInfoContainer">
        <h1 className="CourseCardInfoTitle"><span className="CourseCardInfoRanking">{course.ranking}</span>.{course.name}</h1>
        <div className="CourseNationandType">
          <h2>{course.country}</h2>
          <h2>{course.course_type}</h2>
        </div>
      </div>
      <div className="CourseCardButtonContainer">
        <Link to={`../course/${course.id}`}>
          <button className="CourseCardButton">More Info Here</button>
        </Link>
      </div>
    </div>
  )
}

export default AllCoursesCard