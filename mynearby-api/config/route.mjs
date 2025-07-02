'use strict';
import express from 'express';
const router = express.Router();
import apiRoute from '../app/module/index.mjs';

router.use('/api', apiRoute);

router.get('/about/:name', function (req, res) {
  res.send('hello ' + req.params.name + '!');
});

router.get('/', function (req, res) {
  res.render('index.ejs', {
    title: 'Generator-Express MVC',
    comment: 'This is for mantraya-api'
  });
});


export default router;