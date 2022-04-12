<template>
  <div class="layout_main">
    <div v-if="showMenu" class="nav-content head_fixed">
      <div class="head_base">
        <div class="head_logo">
          <img src="~@/assets/image/head_logo.png" class="logo" alt="logo" @click="goto('/home')" />
        </div>
        <div class="head_router">
          <div
            v-for="(item, index) in menus"
            :key="index"
            class="router_base"
            :span="4"
            @click="goto(item.path, index)"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="head_user">
          <right-info
            :currentUser="currentUser"
            :menu="showMenu"
            :marginRightConsole="marginRightConsole"
            :fontSize="fontSize"
          ></right-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import { constantRouterMap } from '@/config/router.config'
import RightInfo from '@/components/FixedUser/RightInfo'
import GlobalFooter from '@/components/FixedUser/GlobalFooter'
import { mapState } from 'vuex'
export default {
  name: 'FixedLayout',
  components: {
    RightInfo,
    GlobalFooter,
  },
  data() {
    return {
      // base
      menus: [
        {
          name: '首页',
          path: '/home',
        },
        {
          name: '实验资源',
          path: '/labsource',
        },
        {
          name: '实验床',
          path: '/labcombo',
        },
        // {
        //   name: '合伙人',
        //   path: '',
        // },
        // {
        //   name: '支持帮助',
        //   path: '',
        // },
        // {
        //   name: '圈子',
        //   path: '',
        // },
        {
          name: '关于我们',
          path: '/about',
        },
      ],
      // 是否显示返回顶部
      clickflag: 0,
      showMenu: !window.__POWERED_BY_QIANKUN__,
      fontSize: '14',
      marginRightConsole: '40', // 子组件控制台的右边距
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      currentUser: (state) => state.user.info,
    }),
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    // 表头的路由跳转
    goto(path, index = 0) {
      if (path) {
        this.clickflag = index
        this.$router.push(path)
      }
      // this.clickflag = index
      // this.$router.push(path)
    },
  },
}
</script>

<style lang="less" scoped>
// @import '../components/index.less';
@import '../../../components/index.less';
.layout_main {
  min-width: 1640px;
  min-height: 100vh;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: auto;
  -moz-flex: auto;
  flex: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #f0f2f5;
}
.nav-content {
  width: 100%;
  background: rgba(34, 155, 214, 1);
  display: flex;
  justify-content: center;
}
.content_main {
  flex: auto;
  -ms-flex: auto;
  -moz-flex: auto;
  min-height: calc(100vh - 98px);
}
.head_fixed {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  -ms-backdrop-filter: blur(8px);
  -moz-backdrop-filter: blur(8px);
  transition: background 0.3s;
  border-bottom: 1px solid rgba(61, 61, 61, 0.15);
  ul {
    background: hsla(0, 0%, 100%, 0.1);
    height: 100%;
    margin: 0;
  }
}
.head_base {
  top: 0;
  left: 0;
  // width: 100%;
  // width: 1200px;
  min-width: 1200px;
  // background: red;
  // min-width: 1440px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
// 首页有滚动条，每个部分不要用百分比，设置最小宽度
.head_logo {
  min-width: 140px;
  // margin-left: 150px;
  padding-left: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .logo {
    width: 124px;
    height: 30px;
    cursor: pointer;
  }
  .f-logo {
    height: 40px;
    width: auto;
    border-left: 1px solid rgba(255,255,255,0.7);
    margin-left: 18px;
    padding-left: 10px;
    img {
      height: 40px;
      width: auto;
      cursor: pointer;
    }
  }
}
.head_router {
  position: relative;
  min-width: 420px;
  height: 100%;
  margin-left: 42px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .hover_header {
    display: none;
    background-color: #273865;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #ffffff;
    padding: 4px 0px;
    position: absolute;
    transform: translate(0, -10px);
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    z-index: 999; /* 避免被其他遮蔽 */
    .hover_each {
      text-align: center;
      height: 22px;
      line-height: 22px;
      padding: 0 9px;
    }
    .hover_each:hover {
      cursor: default;
      background: @font-hover;
    }
  }
  .router_base {
    position: relative;
    cursor: default;
    height: 100%;
    line-height: 60px;
    margin: 0 24px;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    &:hover {
      color: @font-hover;
    }
    .custom_icon {
      position: relative;
      font-size: 16px;
      margin-left: 1px;
      display: inline-block;
    }
    // 下拉的箭头
    .custom_icon::before {
      content: '';
      width: 8px;
      height: 8px;
      border: solid @font-hover;
      border-width: 1px 0 0 1px;
      transform: translate(-50%, -50%) rotate(-135deg);
      transition: all 0.8s ease 0s;
      position: absolute;
      left: 8px;
      top: -4px;
    }
  }
  // 悬浮箭头向上
  .router_base:hover {
    .custom_icon::before {
      content: '';
      width: 8px;
      height: 8px;
      border: solid @font-hover;
      border-width: 1px 0 0 1px;
      transform: translate(-50%, -50%) rotate(45deg);
      position: absolute;
      left: 8px;
      top: -4px;
    }
    .hover_header {
      display: block;
    }
  }
}
.head_user {
  height: 100%;
  min-width: 200px;
  // margin-right: 120px;
}
</style>
