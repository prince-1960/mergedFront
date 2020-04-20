import React, { Component } from "react";
import { login } from "./components/UserFunctions";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import E0 from './components/DevE0'
import E1 from './components/DevE1'
import E2 from './components/DevE2'
import TechLeadE0 from './components/TechLeadE0'
import TechLeadE1 from './components/TechLeadE1'
import TechLeadE2 from './components/TechLeadE2'
import LoginError from './components/LoginError'
import RegisterError from './components/RegisterError'
import Success from './components/RegisterSuccess'
import Home from './components/Home'

class App extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
			password: this.state.password
		};

		login(user).then(res => {
			if (res) {
				this.props.history.push(`/home`);
			} else {
				this.props.history.push("/loginerror");
			}
		});
	}
	componentDidMount() {
		document.getElementsByTagName("body")[0].className =
			"page-login-min layout-full page-dark";
	}

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
          <Route exact path="/devE0" component={E0} />
          <Route exact path="/devE1" component={E1} />
          <Route exact path="/devE2" component={E2} />
          <Route exact path="/techleadE0" component={TechLeadE0} />
          <Route exact path="/techleadE1" component={TechLeadE1} />
          <Route exact path="/techleadE2" component={TechLeadE2} />
      </Router>
    )
  }
    
	render() {
		return (
			<div class="page">
				<div class="page-content">
					<div class="page-brand-info">
						<div class="brand">
							<img class="brand-img" src="/images/logoblack.png" alt="..." />
							<br />
							<h2 class="brand-text font-size-30">Employee Competency Tracker</h2>
						</div>
					</div>

					<div class="page-login-main">

            <img class="brand-imgmid" src="/images/main.png" alt="..." />



						<div class="brand hidden-md-up">
							<img class="brand-img" src="/images/logo.png" alt="..." />
						</div>
						<h3 class="font-size-24 bold">Login</h3>

						<form onSubmit={this.onSubmit}>
							<div
								class="form-group form-material floating"
								data-plugin="formMaterial"
							>
								<label htmlFor="username" for="inputUsername">
									Username
								</label>
								<input
									type="text"
									class="form-control empty"
									required
									id="inputUsername"
									name="username"
									value={this.state.username}
									onChange={this.onChange}
								/>
							</div>
							<div
								class="form-group form-material floating"
								data-plugin="formMaterial"
							>
								<label htmlFor="password" for="inputPassword">
									Password
								</label>
								<input
									type="password"
									minlength="4"
									required
									class="form-control empty"
									id="inputPassword"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
								/>
							</div>
							<button type="submit" class="btn btn-primary btn-block">
								Login
							</button>
						</form>

						<footer class="page-copyright">
							<p>TCS Ninja</p>
							<p>© 2020. All RIGHT RESERVED.</p>
						</footer>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
