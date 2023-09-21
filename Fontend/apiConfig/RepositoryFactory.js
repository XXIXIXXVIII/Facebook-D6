import postRepository from './postRepository'
import StoryAndReelsRepository from './StoryAndReelsRepository'
import searchRepository from './searchRepository'
import TypePostDefaultRepository from './TypePostDefault'
import likePostRepository from './likePostRepository'
import friendsRepository from './friendsRepository'
import userRepository from './userRepository'
import messengerRepository from './messengerRepository'
import groupsRepository from './groupsRepository'
import hobbiesRepository from './hobbiesRepository'
import pagesRepository from './pageRepository'
import followRepository from './followRepository'
import notificationRepository from './notificationRepository'
import storageRepository from './storageRepository'

const repositories = {
  user: userRepository,
  hobbies: hobbiesRepository,
  posts: postRepository,
  storage : storageRepository,
  search: searchRepository,
  StoryAndReels: StoryAndReelsRepository,
  typePostDefault: TypePostDefaultRepository,
  likePostRepository,
  friendsRepository,
  messenger: messengerRepository,
  groupsRepository,
  pagesRepository,
  followRepository,
  notification: notificationRepository,
}

export const RepositoryFactory = {
  get: (name) => repositories[name],
}
