import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//User
import Index from '@/pages/Index'
import About from '@/pages/About'
import Page404 from '@/pages/Page404'
import BoardingHouse from '@/pages/BoardingHouse'
import BoardingHouseShow from '@/pages/BoardingHouse'

//Admin
import Login from '@/pages/admin/Login'
import AddBoardingHouse from '@/pages/admin/AddBoardingHouse'
import UpdateBoardingHouse from '@/pages/admin/AddBoardingHouse'
import ListBoardingHouse from '@/pages/admin/ListBoardingHouse'

export default new Router({
    // ... other settings
    routes: [
        {
            path: '/404',
            name: '404Page',
            component: Page404
        },
        { path: '*', redirect: '/404' },
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
        {
            path: '/boarding-house',
            name: 'BoardingHouse',
            component: BoardingHouse
        },
        {
            path: '/boarding-house/:id',
            name: 'BoardingHouse',
            component: BoardingHouseShow
        },
        {
            path: '/admin/panel/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin/panel/tambah-kost',
            name: 'AddBoardingHouse',
            component: AddBoardingHouse
        },
        {
            path: '/admin/panel/update-kost/:id',
            name: 'UpdateBoardingHouse',
            component: UpdateBoardingHouse
        },
        {
            path: '/admin/panel/list-kost',
            name: 'ListBoardingHouse',
            component: ListBoardingHouse
        }
    ]
})