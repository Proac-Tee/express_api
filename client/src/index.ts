import { createStore } from "vuex";

const store = createStore({
  state: {
    token: localStorage.getItem("expressApiToken"),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("expressApiToken", token); // Update localStorage when token changes
    },
    clearToken(state, token) {
      state.token = "";
      localStorage.removeItem("expressApiToken"); // Remove token from localStorage on logout
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token); // Set token in state
    },
    logout({ commit }) {
      commit("clearToken"); // Clear token from state
    },
    fetchTokenFromLocalStorage({ commit }) {
      const token = localStorage.getItem("expressApiToken");
      if (token) {
        commit("setToken", token); // Set token from localStorage
      }
    },
  },
  getters: {
    getToken: (state) => state.token,
  },
});

export default store;
