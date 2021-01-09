//抛出路由的数组对象
export default [
    //登陆页面的路由信息
    {
        path: "/admin/login",
        name: "admin_login",
        component: () => import("@/views/admin/login/login")
    }, {
        path: "/admin/home",
        name: "admin_home",
        component: () => import("@/views/admin/home"),
        redirect: "/admin/index",
        children: [
            {
                path: "/admin/index",
                name: "admin_index",
                component: () => import("@/views/admin/home/index"),

            },
            {
                path: "/admin/picture",
                name: "admin_picture",
                component: () => import("@/views/admin/home/picture"),
                meta: {
                    bread: ['相册管理']
                }
            },
            {
                path: "/admin/user",
                name: "admin_user",
                component: () => import("@/views/admin/user/list"),
                meta: {
                    bread: ['用户管理', '用户列表']
                }
            },
            {
                path: "/admin/setting",
                name: "admin_setting",
                component: () => import("@/views/admin/setting/index"),
                meta: {
                    bread: ['设置', '基本设置']
                }
            },
            {
                path: "/admin/goods/list",
                name: "admin_goods_list",
                component: () => import("@/views/admin/goods/list"),
                meta: {
                    bread: ['商品管理', '商品列表']
                }
            },{
                path: "/admin/goods/create",
                name: "admin_goods_create",
                component: () => import("@/views/admin/goods/create"),
                meta: {
                    bread: ['商品管理', '商品添加']
                }
            }
        ]
    }
]