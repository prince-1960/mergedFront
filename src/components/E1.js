import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from'./Footer'
import { Redirect } from 'react-router-dom'

class E1 extends Component {
  constructor(props) {
    super(props);
      const token = localStorage.getItem('usertoken');
      let loggedIn = true;
      if(token == null) {
        loggedIn = false;
      }
    this.state = { loggedIn };

  }
  render() {
    if(this.state.loggedIn == false){
      return <Redirect to="/" />
    }
  return (
    <main>
      <Navbar />
      <div class="page">
          <div class="page-content">
              <div class="panel panel-bordered">
                  <div class="panel-heading">
                      <h2 class="panel-title "> Employees with E1 Competency </h2>
                  </div>
                  <div class="panel">
                      <ul class="list-group">
                          <li class="list-group-item">
                              <div class="media-body align-self-center">
                                  <h5>Prince Singh<small> (1506395) </small></h5>
                                  <p class="bold font-size-16 ">TeraData, Java, Azure</p>
                              </div>
                          </li>
                          <li class="list-group-item">
                            <div class="media-body align-self-center">
                              <h5>Prince Singh<small> (1506395) </small></h5>
                              <p class="bold font-size-16 ">TeraData, Java, Azure</p>
                            </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      <Footer />
  </main>
    )
  }

}
export default E1
