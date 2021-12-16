<template>
  <div class="breadcrumb-content">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, i) in breadcrumbs" :key="i">
        <router-link v-if="item.path" :to="item.path">{{ item.text }}</router-link>
        <a v-else-if="item.go" @click="back(item.go)">{{ item.text }}</a>
        <span v-else>{{ item.text }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    pathTo(item) {
      const path = item.path
      if (typeof path === 'number') {
        this.$router.go(path)
      } else if (typeof path === 'string') {
        this.$router.push(path)
      }
    },
    back(go) {
      this.$router.go(go)
    }
  }
}
</script>
<style scoped lang="less">
.breadcrumb-content {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 30px;
}
</style>
