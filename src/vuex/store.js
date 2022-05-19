import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentP: 0
    },

    getters: {

    },

    mutations: {
        changePage(state, page) {
            state.currentP = page
        }
    },

    actions: {
        changePage(context, page) {
            context.commit('changePage', page)
        }
    }
});