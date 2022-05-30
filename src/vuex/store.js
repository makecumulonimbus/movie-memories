import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentP: 0,
        genreDatas: [],
        studioDatas : []
    },

    getters: {
        getGenreData(state) {
            return state.genreDatas
        },
        getStudioData(state) {
            return state.studioDatas
        }
    },

    mutations: {
        changePage(state, page) {
            state.currentP = page
        },
        setGenre(state, data) {
            state.genreDatas = data
        },
        setStudio(state, data) {
            state.studioDatas = data
        }
    },

    actions: {
        changePage(context, page) {
            context.commit('changePage', page)
        },
        setGenre(context, data) {
            context.commit('setGenre', data)
        },
        setStudio(context, data) {
            context.commit('setStudio', data)
        }
    }
});