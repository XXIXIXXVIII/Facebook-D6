import axios from 'axios'
import { baseDomain } from '../../apiConfig/Repository'
import { RepositoryFactory } from '../../apiConfig/RepositoryFactory'
const typePostRepository = RepositoryFactory.get('typePostDefault')
const pagesPostRepository = RepositoryFactory.get('pagesRepository')

const authModule = {
  state() {
    return {
      user: null,
      pages: null,
      loadPageValue: null,
      showLoadingPage: false,
      registrationError: null,
      loginError: null,
      currentUser: null,
      currentPage: null,
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },

    getRegistrationError(state) {
      return state.registrationError
    },

    getLoginError(state) {
      return state.loginError
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
      state.currentUser = payload.user
      state.pages = payload.pages
      state.error = null
    },
    setUserLocal(state, payload) {
      state.user = payload
    },
    setCurrentUserLocal(state, payload) {
      state.currentUser = payload
    },
    setPagesLocal(state, payload) {
      state.pages = payload
    },
    setRegistrationError(state, payload) {
      state.registrationError = payload
    },
    setLoginError(state, payload) {
      state.loginError = payload
    },
    resetError(state) {
      state.registrationError = null
      state.loginError = null
    },
    setTypePost(state, payload) {
      state.user.typePost = payload
    },
    setUser1(state, payload) {
      state.user = payload
      state.error = null
    },
    setPage(state, { user, pages }) {
      state.pages = pages
      state.user = user
    },
    choosePage(state, { newPages, page }) {
      state.pages = newPages
      state.currentPage = page
    },
    setShowLoadingPage(state, { loadPageValue, showLoadingPage }) {
      state.loadPageValue = loadPageValue
      state.showLoadingPage = showLoadingPage
    },
    logout(state) {
      state.user = null
      state.error = null
      state.pages = null
    },
  },

  actions: {
    async register(context, payload) {
      try {
        const response = await axios.post(
          `${baseDomain}/api/auth/register`,
          payload
        )
        context.commit('setUser', response.data)
        context.commit('setRegistrationError', null)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('currentUser', JSON.stringify(response.data.user))
        this.$router.push('/')
      } catch (error) {
        console.log(error.response.data.message)
        if (error) {
          context.commit('setRegistrationError', error.response.data.message)
        }
      }
    },
    async login(context, payload) {
      try {
        const response = await axios.post(
          `${baseDomain}/api/auth/login`,
          payload
        )
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('pages', JSON.stringify(response.data.pages))
        localStorage.setItem('currentUser', JSON.stringify(response.data.user))
        context.commit('setUser', response.data)
        this.$router.push('/')

        context.commit('setLoginError', null)
      } catch (error) {
        if (error) {
          context.commit('setLoginError', error.response.data.message)
        } else {
          console.log('network error')
        }
      }
    },

    resetError(context) {
      context.commit('resetError')
    },

    async putDefaultTypePost(context, { userId, postType, check }) {
      if(!check){
        try {
          const response = await typePostRepository.putTypePostDefault({
            userId,
            payload: postType,
          })
          console.log(response.data)
          context.commit('setUser1', response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
        } catch (error) {
          console.log(error)
        }
      }else{
        try {
          const response = await typePostRepository.putPageTypePostDefault({
            userId,
            payload: postType,
          })
          console.log(response.data)
          context.commit('setUser1', response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
        } catch (error) {
          console.log(error)
        }
      }

    },
    typePost(context, payload) {
      context.commit('setTypePost', payload)
    },

    logout(context) {
      context.commit('logout')
    },

    async createPage(context, payload) {
      const response = await pagesPostRepository.createPage({ payload })
      const user = response.data.user
      const pages = response.data.pages
      const index = pages.findIndex((item) => item.page_id === user.page_id)
      if (index > -1) {
        pages.splice(index, 1)
        pages.unshift(user)
        localStorage.setItem('pages', JSON.stringify(pages))
      }
      localStorage.setItem('user', JSON.stringify(user))
      context.commit('setPage', {
        user,
        pages,
      })
    },

    changePage(context, { page, pages }) {
      const index = pages.findIndex((item) => item.page_id === page.page_id)
      if (index > -1) {
        pages.splice(index, 1)
        pages.unshift(page)
        localStorage.setItem('pages', JSON.stringify(pages))
      }
      localStorage.setItem('user', JSON.stringify(page))
      context.commit('setPage', { user: page, pages })
    },
  },
}

export default authModule
