import React, { Component } from "react";
import axios from "axios";
//import {Pie} from 'react-chartjs-2';


import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from'./Footer'
import PieChartCustom from "../PieChart";



class Home extends Component {
  componentDidMount() {
      document.getElementsByTagName('body')[0].className = '';
  }

  constructor(props) {
    super(props);
      const token = localStorage.getItem('usertoken');
      let loggedIn = true;
      if(token == null) {
        loggedIn = false;
      }
    this.state = { responded: [], pieChartData: [], loggedIn };

  }
// first url blank for id field.
colors = ["#E322627", "#C13C37", "#6A2135", "#E38627"];

  handleRoleChange(event) {
    if (event.target.value !== "ps") {
      // uncomment below line if you want to try the sameple data without db. chnage the port as per your server (uses countries.json inside public folder)

       //axios.get("http://localhost:3000/" + event.target.value +".json").then((Response) => {
        axios.get('http://localhost:4000/Detail/' + event.target.value).then((Response) => {
        let data = [];
      /* old code
     Response.data.status.map(status => {
      Object.entries(status).map((s,index)=> {
      removed status from above line and used forEach to avoid warning thrown by map fucntion as it expects an array to be returned
    */
        Response.data.forEach((status) => {
          Object.entries(status).forEach((s, index) => {
            // if condition applied to skip the id field being pushed to the pie chart
            if (s[1].match(/\d+/g)) {
              data.push({
                title: s[0],
                value: Number(s[1]),
                color: this.colors[index],
                link:"http://google.com/"
              });
            }
          });
        });
        //  this.setState({ responded: Response.data.status, pieChartData: data});
        // removed status from this line as well
        this.setState({ responded: Response.data, pieChartData: data });
      })
      ;
    } else {
      this.setState({ responded: [] });
    }
  }

  render() {

          if(this.state.loggedIn == false){
            return <Redirect to="/" />
          }
return (
  <main>
      <Navbar/>
      <div class="page">
          <div class="page-content">
              <div class="panel panel-bordered">
                  <div class="panel-heading">
                      <h2 class="panel-title font-size-40"> Tracker</h2>
                  </div>
                  <div class="panel-body">
                      <h5>Welcome to Employee Competency Tracker</h5>
                      <br/>
                      <p class="Agry font-size-20"> Please select any role from the drop down list below.
                          <br/> Once the role is selected a pie chart will be populated representing the values</p>
                      <br/>
                      <div class="form-group col-md-4">
                          <select defaultValue="ps" onChange={(event)=> { this.handleRoleChange(event); }} class="custom-select mr-sm-2">
                              <option value="ps" selected>Choose...</option>
                              <option value="dev"> developer</option>
                              <option value="t1">Tech lead</option>
                          </select>
                      </div>
                      <PieChartCustom data={this.state.pieChartData}></PieChartCustom>
                    </div>
              </div>
          </div>
      </div>
      <Footer/>
  </main>

)
  }
}

export default Home
