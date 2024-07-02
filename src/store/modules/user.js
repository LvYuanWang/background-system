import {
  loginApi,
  // logout,
  getInfoApi
} from '@/api/user'
import {
  // getToken,
  // setToken,
  removeToken
} from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginId, loginPwd, captcha, remember } = userInfo
    return new Promise((resolve, reject) => {
      loginApi({ loginId: loginId.trim(), loginPwd: loginPwd, captcha, remember }).then(response => {
        const { data } = response
        if (data) {
          // 说明data里面有数据
          commit('SET_USER', data)
          resolve()
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
        } else {
          // 说明data里面没有数据
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoApi().then(response => {
        if (typeof response === 'string') {
          // 是字符串,说明是错误信息
          const res = JSON.parse(response)
          if (res.code === 401) {
            reject(res.msg)
          }
        } else {
          // 是对象,说明是用户信息
          const { data } = response
          commit('SET_USER', data)
          resolve()
        }
        // if (!data) {
        //   return reject('Verification failed, please Login again.')
        // }
        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()

      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

