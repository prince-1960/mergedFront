import axios from "axios";

export const register = newUser => {
	return axios
		.post("https://mongodb-274816.wl.r.appspot.com:5000/api/register", {
			username: newUser.username,
			email: newUser.email,
			password: newUser.password
		})
		.then(response => {
			console.log("Registered");
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};

export const login = user => {
	return axios
		.post("https://mongodb-274816.wl.r.appspot.com:5000/api/validate", {
			username: user.username,
			password: user.password
		})
		.then(response => {
			localStorage.setItem("usertoken", response.data);
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};

export const getProfile = user => {
	return axios
		.get("users/profile", {
			//headers: { Authorization: ` ${this.getToken()}` }
		})
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};
