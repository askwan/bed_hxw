<template>
  <div class="configure-server">
    <div class="image">
      <img alt="example" class="result_img" src="~@/assets/image/product/cloudServer/paySuccess.png" />
    </div>
    <div class="info">
      <div>您的订单已支付成功</div>
    </div>
    <div class="button">
      <a-button type="primary" class="button_order" @click.stop.prevent="gotoOrder()">
        查看订单
      </a-button>
      <a-button type="primary" class="button_use" @click.stop.prevent="gotoUse()">
        去使用
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderResult',
  components: {},
  methods: {
    gotoOrder() {
      this.$router.push({ path: '/account/order' })
    },
    gotoUse() {
      this.$router.push({ path: '/lab/bed' })
    }
  }
}
</script>

<style lang="less" scoped>
.configure-server {
  width: 100%;
  min-height: calc(100vh - 60px);
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  background-color: #ffffff;
  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    .result_img {
      margin-top: 204px;
    }
  }
  .info {
    display: flex;
    justify-content: center;
    margin-top: 17px;
    font-size: 16px;
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    .button_order {
      width: 140px;
      height: 40px;
      border-radius: 2px;
      border: solid 1px #33b0ed;
      background-color: #fff;
      color: #33b0ed;
      margin-right: 24px;
      font-size: 16px;
    }
    .button_use {
      width: 140px;
      height: 40px;
      background-color: #33b0ed;
      border-radius: 2px;
      font-size: 16px;
    }
  }
}
</style>
