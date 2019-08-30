import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '@/pages/Index'
import About from '@/pages/About'

export default new Router({
    // ... other settings
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
    ]
})