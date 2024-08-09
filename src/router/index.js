import Vue from 'vue';
import VueRouter from 'vue-router'
import index from '@/views/index';
import user from '@/views/user';
import test from '@/views/test';
import antvx6Demo1 from '@/views/test/antvx6/demo1';
import antvx6Demo2 from '@/views/test/antvx6/demo2';
import antvx6Work from '@/views/test/antvx6/work';

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
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: index,
        children: [
            {
                path: 'antvx6/demo1',
                name: 'antvx6 Demo1',
                component: antvx6Demo1,
            },
            {
                path: 'antvx6/demo2',
                name: 'antvx6 Demo2',
                component: antvx6Demo2,
            },
            {
                path: 'antvx6/work',
                name: 'antvx6 work',
                component: antvx6Work,
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
