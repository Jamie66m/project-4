import React from 'react'

const SearchFormBirdieUserHome = ({ query, onChange }) => {
  return (
    <div className="BirdieUserHomeSearchForm">
      <form className="field has-addons" id="BirdieUserHomeSearchFormBar">
        <div className="control is-expanded">
          <input
            className="input is-normal"
            type="search"
            placeholder="search courses..."
            value={query}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  )
}
export default SearchFormBirdieUserHome