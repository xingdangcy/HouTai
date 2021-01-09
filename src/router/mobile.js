export default [
    //手机端主页面
    {
        path: "/m/home",
        name: "m_home",
        component: () => import("@/views/m/layout"),
        redirect: "/m/index",
        children: [
            //首页地址
            {
                path: "/m/index",
                name: "m_index",
                component: () => import("@/views/m/home/index"),
                meta:{
                    title: "首页"
                }
            },{
                path: "/m/cate",
                name: "m_cate",
                component: () => import("@/views/m/cate/index"),
                meta:{
                    title: "分类"
                }
            },{
                path: "/m/cart",
                name: "m_cart",
                component: () => import("@/views/m/cart/index"),
                meta:{
                    title: "我的购物车"
                }
            },{
                path: "/m/my",
                name: "m_my",
                component: () => import("@/views/m/my/index"),
                meta:{
                    title: "个人中心"
                }
            }
        ]
    },{
        path: "/m/cut",
        name: "m_cut",
        component: () => import("@/views/m/cate/cutlist"),
        meta:{
            title: "砍价列表"
        }
    },{
        path: "/m/recommand",
        name: "m_recommand",
        component: () => import("@/views/m/cate/recommList"),
        meta:{
            title: "人气推荐"
        }
    }
];