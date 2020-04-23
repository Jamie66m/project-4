import React from 'react'
// import { Link } from 'react-router-dom'

const BirdieTimeHome = () => {
  return <main className="mainNonUserHome">
    <section className="mainNonUserHomeImageContainer">
      <h1 className="mainNonUserHomeTitle">Birdie Time</h1>
      <h3 className="mainNonUserHomeSubTitle">Go on a journey to play the top courses in the UK & Northern Ireland</h3>
    </section>
    <div className="AboutContainer">
      <h1 className="AboutBirdieTimeTitle">About Birdie Time</h1>
      <p className="AboutParagraph">Birdie Time wants golf lovers to have a crack at some of the greatest courses across across the UK & Northern Ireland. You can search through all 50 courses which are enriched with detail. Make your own journey and compare your scores against other uses.</p>
      <p className="SiteUpdates">Further updates to the site are on their way where an online instructor will offer tips on a video of your swing.</p>
    </div>

    <div className="ImagesContainer">
      <div className="ImageContainer">
        <figure>
          <img src="https://www.top100golfcourses.com/img/courses/sunningdale-old_cace22aa-3dbc-4201-b60e-431735d49b50.jpg" className="ImageSize"alt="" />
        </figure>
        <p className="CourseMiniDescription">Sunningdale Golf Club is a prestigious heathland golf course located in Sunningdale</p>

      </div>

      <div className="ImageContainer">
        <figure>
          <img src="https://www.royalstgeorges.com/wp-content/uploads/2018/10/06th-Hole-Royal-St-Georges-Golf-Club0136-Edit-2.jpg" className="ImageSize" alt="" />
        </figure>
        <p className="CourseMiniDescription">Royal St George’s is southern England’s best links by a considerable margin.</p>

      </div>

      <div className="ImageContainer">
        <figure>
          <img src="https://www.golf.com/wp-content/uploads/2019/07/royal-portrush-main-960x540.jpg" className="ImageSize" alt="" />
        </figure>
        <p className="CourseMiniDescription">Royal Portrush played host to Ireland’s first ever professional golf tournament. </p>
      </div>
    </div>
    <footer className="NonUserFooter">
      (C) Jamie Maxwell 2020
    </footer>
  </main>
}

export default BirdieTimeHome