import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import E0 from './components/E0'
import E1 from './components/E1'
import E2 from './components/E2'
import LoginError from './components/LoginError'
import RegisterError from './components/RegisterError'
import Success from './components/RegisterSuccess'
import Home from './components/Home'

class App extends Component {
render() {
    return (
      <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/loginerror" component={LoginError} />
          <Route exact path="/registererror" component={RegisterError} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/e0" component={E0} />
          <Route exact path="/e1" component={E1} />
          <Route exact path="/e2" component={E2} />
      </Router>
    )
  }
}

export default App
