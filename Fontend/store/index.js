import Vuex from 'vuex'
import authModule from './auth'
import headerModule from './messenger'
import dataStoryOrReels from './dataStoryAndReels'
import idFriendModule from './idFriend'
import searchModule from './search'
import groupModule from './groupStore'
import listFriendModule from './listFriends'
import i18Module from './i18'
import postUserDetail from './post'
import notificationModule from './notification'

const createStore = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    modules: {
      authModule,
      headerModule,
      dataStoryOrReels,
      idFriendModule,
      searchModule,
      groupModule,
      listFriendModule,
      postUserDetail,
      i18Module,
      notificationModule,
    },
  })
}

export default createStore
