import Vue from 'vue'
import App from './App'
import router from './service/router'
import "vueify/lib/insert-css" // required for .vue file <style> tags
import store from './service/store';

import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'

import DEV from './dev'

// import '@vuikit/theme'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App)
});
