import Vue from 'vue'
import Vuex from 'vuex'
import _ from "lodash";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        users: [],
    },
    mutations: {
        addUser(state, user) {
            state.users.push(user);
        }
    }
});

export default store;