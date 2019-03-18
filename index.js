// implement your API here
const express = require('express')

const db = require('./data/db.js')

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
  const newUsers = req.body

  if(newUsers.name && newUsers.bio) {
    db.insert(newUsers).then(user => {
      res.status(201).json(newUsers)
    }).catch(err => {
      res.status(500).json({ message: 'There was an error saving to the database.' })
    })
  } else {
    res.status(400).json({ message: 'Please provide name and bio for the user.' }).end()
  }
})

server.get('/api/users', (req, res) => {
  db.users.find().then(user => {
    res.status(200).json(user)
  }).catch(err => {
    res.status(500).json({ message: 'The users information cannot be retrieved.' })
  })
})

server.listen(4000, () => {
  console.log('\n** API up and running on port 4k **')
})
