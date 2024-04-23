import Vue from 'vue';
import VueRouter from 'vue-router'
import index from '@/views/index';
import user from '@/views/user';
import test from '@/views/test';

import appReport from '@/views/steal/appReport';
import percentBar from '@/views/steal/percentBar';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            {
                path: 'user',
                name: 'user',
                component: user,
            },
            {
                path: 'test',
                name: 'test',
                component: test,
            },
        ]
    },
    {
        path: '/steal',
        name: 'steal',
        component: index,
        children: [
            {
                path: 'appReport',
                name: 'appReport',
                component: appReport,
            },
            {
                path: 'percentBar',
                name: 'percentBar',
                component: percentBar,
            },
            
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        if(savedPosition){
            return savedPosition
        }else{
            return {x:0,y:0}
        }
    }
})
