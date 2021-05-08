import axios from "axios";

export default {
  // Gets user info
  getUser: function () {
    return axios.get('/auth/user').then(result => result.data);
  },
  // Logs the user out
  logout: function() {
    return axios.post('/auth/logout').then(result => result.data);
  },
  // Log the user in
  login: function (userData) {
    return axios.post('/auth/login', userData).then(result => result.data);
  },
  // New user registration
  signup: function (userData) {
    return axios.post('/auth/signup', userData).then(result => result.data);
  }
};

