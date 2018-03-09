const Mock = require('mockjs');
const Random = Mock.Random;
const data = Mock.mock({
  'user|30': [{
    date: () => Random.date(),
    name: () => Random.cname(),
    address: () => Random.county(true),
  }],
});
console.log(data);
