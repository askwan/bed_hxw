<template>
  <div class="lab fill">
    <a-layout v-if="layout === 1">
      <a-layout>
        <a-layout-sider v-if="!hiddenSide" class="left-sider">
          <layout-side-bar />
        </a-layout-sider>
        <a-layout-content>
          <div v-if="breadcrumbs.length" class="breadcrumb" :class="{ 'bread-auto': breadcrumbs.length && hiddenSide }">
            <layout-breadcrumb :breadcrumbs="breadcrumbs" />
          </div>
          <div
            class="fill app-content"
            :class="{ 'breadcrumbs-height': breadcrumbs.length && hiddenSide, 'bread-height': breadcrumbs.length }"
          >
            <div class="bg0 fill auto-y">
              <router-view></router-view>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout v-else-if="layout === 2">
      <a-layout>
        <a-layout-content class="bg0">
          <div class="bg0 border-bottom">
            <div
              v-if="breadcrumbs.length"
              class="breadcrumb"
              :class="{ 'bread-auto': breadcrumbs.length && hiddenSide }"
            >
              <layout-breadcrumb :breadcrumbs="breadcrumbs" />
            </div>
          </div>
          <div class="fill app-content-2 breadcrumbs-height">
            <div class="bg0 fill auto-y">
              <router-view></router-view>
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
    LayoutBreadcrumb: () => import('./Lab/Layout/LayoutBreadcrumb'),
    LayoutSideBar: () => import('./Lab/Layout/LayoutSideBar')
  },
  data() {
    return {
      breadcrumbs: [],
      hiddenSide: false,
      layout: 1
    }
  },
  watch: {
    $route(to) {
      this.setBreadcrumbs(to)
    }
  },
  mounted() {
    this.setBreadcrumbs()
    // 获取实验室用户列表
    this.$store.dispatch('lab/GETLABUSERS')
  },
  methods: {
    setBreadcrumbs(route) {
      let to = this.$route

      if (route) {
        to = route
      }
      this.hiddenSide = Boolean(to.meta.hiddenSideBar)
      this.layout = to.meta.layout || 1
      if (to.meta && to.meta.breadcrumbs instanceof Array) {
        this.breadcrumbs = to.meta.breadcrumbs
      } else {
        this.breadcrumbs = []
      }
    }
  }
}
</script>
<style scoped lang="less">
@page-width: 1200px;
@height: calc(100vh - 64px);
.nav-sider {
  background: #1b2c58;
  // overflow-y: auto;
  // overflow-x: hidden;
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
  // background: #f0f2f5;
  padding: 0;
}
.left-sider {
  height: @height;
  background: #fff;
  width: 160px;
  max-width: 160px !important;
  min-width: 160px !important;
}
.app-content {
  padding: 20px;
  height: @height;
  overflow: auto;
  // background: #fff;
}
.app-content-2 {
  height: @height;
  overflow: auto;
}
.bg0 {
  background: #fff;
}
.breadcrumbs-height {
  height: ~'calc(@{height} - 80px)';
  width: @page-width;
  margin: 0 auto;
  background: #fff;
}
.bread-height {
  height: ~'calc(@{height} - 50px)';
}
.breadcrumb {
  height: 50px;
  margin-bottom: 0;
}
.bread-auto {
  width: @page-width;
  margin: 0px auto;
}
.lab {
  margin-top: 63px;
  min-width: 1600px;
  overflow: hidden;
}
.auto-y {
  overflow-y: auto;
}
.border-bottom {
  border-bottom: 1px solid #f1f1f1;
}
</style>
