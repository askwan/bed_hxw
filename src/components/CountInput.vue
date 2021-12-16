<template>
  <div class="count_input_out">
    <div class="count_input_main">
      <a-input
        :defaultValue="defaultValue"
        :value="inputValue"
        :style="{ width: width + 'px' }"
        @change="handleInputChange"
        @blur="handleTagInputConfirm"
      >
        <a-icon slot="prefix" type="minus" @click="minusNum()" />
        <a-icon slot="suffix" type="plus" @click="plusNum()" />
      </a-input>
    </div>
    <div v-if="require && err" class="count_input_warn">
      {{ errInfo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountInput',
  props: {
    /**
     * 最大值，非必须
     */
    maxValue: {
      type: Number,
      default: 999
    },
    /**
     * 最小值，非必须
     */
    minValue: {
      type: Number,
      default: 1
    },
    /**
     * 默认值，非必须
     */
    defaultValue: {
      type: Number,
      default: 1
    },
    /**
     * 输入框的宽度，非必须
     */
    width: {
      type: Number,
      default: 117
    },
    /**
     * 是否是必填项，非必须
     */
    require: {
      type: Boolean,
      default: false
    },
    /**
     * require搭配，回调是否发生错误
     */
    err: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.defaultValue,
      errInfo: ''
    }
  },
  created() {},
  methods: {
    handleInputChange(e) {
      let errHas = true
      if (e.target.value !== '' && !/(^[1-9]\d*$)/.test(e.target.value)) {
        this.inputValue = this.defaultValue
        this.errInfo = '请输入正整数'
      } else if (e.target.value === '') {
        this.inputValue = e.target.value
        this.errInfo = '请输入正整数'
      } else if (parseInt(e.target.value) < parseInt(this.minValue)) {
        this.inputValue = e.target.value
        this.errInfo = '输入不能少于' + this.minValue
      } else if (parseInt(e.target.value) > parseInt(this.maxValue)) {
        this.inputValue = e.target.value
        this.errInfo = '输入不能大于' + this.maxValue
      } else {
        this.inputValue = e.target.value
        errHas = false
      }
      if (this.require) {
        // 回调报错信息
        this.$emit('update:err', errHas)
      }
      this.$forceUpdate()
    },
    // 这个方法可以不要，都在输入时做了传参
    handleTagInputConfirm() {
      let errHas = true
      if (!/(^[1-9]\d*$)/.test(this.inputValue)) {
        // this.inputValue = this.defaultValue
        this.errInfo = '请输入正整数'
      } else if (parseInt(this.inputValue) < parseInt(this.minValue)) {
        // this.inputValue = this.minValue
        this.errInfo = '输入不能少于' + this.minValue
      } else if (parseInt(this.inputValue) > parseInt(this.maxValue)) {
        // this.inputValue = this.maxValue
        this.errInfo = '输入不能大于' + this.maxValue
      } else {
        errHas = false
      }
      if (this.require) {
        // 回调报错信息
        this.$emit('update:err', errHas)
      }
      this.$forceUpdate()
      this.$emit('handleInputValue', parseInt(this.inputValue))
    },
    minusNum() {
      let inputValue = this.inputValue
      if (!/(^[1-9]\d*$)/.test(inputValue)) {
        inputValue = this.defaultValue
      } else if (parseInt(inputValue) <= parseInt(this.minValue)) {
        inputValue = this.minValue
      } else if (parseInt(inputValue) > parseInt(this.maxValue)) {
        inputValue = this.maxValue
      } else {
        inputValue = inputValue - 1
      }
      this.inputValue = inputValue
      this.$emit('update:err', false)
      this.$emit('handleInputValue', parseInt(this.inputValue), 'minus')
    },
    plusNum() {
      let inputValue = this.inputValue
      if (!/(^[1-9]\d*$)/.test(inputValue)) {
        inputValue = this.defaultValue
      } else if (parseInt(inputValue) >= parseInt(this.maxValue)) {
        inputValue = this.maxValue
      } else if (parseInt(inputValue) < parseInt(this.minValue)) {
        inputValue = this.minValue
      } else {
        inputValue = parseInt(inputValue) + 1
      }
      this.inputValue = inputValue
      this.$emit('update:err', false)
      this.$emit('handleInputValue', parseInt(this.inputValue), 'plus')
    }
  }
}
</script>

<style lang="less" scoped>
.count_input_out {
  position: relative;
  .count_input_main {
    border: 1px solid #e1e5ee;
    /deep/.ant-input {
      height: 28px;
      border: none;
      text-align: center;
    }
    /deep/.ant-input-prefix {
      width: 28px;
      height: 28px;
      left: 0;
      background-color: #f6f8fd;
      border-right: 1px solid #e1e5ee;
    }
    /deep/.ant-input-prefix:hover {
      cursor: pointer;
    }
    /deep/.ant-input-suffix {
      width: 28px;
      height: 28px;
      right: 0;
      background-color: #f6f8fd;
      border-left: 1px solid #e1e5ee;
    }
    /deep/.ant-input-suffix:hover {
      cursor: pointer;
    }
    /deep/.anticon {
      width: 100%;
      justify-content: center;
    }
  }
  .count_input_warn {
    position: absolute;
    font-size: 12px;
    color: red;
  }
}
</style>
