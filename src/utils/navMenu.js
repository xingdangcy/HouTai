export default [
    {
        name: "首页",
        children:[
            {
                name: '后台首页',
                icon: "el-icon-s-home",
                url: "/admin/index",
            },
            {
                name: '相册管理',
                icon: "el-icon-picture",
                url: "/admin/picture",
            }
        ]
    },
    {
        name: "商品",
        children:[
            {
                name: '商品列表',
                icon: "el-icon-s-data",
                url: "/admin/goods/list",
            },
            {
                name: '分类列表',
                icon: "el-icon-s-help",
                url: "/admin/index",
            }
        ]
    },
    {
        name: "订单",
        children:[
            {
                name: '订单管理',
                icon: "el-icon-s-order",
                url: "/admin/index",
            },
            {
                name: '发票管理',
                icon: "el-icon-s-order",
                url: "/admin/index",
            }
        ]
    },
    {
        name: "会员",
        children:[
            {
                name: '会员列表',
                icon: "el-icon-user",
                url: "/admin/user",
            },
        ]
    },
    {
        name: "设置",
        children:[
            {
                name: '基础设置',
                icon: "el-icon-setting",
                url: "/admin/setting",
            },
        ]
    },
]