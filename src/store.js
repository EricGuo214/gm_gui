import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        alertMsg: '',
    },

    getters: {
        alertMsg: state => state.alertMsg,
    },

    mutations: {
        setAlertMsg(state, alertMsg) {
            state.alertMsg = alertMsg
            setTimeout(() => {
                state.alertMsg = '';
            }, 10000);
        },
    },
})