/* eslint-disable camelcase */
import React from 'react'

const RegisterForm = ({ handleSubmit, handleChange, errors, data }) => {
  console.log(data)
  // eslint-disable-next-line camelcase
  const { email, username, password, password_confirmation } = data
  return <form
    className="form"
    onSubmit={(event) => handleSubmit(event)}
  >
    <div className="field">
      <label className="label">
        Username
      </label>
      <div className="control has-icons-left">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="username"
          className="input"
          value={username}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-user"></i>
        </span>
      </div>
      {errors.username && <small className="help is-danger">
        {errors.username.message}
      </small>}
    </div>
    <div className="field">
      <label className="label">
        Email
      </label>
      <div className="control has-icons-left">
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          name="email"
          className="input"
          value={email}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </div>
      {errors.email && <small className="help is-danger">
        {errors.email.message}
      </small>}
    </div>
    <div className="field">
      <label className="label">
        Password
      </label>
      <div className="control has-icons-left">
        <input
          onChange={(event) => handleChange(event)}
          type="password"
          name="password"
          className="input"
          value={password}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </div>
      {errors.password && <small className="help is-danger">
        {errors.password.message}
      </small>}
    </div>
    <div className="field">
      <label className="label">
        Confirm Password
      </label>
      <div className="control has-icons-left">
        <input
          onChange={(event) => handleChange(event)}
          type="password"
          name="password_confirmation"
          className="input"
          // eslint-disable-next-line camelcase
          value={password_confirmation}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </div>
      {errors.password_confirmation && <small className="help is-danger">
        {errors.password_confirmation.message}
      </small>}
    </div>
    <button className="button is-success">
      Register
    </button>
  </form>
}

export default RegisterForm