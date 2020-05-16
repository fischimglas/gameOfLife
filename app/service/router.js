import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import FullScreen from '../pages/Fullscreen'

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/fullscreen', name: 'fullscreen', component: FullScreen}

    ]
})
