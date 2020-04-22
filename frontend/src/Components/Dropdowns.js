import React from 'react'

export const NationDropDown = ({ onChange }) => {
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
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            Northern Ireland
          </a>
          <a className="dropdown-item">
            Scotland
          </a>
          <a href="#" className="dropdown-item">
            England
          </a>
          <a className="dropdown-item">
            Wales
          </a>
        </div>
      </div>
    </div>
  </div>
}

export const CourseTypeDropDown = ({ onChange }) => {
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
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            Links
          </a>
          <a className="dropdown-item">
            Parkland
          </a>
          <a href="#" className="dropdown-item">
            Downland
          </a>
          <a className="dropdown-item">
            Heathland
          </a>
        </div>
      </div>
    </div>
  </div>

}