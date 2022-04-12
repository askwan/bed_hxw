<template>
  <div class="side-bar">
    <div class="account_settings_info">
      <div class="account_settings_info_name">
        <img src="@/assets/intelligent-network-lab-imgs/lab-icon.jpg" width="55" alt="">
        <span class="text-ellipsis">智能核心网实验床</span>
      </div>
      <div class="account_settings_info_divider"></div>
    </div>
    <a-menu
      mode="inline"
      :selectedKeys="selectedKeys"
      type="inner"
      class="accout_menu"
      :open-keys.sync="openKeys"
      @openChange="onOpenChange"
      @click="handleClick"
    >
      <a-menu-item key="/introduce">
        <router-link :to="{ name: 'bed_introduce' }">
          <span class="menu_account_title">首页介绍</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/source">
        <router-link :to="{ name: 'bed_source', query: { productId: 18, productName: '智能核心网实验床' } }">
          <span class="menu_account_title">申请资源</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openKeys: ['source'],
      selectedKeys: []
    }
  },
  computed: {},
  watch: {
    $route() {
      this.updateMenu()
    }
  },
  mounted() {
    this.updateMenu()
  },
  methods: {
    onOpenChange(openKeys) {
      this.openKeys = openKeys
    },
    handleClick(item) {
      this.selectedKeys = [item.key]
    },
    updateMenu() {
      const routes = this.$route.matched.concat()
      let key = routes.pop().path
      if (key === '/join_us/form') {
        key = '/join_us'
      }
      this.selectedKeys = [key]
    }
  }
}
</script>
<style scoped lang="less">
.account_settings_info {
  background-color: #fff;
  height: 180px;
  // padding: 30px 53px 50px 53px;
  padding: 30px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .account_settings_info_name {
    font-size: 18px;
    width: 140px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      margin-bottom: 17px;
    }
    span {
      display: inline-block;
      max-width: 140px;
      font-size: 16px;
    }
  }
  .account_settings_info_divider {
    width: 120px;
    height: 1px;
    background-color: #edeff5;
  }
}
.accout_menu {
  background-color: #fff;
  width: 240px;
  box-shadow: none;
  border: none;
  .menu_account_title {
    height: 14px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    letter-spacing: 0px;
    color: #333333;
  }
  /deep/.ant-menu-item {
    width: 240px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    margin: 0;
    padding-left: 16px !important;
    display: flex;
    justify-content: center;
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
    .menu_account_title {
      color: #33b0ed;
    }
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
