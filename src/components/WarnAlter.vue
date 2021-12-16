<template>
  <div :style="{ marginLeft: marginLeft + 'px' }" class="warn-alter">
    <div class="inner-content">
      <img src="~@/assets/image/product/cloudServer/warnInfo.png" class="inner-content-img" alt="logo" />
      <div><slot name="extra"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarnAlter',
  props: {
    marginLeft: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style lang="less" scoped>
.warn-alter {
  height: 14px;
  line-height: 14px;
  color: #fd3939;
  font-size: 14px;
  .inner-content {
    display: flex;
    align-items: center;
    .inner-content-img {
      margin-right: 4px;
    }
  }
}
</style>
