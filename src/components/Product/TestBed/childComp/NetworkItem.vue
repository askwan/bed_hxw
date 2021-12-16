<template>
  <div class="network">
    <div class="network-station">
      <a-checkbox :checked="isDisplay" @change="onCheckChange">
        {{ stationValue.name }}
      </a-checkbox>
    </div>
    <div class="network-main" :style="{ display: isDisplay ? 'block' : 'none' }">
      <div class="network-main-container">
        <div class="title">公网IP（个）</div>
        <count-input
          class="count-input"
          :maxValue="maxIpNum"
          :minValue="1"
          :defaultValue="maxIpNum"
          :width="120"
          :require="true"
          err.sync="false"
          @handleInputValue="handleIpSize"
        />
      </div>

      <div class="network-main-container">
        <div class="title">公网宽带（Mbps）</div>
        <count-input
          class="count-input"
          :maxValue="1000"
          :minValue="1"
          :defaultValue="1"
          :width="120"
          :require="true"
          :err.sync="countErrBand"
          @handleInputValue="handleBandSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CountInput from '../../../CountInput'
export default {
  name: 'NetworkItem',
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
    },
    /**
     * 站点值，必须
     */
    dataList: {
      type: Array,
      default: () => []
    },
    /**
     * 最小值，非必须
     */
    minValue: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      countErrIP: false,
      countErrBand: false,
      ipSize: 1,
      bandSize: 1,
      isDisplay: true,
      maxIpNum: 1
    }
  },
  watch: {
    // AI标签
    dataList: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      newValue.forEach(e => {
        if (e.stationId == this.stationValue.key) {
          this.maxIpNum = e.serverNum
        }
      })
    }
  },
  methods: {
    handleIpSize(value, tag) {
      this.ipSize = value
      const obj = {
        stationId: this.stationValue.key,
        ipSize: this.ipSize,
        bandSize: this.bandSize
      }
      this.dataList.forEach(e => {
        if (e.stationId == this.stationValue.key) {
          if (e.networkNumber >= this.maxIpNum && tag == 'plus')
            this.$message.warn(
              '所选公网IP（' + e.stationName + '）数量，不能大于当前所选云服务器（' + e.stationName + '）数量',
              3
            )
        }
      })
      this.$emit('handleNetworkValue', obj, true)
    },
    handleBandSize(value) {
      this.bandSize = value
      const obj = {
        stationId: this.stationValue.key,
        ipSize: this.ipSize,
        bandSize: this.bandSize
      }
      this.$emit('handleNetworkValue', obj, true)
    },
    onCheckChange(e) {
      console.log(e.target.checked)
      this.isDisplay = e.target.checked
      const obj = {
        stationId: this.stationValue.key,
        ipSize: this.ipSize,
        bandSize: this.bandSize
      }
      this.$emit('handleNetworkValue', obj, e.target.checked)
      if (e.target.checked) {
        this.$emit('handleFlexibleIpSize', this.ipSize)
      } else {
        this.countErrIP = false
        this.$emit('handleFlexibleIpSize', null)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.network {
  width: 299px;
  //height: 156px;
  .network-station {
    display: flex;
    align-items: center;
    width: 299px;
    height: 36px;
    border-radius: 2px;
    border: solid 1px #e1e5ee;
    margin-bottom: 4px;
    .ant-checkbox-wrapper {
      margin-left: 20px;
    }
  }
  .network-main {
    width: 299px;
    height: 116px;
    border-radius: 2px;
    border: solid 1px #e1e5ee;
    padding: 18px 20px 18px 20px;
    .network-main-container {
      display: flex;
      position: relative;
      width: 259px;
      height: 30px;
      margin-bottom: 20px;
      .tilte {
        font-size: 12px;
        line-height: 12px;
        color: #333333;
      }
      .count-input {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
