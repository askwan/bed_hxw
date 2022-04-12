# vuecli-project

### 使用说明

##### 修改实验床配置名称

在`.env.development`和`.env.production`文件下修改`VUE_APP_BASE_URL`参数

```
VUE_APP_BASE_URL = '/[实验床名称]/'
```

##### 启动项目

```
npm install

npm run serve
```

##### 配置路由

在`/src/config/router.config.js`下配置路由信息，自己开发的动态路由放在asyncRouterMap数组中

```
{
    path: '/', 				//无特殊要求不要修改
    component: Layout,		//无特殊要求不要修改
    redirect: '/introduce',	
    hidden: true,
    children:[
    	{
    		path: 'introduce', 									//路由地址
            name: 'bed_introduce', 								//路由名称
            meta: { title: '产品介绍' },						 //页面参数见说明
            component: () => import('@/views/Introduce.vue')	//页面路径
    	}
    ]
}
/*
	说明
	title===>页面名称,
	hiddenSideBar ===> 是否隐藏左侧侧边栏，默认false
*/
```

##### 服务配置
###### 开发环境api反向代理
在`vue.config.js`下修改配置信息

```
devServer:{
    ...
    proxy:{
        /api/sub/[实验室名称]:{
            target: '[服务地址]',
            changeOrigin: true,
            pathRewrite: {
                '^/api/sub/[实验室名称]':''
            }
        }
    },
}
```

##### 封装api调用函数

在`/src/api`文件夹下创建调用文件，也可按照'/src/utils/request'模板重新封装一个axios请求模板使用

```
import request from '@/utils/request'

export function sendMessage(parameter) {
  return request({
    url: '/sub/[实验室名称]/[服务接口]',
    methods:'post',
    data: parameter
  })
}

```
注：由于框架需要调用onelab接口统一请求用户数据，请勿改动原'/src/utils/request'模板



