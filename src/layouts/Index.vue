<template>
  <div class="bed fill">
    <a-layout :class="{ 'mero-mode': !showMenu }">
      <a-layout-header v-if="showMenu" class="nav-sider">
        <layout-nav />
      </a-layout-header>
      <a-layout class="box">
        <a-layout-sider v-if="!hiddenSide" class="left-sider">
          <layout-side-bar />
        </a-layout-sider>
        <a-layout-content>
          <div
            v-if="breadcrumbs.length"
            class="breadcrum"
            :class="{ 'bread-auto': breadcrumbs.length && hiddenSide, 'full-width': fullWidth }"
          >
            <layout-breadcrumb :breadcrumbs="breadcrumbs" />
          </div>
          <div
            id="app-content"
            class="fill app-content"
            :class="{
              'breadcrumbs-height': breadcrumbs.length && hiddenSide,
              'bread-height': breadcrumbs.length,
              'full-width': fullWidth
            }"
          >
            <div class="bg0 fill">
              <router-view @change_width="change_width"></router-view>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  components: {
    LayoutNav: () => import('@/components/NavBar'),
    LayoutBreadcrumb: () => import('./LayoutBreadcrumb'),
    LayoutSideBar: () => import('./LayoutSideBar')
  },
  data() {
    return {
      breadcrumbs: [],
      hiddenSide: false,
      fullWidth: false,
      showMenu: !window.__POWERED_BY_QIANKUN__
    }
  },
  watch: {
    $route(to) {
      this.setBreadcrumbs(to)
    }
  },
  mounted() {
    this.setBreadcrumbs()
  },
  methods: {
    resetView() {
      // const dom = document.getElementById('app-content')
      // console.log(dom)
    },
    setBreadcrumbs(route) {
      let to = this.$route
      if (route) {
        to = route
      }
      this.hiddenSide = Boolean(to.meta.hiddenSideBar)
      if (to.meta && to.meta.breadcrumbs instanceof Array) {
        this.breadcrumbs = to.meta.breadcrumbs
      } else {
        this.breadcrumbs = []
      }
    },
    change_width(full) {
      if (full) this.fullWidth = true
      else this.fullWidth = false
    }
  }
}
</script>
<style scoped lang="less">
@page-width: 1200px;
@height: calc(100vh - 60px);
/deep/ .ant-layout {
  margin-top: -1px;
  height: 100vh;
  overflow-y: auto;
}

.mero-mode {
  height: 100%;
}

.bed /deep/ .ant-layout-content {
  padding-right: 14px;
}
.nav-sider {
  background: #1b2c58;
  height: 60px;
  min-width: 1280px;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: auto;
  -moz-flex: auto;
  flex: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 0;
}
.left-sider {
  background: #fff;
  width: 260px;
  max-width: 220px !important;
  min-width: 240px !important;
}
.app-content {
  display: grid;
  // min-height: 100%;
  height: 100%;
  padding: 16px 0 16px 16px;
}
.breadcrumbs-height {
  width: @page-width;
  min-width: @page-width;
  margin: 0 auto;
  background: #fff;
}
.bread-height {
  // height: ~'calc(@{height} - 80px)';
  margin-top: 50px;
}
.breadcrumbs-height.bread-height {
  margin-top: 0;
}
.breadcrum {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 50px;
  margin-bottom: 0;
}
.bread-auto {
  position: relative;
  width: @page-width;
  min-width: @page-width;
  margin: 20px auto;
  margin-bottom: 0;
}
.breadcrum.full-width {
  margin-top: 0;
  width: 100%;
}
.app-content.full-width {
  width: 100%;
}
.bed {
  min-width: 1280px;
}
.box {
  // padding: 0 14px;
  // padding-left: 14px;
}
</style>
