require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {
  usersRouter,
  authRouter,
  friendRequestsRouter,
  friendshipRouter,
  searchHistoryRoute,
  pageFollowersRouter,
  pagesRouter,
  postsRouter,
  storiesRouter,
  hobbiesRouter,
  reactionRoute,
  messageRouter,
  notificationRoute,
  mediaRouter,
  commentRoute,
  awardRouter,
  reCommentRoute,
  storageRoute,
  groupPagesRouter,
} = require('./src/routes/index')

const socket = require('./src/socket.io/socket.io')
const http = require('http')
// Create global app object
const app = express()
const server = http.createServer(app)
// Normal express config defaults
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Use Router
usersRouter(app)
authRouter(app)
friendRequestsRouter(app)
friendshipRouter(app)
searchHistoryRoute(app)
pageFollowersRouter(app)
pagesRouter(app)
postsRouter(app)
storiesRouter(app)
hobbiesRouter(app)
reactionRoute(app)
mediaRouter(app)
messageRouter(app)
notificationRoute(app)
commentRoute(app)
awardRouter(app)
reCommentRoute(app)
storageRoute(app)
groupPagesRouter(app)
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Handle Error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.message)
})
// socket in there
socket(server)
// Start server
server.listen(process.env.PORT, 'localhost', function() {
  console.log('localhost PORT: ', process.env.PORT)
})
