import { createStore } from "vuex";
const store = createStore({
    namespaced: true,
    state: {
        base_url: "http://localhost:8000",
        auth: null,
        toast: null
    },
    getters: {
        auth(state) {
            return state.auth;
        },
        toast(state) {
            return state.toast;
        },
        base_url(state) {
            return state.base_url;
        }
    },
    mutations: {
        SET_AUTH(state, auth) {
            state.auth = auth;
        },
        SET_TOAST(state, toast) {
            state.toast = toast;
        }
    },
    actions: {
        setAuth: ({ commit }, auth) => {
            commit('SET_AUTH', null ?? auth.user);
        },
        showToast: ({ commit, state }, status) => {
            commit('SET_TOAST', { ...status, id: Date.now() });
        }
    },
    modules: {},
});

export default store;