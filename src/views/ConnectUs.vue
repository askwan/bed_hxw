<template>
  <div class="connect-us">
    <div class="bed-bread mb bg-white">
      <span class="span">联系我们</span>
    </div>
    <div class="bed-content">
      <div class="conent-span pip-mb">
        实验床联系人：
      </div>
      <div class="bg-content">
        苏老师 邮箱：service@ictnj.ac.cn
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.connect-us {
  height: 100%;
}
.bg-white {
  background: #fff;
}
.mb {
  margin-bottom: 8px;
}
.pip-mb {
  margin-bottom: 25px;
}
.bed-bread {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  .span {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
}
.bed-content {
  padding: 25px;
  background: #fff;
  height: calc(100% - 70px);
  overflow: hidden;
}
.conent-span {
  font-size: 14px;
}
.bg-content {
  background: #f6f8fe;
  padding: 14px;
  font-size: 14px;
  width: 700px;
}
</style>
