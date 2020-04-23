import React from 'react'

const UserGolfBagForm = ({ handleGolfBag, handleChange, userGolfBag, errors }) => {


  const { putter, sw, pw, gw, lw, ulw, irons, woods, driver } = userGolfBag
  return <div className='FormContainer'>

    <form
      className="golfbagform"
      onSubmit={(event) => handleGolfBag(event)}
    >
      <div className="field">
        <label className="label">
          Putter
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="putter"
            className="input"
            value={putter}
          />
        </div>
        {errors.putter && <small className="help is-danger">
          {errors.putter}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Sand Wedge
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="sw"
            className="input"
            value={sw}
          />
        </div>
        {errors.sw && <small className="help is-danger">
          {errors.sw}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Pitiching Wedge
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="pw"
            className="input"
            value={pw}
          />
        </div>
        {errors.pw && <small className="help is-danger">
          {errors.pw}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Gap Wedge
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="gw"
            className="input"
            value={gw}
          />
        </div>
        {errors.gw && <small className="help is-danger">
          {errors.gw}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Lob Wedge
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="lw"
            className="input"
            value={lw}
          />
        </div>
        {errors.lw && <small className="help is-danger">
          {errors.lw}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Ultra Lob Wedge
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="ulw"
            className="input"
            value={ulw}
          />
        </div>
        {errors.ulw && <small className="help is-danger">
          {errors.ulw}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Irons
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="irons"
            className="input"
            value={irons}
          />
        </div>
        {errors.irons && <small className="help is-danger">
          {errors.irons}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Woods
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="woods"
            className="input"
            value={woods}
          />
        </div>
        {errors.woods && <small className="help is-danger">
          {errors.woods}
        </small>}
      </div>
      <div className="field">
        <label className="label">
          Driver
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="driver"
            className="input"
            value={driver}
          />
        </div>
        {errors.driver && <small className="help is-danger">
          {errors.driver}
        </small>}
      </div>
      <button className="button addcoursebutton">
        Add Bag
      </button>
    </form>
  </div>
}

export default UserGolfBagForm