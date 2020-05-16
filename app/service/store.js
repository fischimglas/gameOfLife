import Vue from 'vue'
import Vuex from 'vuex'
import _ from "lodash";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        matrix: [],
    },
    mutations: {
        /**
         * Overwrite Matrix
         * @param state
         * @param matrix
         */
        setMatrix(state, matrix) {
            state.matrix.splice(0, state.matrix.length);
            _.each(matrix, m => state.matrix.push(m));
        },
        clearMatrix(state) {
            state.matrix.splice(0, state.matrix.length);
        },
        /**
         * Update each cells A state (alive)
         *
         * @param state
         * @param update [idx:A]
         */
        updateMatrix(state, update) {
            _.each(update, (a, ix) => {
                state.matrix[ix].a = a;
            })
        }
    }
});

export default store;