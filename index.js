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
  db.find().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    res.status(500).json({ message: 'The users information cannot be retrieved.' })
  })
})

server.get('/api/users/:id', (req, res) => {
  const {id} = req.params

  db.findById(id).then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The user information could not be retrieved.' })
  })
})

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params

  db.remove(id).then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' })
    }
  }).catch(err => {
    res.status(500).json({ message: 'The user could not be removed.' })
  })
})

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body

  if(changes.name && changes.bio) {
    db.update(id, changes).then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'The user information could not be modified.' })
    })
  } else {
    res.status(400).json({ message: 'Please provide name and bio for the user.' })
  }
})

server.listen(4000, () => {
  console.log('\n** API up and running on port 4k **')
})
