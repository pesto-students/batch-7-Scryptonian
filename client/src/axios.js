import axios from 'axios';

axios.defaults.headers.common['Authorization'] = localStorage.getItem(
  'Auth-Token',
);

export default axios;
