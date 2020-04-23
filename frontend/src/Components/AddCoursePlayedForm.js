import React from 'react'

const AddCoursePlayedForm = ({ handleSubmit, handleChange, errors, courseId, data }) => {
  console.log(data)
  const { rating, score, time } = data
  return <div className='FormContainer'>

    <form
      className="form"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="field">
        <label className="label">
          Rating
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="rating"
            className="input"
            value={rating}
          />
        </div>
        {errors.rating && <small className="help is-danger">
          {errors.rating}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Score
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="score"
            className="input"
            value={score}
          />
        </div>
        {errors.rating && <small className="help is-danger">
          {errors.rating}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Date
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="time"
            className="input"
            placeholder="YYYY-MM-DD"
            value={time}
          />
        </div>
        {errors.rating && <small className="help is-danger">
          {errors.rating}
        </small>}
      </div>
      <button className="button addcoursebutton">
        Add Course
      </button>
    </form>
  </div>
}

export default AddCoursePlayedForm