import Vue from 'vue'
import Router from 'vue-router'
import Front from '../pages/Front'
import User from '../pages/User'
import UserDetail from '../pages/user/Detail'
import UserOverview from '../pages/user/Overview'

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', name: 'front', component: Front},
        {path: '/user', name: 'user', component: User, redirect: {name: 'user-overview'}},
        {path: '/user-detail/:id', name: 'user-detail', component: UserDetail},
        {path: '/user-overview', name: 'user-overview', component: UserOverview},

    ]
})
