<template>
  <div class="main_footer">
    <div class="count_amount">
      <div class="count_amount_outter">
        <div class="count_amount_block">
          <span class="count_amount_block_explain">实付费用：</span>
          <span class="count_amount_block_num">{{ formatNumber(moneyCount) }}</span>
          <span class="count_amount_block_unit">算力豆</span>
        </div>
      </div>
      <a-button class="count_amount_button" @click="handleCurrentStepBeforePay">
        提交订单
      </a-button>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '../../../utils/util'

export default {
  name: 'CountFooterAll',
  components: {},
  props: {
    // 总费用
    moneyCount: {
      type: Number,
      default: 0
    },
    // 计价方式
    tabKey: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    formatNumber,
    handleCurrentStepBeforePay() {
      this.$emit('handleCurrentStepBeforePay')
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
    .count_amount_outter {
      margin-right: 82px;
      .count_amount_block {
        display: flex;
        align-items: flex-end;
        font-size: 14px;
        color: #333333;
        .count_amount_block_explain {
          margin: 0 12px 3px 0;
          line-height: 14px;
          height: 14px;
          font-size: 14px;
        }
        .count_amount_block_num {
          font-size: 30px;
          line-height: 30px;
          height: 30px;
          color: #fa7321;
          margin-right: 4px;
        }
        .count_amount_block_unit {
          font-size: 12px;
          line-height: 12px;
          height: 12px;
          margin-bottom: 3px;
        }
      }
    }
    .count_amount_button {
      width: 140px;
      height: 40px;
      font-size: 16px;
      background-color: #33b0ed;
      color: #ffffff;
      border-radius: 2px;
    }
  }
}
</style>
