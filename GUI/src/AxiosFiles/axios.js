import axios from 'axios';

const API = axios.create({
	//baseURL: 'http://35.238.122.18/'
	baseURL: 'http://localhost:3000/'
	//http://18.222.176.220
});

export default API;