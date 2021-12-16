<template>
  <div class="side-bar">
    <div class="account_settings_info">
      <a-dropdown :trigger="['click']">
        <a-tooltip placement="right" :title="username">
          <div class="account_settings_info_name">
            <span class="text-ellipsis">{{ username }}</span>
            <a-icon class="middle" type="caret-down" />
          </div>
        </a-tooltip>
        <a-menu slot="overlay">
          <a-menu-item v-for="item in c_userList" :key="item.id" @click="handleSelectUser(item)">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-menu
      mode="inline"
      :selectedKeys="selectedKeys"
      type="inner"
      class="accout_menu"
      @openChange="onOpenChange"
      @click="handleClick"
    >
      <!-- <a-menu-item key="/lab/cockpit">
        <router-link to="/lab/cockpit">
          <span class="menu_account_title">实验室概览</span>
        </router-link>
      </a-menu-item> -->
      <a-menu-item key="/lab/list">
        <router-link to="/lab/list">
          <span class="menu_account_title">我的项目</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu v-if="mySelf" key="source">
        <span slot="title" class="menu_account_title">我的资源</span>
        <a-menu-item key="/lab/hashrate">
          <router-link to="/lab/hashrate">
            <span class="menu_account_title">算力</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/lab/algorithm">
          <!-- <router-link to="/lab/algorithm"> -->
          <span class="menu_account_title">算法</span>
          <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="/lab/sourcedata">
          <!-- <router-link to="/lab/sourcedata"> -->
          <span class="menu_account_title">数据</span>
          <!-- </router-link> -->
        </a-menu-item>
        <a-menu-item key="/lab/bed">
          <router-link to="/lab/bed">
            <span class="menu_account_title">实验床</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-if="mySelf" key="/lab/personal_manage">
        <router-link to="/lab/personal_manage">
          <span class="menu_account_title">人员管理</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/lab/code_manage">
        <!-- <router-link to="/lab/code_manage"> -->
        <span class="menu_account_title">代码管理</span>
        <!-- </router-link> -->
      </a-menu-item>
      <a-menu-item v-if="mySelf" key="/lab/mirror">
        <router-link to="/lab/mirror">
          <span class="menu_account_title">镜像管理</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
/* eslint-disable */
export default {
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      currentUser: null,
      currentUserId: null
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState('lab', ['labUserList']),
    username() {
      if (this.currentUserId === this.userInfo.userId) return '我的实验室'
      let id = this.currentUserId || this.userInfo.userId
      let result = this.labUserList.find(el => el.id === id)
      if (result) return result.name + '的实验室'
      return 'UNKnown'
    },
    c_userList(){
      let users = [...this.labUserList]
      // console.log(users)
      if(!this.mySelf) {
        users = [{name:'我的实验室'},...users]
      }
      return users
    },
    mySelf() {
      // if(!this.labUserList.length) return true
      return this.currentUserId === this.userInfo.userId
      // let result = this.labUserList.find(el=>el.id === this.userInfo.userId)
      // return Boolean(result)
    }
  },
  mounted() {
    this.updateMenu()
    const query = this.$route.query
    if (query.userid) {
      this.currentUserId = Number(query.userid)
    } else {
      this.currentUserId = this.userInfo.userId
    }
  },
  methods: {
    onOpenChange(openKeys) {
      this.openKeys = openKeys
    },
    handleClick(item) {
      const unReadyList = ['/lab/code_manage','/lab/algorithm','/lab/sourcedata']
      if (unReadyList.find(el=>el === item.key)) {
        this.$notification.info({
          message: '建设中...',
          description: '该功能正在建设中'
        })
        return
      }
      this.selectedKeys = [item.key]
    },
    updateMenu() {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
    },
    handleSelectUser(item) {
      // window.sessionStorage.setItem('userid',item.id)
      // this.currentUser = item
      console.log(item,'ddddddddd')
      let userid = item.id
      if(item.name === '我的实验室' ){
        userid = undefined
      }
      
      const routeData = this.$router.resolve({
        path: '/lab/list',
        query: {
          userid
        }
      })
      window.location.href = routeData.href
    }
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('userid')
  }
}
</script>
<style scoped lang="less">
.account_settings_info {
  height: 98px;
  // padding: 30px 53px 50px 53px;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .account_settings_info_name {
    height: 18px;
    font-size: 18px;
    width: 140px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
    cursor: pointer;
    text-align: center;
    span {
      display: inline-block;
      max-width: 120px;
    }
    &:hover {
      color: #33b0ed;
    }
  }
}
.accout_menu {
  background-color: #fff;
  width: 160px;
  .menu_account_title {
    height: 16px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 16px;
    letter-spacing: 0px;
    color: #333333;
  }
  /deep/.ant-menu-item {
    width: 160px;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    margin: 0;
  }
  /deep/.ant-menu-item > a {
    height: 100%;
    display: block;
    color: #dee7fe;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  /deep/.ant-menu-item-selected {
    background-color: #f0f6fe;
  }
  /deep/.ant-menu-item::after {
    position: absolute;
    top: 16px;
    right: 0;
    bottom: 0;
    height: 16px;
    border-right: 3px solid #33b0ed;
    content: '';
  }
}
.middle {
  vertical-align: top;
}
</style>
