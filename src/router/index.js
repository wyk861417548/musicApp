import Vue from "vue"
import VueRouter from "vue-router"
import rank from "../components/rank/rank.vue"
import singer from "../components/singer/singer.vue"
import recommend from "../components/recommend/recommend.vue"
import search from "../components/search/search.vue"
import singerDetail  from "../components/singer-detail/singer-detail.vue"
import disc from "../components/disc/disc";
import toplist from "../components/top-list/top-list"
//import a from "../components/a/a.vue"
Vue.use(VueRouter);  //引用路由组件

export default  new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/recommend"
        },
        {
            path:"/rank",
            component:rank,
            children:[
                {
                    path:":id",
                    component:toplist
                }
            ]
        },
        {
            path:"/singer",
            component:singer,
            children:[
                {
                    path:":id",  //利用动态的属性路由
                    component:singerDetail
                }
            ]
        },
        {
            path:"/search",
            component:search
        },
        {
            path:"/recommend",
            component:recommend,
            children: [ // 增加一个二级路由
                {
                    path: ":id",
                    component: disc
                }
            ]
        }
    ]
})















