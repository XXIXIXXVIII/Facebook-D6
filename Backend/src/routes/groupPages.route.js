const {
  getAll,
  getDetail,
  getGroupByCreator,
  getGroupByUserJoined,
  getUnJoinGroupByUserId,
  createGroupPage,
  updateGroupTypePost,
  getjoinGroupIsUser,
  remove,
  userJoinGroup,
  getUserInEachGroup,
} = require('../controllers/groupPages.controller')

const groupPagesRouter = (app) => {
  app.get('/api/groupPage', getAll)
  app.get('/api/groupPage/detailGroup/:groupId', getDetail)
  app.get('/api/groupPage/groupCreator/:user_id', getGroupByCreator)
  app.get('/api/groupPage/:user_id', getGroupByUserJoined)
  app.get('/api/groupPage/unJoinGroupPage/:user_id', getUnJoinGroupByUserId)
  app.get('/api/groupPage/joinGroupIsUser/:user_id', getjoinGroupIsUser)
  app.get('/api/groupPage/group/userInGroup/:groupId', getUserInEachGroup)
  app.post('/api/groupPage', createGroupPage)
  app.post('/api/groupPage/joinGroup', userJoinGroup)
  app.put('/api/groupPage/:groupId', updateGroupTypePost)
  app.delete('/api/groupPage/:id', remove)
}

module.exports = {
  groupPagesRouter,
}
