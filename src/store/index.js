import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls"; // persisted state packages this package use for encrypt localstorage vuex data
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null,
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,
    _getCurrentUser(state) {
      const user = state.user;
      delete user?.password;
      return user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    toUserLogout(state){
        state.user = null
    },
  },
  plugins: [
    createPersistedState({
      key: "booklike-vuex",
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
