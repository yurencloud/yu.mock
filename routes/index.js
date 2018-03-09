const express = require('express');
const Mock = require('mockjs');

const Random = Mock.Random;

const router = express.Router();

router.get('/options', (req, res, next) => {
  const data = Mock.mock({
    'user|30': [{
      date: () => Random.date(),
      name: () => Random.cname(),
      address: () => Random.county(true),
    }],
  });
  res.json(data.user);
});

module.exports = router;
