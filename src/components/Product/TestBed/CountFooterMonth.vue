<template>
  <div class="main_footer">
    <div class="count_outter">
      <div class="count_input count_input_first">
        <span class="count_input_title">购买时长：</span>
        <count-input
          class="count_input_block"
          :maxValue="36"
          :minValue="1"
          :require="true"
          :err.sync="countErrMonthTime"
          @handleInputValue="handleCountTime"
        />
        <span>月</span>
      </div>
      <div style="display: flex;margin-right: 40px;">
        <span class="count_input_title">服务器数量：</span>
        <div v-for="item in selStationList" :key="item.key" class="count_input">
          <server-item :station-value="item" @handleCountNum="handleCountNum"></server-item>
        </div>
      </div>
    </div>
    <div class="count_amount">
      <div class="count_amount_outter">
        <div class="count_amount_block count_amount_block_first">
          <span class="count_amount_block_explain">配置费用：</span>
          <span class="count_amount_block_num">{{ formatNumber(baseCount) }}</span>
          <span class="count_amount_block_unit">算力豆</span>
        </div>
        <div v-if="flexibleIp || ceniNet" class="count_amount_block">
          <span class="count_amount_block_explain">宽带费用：</span>
          <span class="count_amount_block_num">{{ formatNumber(broadbandCount) }}</span>
          <span class="count_amount_block_unit">算力豆</span>
        </div>
      </div>
      <a-button class="count_amount_button" @click="handleCurrentStepBeforeCheck">
        立即购买
      </a-button>
    </div>
  </div>
</template>

<script>
import CountInput from '../../CountInput'
import { formatNumber } from '../../../utils/util'
import ServerItem from './childComp/ServerItem'
export default {
  name: 'CountFooterMonth',
  components: {
    ServerItem,
    CountInput
  },
  props: {
    // 配置费用（包含存储+规格）
    baseCount: {
      type: Number,
      default: 0
    },
    // 规格费用
    specFee: {
      type: Number,
      default: 0
    },
    // 存储费用
    storageCount: {
      type: Number,
      default: 0
    },
    // 宽带费用
    broadbandCount: {
      type: Number,
      default: 0
    },
    // 宽带是否选择
    flexibleIp: {
      type: Number,
      default: null
    },
    ceniNet: {
      type: Number,
      default: null
    },
    selStationList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      monthsValue: 1,
      numsValue: 1,
      // 自定义数字输入必填项校验
      countErrMonthTime: false,
      countErrMonthNum: false
    }
  },
  methods: {
    formatNumber,
    // 周期的时长--多少个月
    handleCountTime(value) {
      const monthsValue = value
      this.monthsValue = monthsValue
      this.$emit('handleCountMonth', monthsValue, this.numsValue)
    },
    // 机器数量--多少台
    handleCountNum(value) {
      const numsValue = value
      console.log(value)
      this.numsValue = numsValue.num
      this.$emit('handleCountMonth', this.monthsValue, numsValue.num, numsValue.sid)
    },
    handleCurrentStepBeforeCheck() {
      this.$emit('handleCurrentStepBeforeCheck')
    }
  }
}
</script>

<style lang="less" scoped>
.main_footer {
  height: 116px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px -3px 20px 0px rgba(0, 0, 0, 0.07);
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  .count_outter {
    margin-left: 60px;
    .count_input {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 14px;
      color: #333333;
      .count_input_title {
        width: 90px;
      }
      .count_input_block {
        margin: 0 5px 0 18px;
      }
    }
    .count_input_first {
      margin-bottom: 16px;
    }
  }
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
          margin: 0 12px 0 0;
          line-height: 14px;
        }
        .count_amount_block_num {
          font-size: 16px;
          line-height: 16px;
          color: #fa7321;
          margin-right: 4px;
        }
        .count_amount_block_unit {
          font-size: 12px;
          line-height: 12px;
          margin-bottom: 0;
        }
      }
      .count_amount_block_first {
        margin-bottom: 22px;
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
