import axios from 'axios';

const baseUrl = process.env.REACT_APP_METADATA_API_BASE;

export default axios.create({
  baseURL: baseUrl
});