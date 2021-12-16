<template>
  <div class="count_input">
    <count-input
      class="count_input_block"
      :maxValue="99"
      :minValue="1"
      :require="true"
      :err.sync="countErrMonthNum"
      @handleInputValue="handleCountNum"
    />
    <span>台({{ stationValue.name }})</span>
  </div>
</template>

<script>
import CountInput from '../../../CountInput'
export default {
  name: 'ServerItem',
  components: {
    CountInput
  },
  props: {
    /**
     * 站点值，必须
     */
    stationValue: {
      type: Object,
      default: () => ({})
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
    // 机器数量--多少台
    handleCountNum(value) {
      const numsValue = {
        num: value,
        sid: this.stationValue.key
      }
      this.numsValue = value
      this.$emit('handleCountNum', numsValue)
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
