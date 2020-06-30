import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import CampainPage from './campaignPage/CampainPage'
import LoginPage from './loginPage/LoginPage'
import RegisterPage from './registerPage/RegisterPage'
import {CampainContextProvider} from './CampainsContext'
import Error404Page from './errorPage/Error404Page'
import ApplicationPage from './applicationPage/ApplicationPage'
import { ProtectedRoute } from './protected.routes'

import Header from './Header'
import Menu from './menu/Menu'
import Footer from './Footer'
import ProfilePage from './profilePage/ProfilePage'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const App = () => (
      <div>
        <Route component={Menu} />
        <Route component={Header} />
        <Switch>
          <ProtectedRoute exact path='/' component={CampainPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <ProtectedRoute path='/profile' component={ProfilePage}/>
          <ProtectedRoute path='/campain/:id' component={CampainPage}/>
          <ProtectedRoute path='/application/:id' component={ApplicationPage}/>
          <Route component={Error404Page} />
        </Switch>
        <Route component = {Footer} />
      </div>
    )

    console.log('App render')

    return (
        <Switch>
          <CampainContextProvider>
            <App/>
          </CampainContextProvider>
        </Switch>
    )
  }
}
