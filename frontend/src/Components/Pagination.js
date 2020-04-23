import React from 'react'

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        {pageNumbers.map((number, index) => {
          return <li key={index}>
            <a onClick={() => paginate(number)} className="pagination-link is-current" aria-label="Page 1" aria-current="page">{number}</a>
          </li>
        })}
      </ul>
    </nav>
  )
}

export default Pagination