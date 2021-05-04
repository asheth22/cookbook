import axios from "axios";

export default {
  // Gets user info
  getUser: function() {
    return axios.get('/auth/user').then(result => result.data);
  },
  // Logs the user out
  logout: function() {
    console.log("logout");
    return axios.post('/auth/logout').then(result => result.data);
  },
  // Log the user in
  login: function (userData) {
    console.log("Inside authaxios ", userData)
    return axios.post('/auth/login', userData).then(result => result.data);
  },
  // New user registration
  signup: function (userData) {
    console.log("signup user: ", userData)
    return axios.post('/auth/signup', userData).then(result => result.data);
  }
};

