<template>
  <div class="main_footer">
    <div class="count_amount">
      <a-button class="count_amount_button count_amount_future" @click="payFuture">
        暂不支付
      </a-button>
      <a-button v-if="buttonDisable" class="count_amount_button count_amount_now" @click="handleCurrentStep">
        确认支付
      </a-button>
      <a-button v-else class="count_amount_button count_amount_disable">
        确认支付
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountFooterPay',
  components: {},
  props: {
    canPayCount: {
      type: Boolean,
      default: false
    },
    canPayPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    buttonDisable() {
      const result = this.canPayCount && this.canPayPassword
      return result
    }
  },
  methods: {
    payFuture() {
      this.$router.push({ path: '/account/order' })
    },
    handleCurrentStep() {
      this.$emit('handleCurrentStepBeforeSuccess')
    }
  }
}
</script>

<style lang="less" scoped>
.main_footer {
  height: 116px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #ffffff;
  box-shadow: 0px -3px 20px 0px rgba(0, 0, 0, 0.07);
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  .count_amount {
    display: flex;
    align-items: center;
    margin-right: 30px;
    .count_amount_button {
      width: 140px;
      height: 40px;
      font-size: 16px;
      border-radius: 2px;
    }
    .count_amount_future {
      color: #33b0ed;
      background-color: #ffffff;
      margin-right: 24px;
    }
    .count_amount_now {
      color: #ffffff;
      background-color: #33b0ed;
    }
    .count_amount_disable {
      color: #aeb1b2;
      background-color: #ebecec;
    }
    .count_amount_disable:hover {
      cursor: default;
    }
  }
}
</style>
