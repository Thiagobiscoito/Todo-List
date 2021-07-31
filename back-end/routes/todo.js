const express = require('express');
const router = express.Router();
const db = require('../services/db')
const { ObjectId } = require ("mongodb")

db.connectToDb(() => {

  const checkBody = (req, res, next) =>{
    if("_id" in req.body) {
      req.body._id = ObjectId(req.body._id)
    }
    next()
  }
  // define the home page route
  router.get('/list', async (req, res) => {
    const results = await db.findDocuments()
    res.send(results);
  });
  // define the about route
  router.post('/add', async (req, res) => {
    const results = await db.insertDocuments(req.body)
    res.send(results);
  });

  router.patch('/update', checkBody, async (req, res) => {
    const results = await db.updateDocument(req.body)
    res.send(results);
  });

  router.delete('/delete', checkBody, async (req, res) => {
    const results = await db.removeDocument(req.body)
    res.send(results);
  });
})


module.exports = router;