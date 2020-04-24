import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import BirdieTimeHome from './Components/BirdieTimeHome'
import Navbar from './Components/Navbar'
import MapOfCourse from './Components/Map'
import Register from './Components/Register'
import Login from './Components/Login'

import BirdieTimeUserHome from './Components/BirdieTimeUserHome'
import CourseDetailedPage from './Components/CourseDetailedPage'
import CourseAllHoles from './Components/CourseAllHoles'
import CourseHoleDetailedPage from './Components/CourseHoleDetailedPage'

import UserProfile from './Components/UserProfile'


import coursePagination from './Components/PaginationExperiment'

const App = () => (

  <HashRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={BirdieTimeHome} />
      <Route path="/map" component={MapOfCourse} />
      <Route exact path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/birdie_time_user_home" component={BirdieTimeUserHome} />
      <Route exact path="/course/:id" component={CourseDetailedPage} />
      <Route exact path="/course/:id/holes" component={CourseAllHoles} />
      <Route path="/course/:id/holes/:id" component={CourseHoleDetailedPage} />
      <Route exact path = "/profile" component={UserProfile} />
      <Route exact path = "/pagination" component={coursePagination} />
    </Switch>
  </HashRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)