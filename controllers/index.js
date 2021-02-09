const axios = require('axios');
const _ = require('lodash');

// const url = 'http://52.53.221.54:3001'; // me
// const url = 'http://54.90.53.234:3001'; // joey
// const url = 'http://3.15.40.71:3001'; // pablo
const url = 'http://34.224.88.246:3001'; // client server
// const url = 'http://localhost:3001';

const getReview = (prodId) => (
  axios.get(`${url}/api/reviews/${prodId}`)
    .then(({ data }) => {
      if (_.isEmpty(data)) {
        throw new Error('no data found');
      }
      return data;
    })
    .catch((err) => err)
);

const getAll = () => (
  axios.get(`${url}/api/reviews`)
    .then(({ data }) => data)
);

module.exports = {
  getReview,
  getAll,
};
