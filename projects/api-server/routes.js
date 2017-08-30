const Router = require('express').Router;
const router = new Router();

const note = require('./model/note/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to secure-backend API!' });
});

router.use('/note', note);

module.exports = router;
