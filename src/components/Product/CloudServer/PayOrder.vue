<template>
  <div class="configure-server">
    <a-card :bordered="false" class="order-info">
      <div class="right">
        <div class="title_content">订单支付</div>
      </div>
      <div class="left">
        <div class="left_header">
          <span>订单号：{{ orderNum ? orderNum : '' }}</span>
          <span style="color: #e1e5ee;"> | </span><span>订单提交成功请尽快付款</span>
        </div>
        <div class="left_explain">请在{{ timeStr }}内支付，否则订单会被取消</div>
      </div>
    </a-card>
    <a-card :bordered="false" class="money-info">
      <div class="right">
        <div class="title_content">当前余额</div>
        <div>应付费用</div>
      </div>
      <div class="left">
        <div class="title_content">
          <span class="title_content_num">{{ currentUser.sldBalance ? formatNumber(currentUser.sldBalance) : 0 }}</span>
          <span class="title_content_unit">算力豆</span>
          <span
            v-if="
              tabKey === 'hourTab' &&
                currentUser.sldBalance !== undefined &&
                currentUser.sldBalance !== null &&
                !isNaN(Number(currentUser.sldBalance)) &&
                Number(currentUser.sldBalance) < payNum
            "
            class="title_content_warn"
          >
            当前账户余额不足，请充值后支付
          </span>
          <span
            v-else-if="
              tabKey === 'hourTab' &&
                currentUser.sldBalance !== undefined &&
                currentUser.sldBalance !== null &&
                !isNaN(Number(currentUser.sldBalance)) &&
                Number(currentUser.sldBalance) < 100
            "
            class="title_content_warn"
          >
            请至少保持账户内余额不低于100算力豆，再进行支付
          </span>
          <span
            v-else-if="
              (currentUser.sldBalance !== undefined &&
                currentUser.sldBalance !== null &&
                !isNaN(Number(currentUser.sldBalance)) &&
                Number(currentUser.sldBalance) < payNum) ||
                !currentUser.sldBalance
            "
            class="title_content_warn"
          >
            当前账户余额不足，请充值后支付
          </span>
        </div>
        <div class="title_contentBottom">
          <span class="title_content_num">{{ formatNumber(payNum) }}</span>
          <span class="title_content_unit">算力豆</span>
        </div>
      </div>
    </a-card>
    <a-card :bordered="false" class="password-info">
      <div class="right">
        <div class="right_title">支付密码</div>
        <div class="right_explain">6位数支付密码</div>
      </div>
      <div>
        <div class="left">
          <div :id="`ids_${id}`" class="am_payPwd">
            <input
              v-for="(v, i) in 6"
              :key="i"
              v-model="pwdList[i]"
              type="password"
              autocomplete="new-password"
              maxlength="1"
              class="shortInput"
              @input="changeInput"
              @click="changePwd"
              @keyup="keyUp($event)"
              @keydown="oldPwdList = pwdList.length"
            />
          </div>
          <div class="left_explain">
            <span>还未设置支付密码，</span>
            <span class="left_explain_text" @click="jumpToSetPayPwd">去设置</span>
            <span style="color: #e1e5ee;"> | </span>
            <span class="left_explain_text" @click="jumpToSetPayPwd">忘记密码</span>
          </div>
        </div>
        <div v-if="message" class="left_warn">{{ message }}</div>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import store from '@/store'
import { formatNumber } from '../../../utils/util'
export default {
  name: 'PayOrder',
  components: {},
  props: {
    // 订单id
    orderId: {
      type: [String, Number],
      default: null
    },
    tabKey: {
      type: String,
      default: 'monthTab'
    }
  },
  data() {
    return {
      orderNum: null,
      timeStr: '',
      time: null,
      thirty: null,
      payNum: 0,
      isCursor: true, //是否开启光标
      //支付框
      pwdList: [],
      oldPwdList: [],
      isDelete: false,
      ipt: '',
      // 当一个页面有多个密码输入框时，用id来区分
      id: '1',
      //结束
      interval: null,
      message: null
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      currentUser: state => {
        console.log(state.user.info, '账号信息')
        return state.user.info
      },
      orderInfo: state => state.cloudServer.orderInfo
    })
  },
  watch: {
    payNum: function(newValue, oldvalue) {
      console.log(this.tabKey)
      const sldBalance =
        this.currentUser.sldBalance !== undefined &&
        this.currentUser.sldBalance !== null &&
        !isNaN(Number(this.currentUser.sldBalance))
          ? Number(this.currentUser.sldBalance)
          : 0
      console.log(newValue, oldvalue)
      if (sldBalance >= this.payNum) {
        if (this.tabKey === 'monthTab' || (this.tabKey === 'hourTab' && sldBalance >= 100)) {
          this.$emit('update:canPayCount', true)
        }
      }
    }
  },
  mounted() {
    //支付框
    this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
    // 查询订单信息
    this.getOrderInfo()
  },
  beforeDestroy() {
    if (this.interval) window.clearInterval(this.interval)
  },
  methods: {
    formatNumber,
    getOrderInfo() {
      store.dispatch('orderInfo', this.orderId).then(res => {
        if (res.data) {
          this.orderNum = res.data.orderUuid
          this.payNum = res.data.price
          const time = new moment(res.data.createTime)
          this.time = time
          this.thirty = time.add(30, 'm')
          this.refreshTime()
        }
      })
    },
    refreshTime() {
      this.interval = window.setInterval(() => {
        const now = new moment()
        const thirty = this.thirty
        if (now.isAfter(thirty)) {
          if (this.interval) window.clearInterval(this.interval)
        } else {
          const nowVaule = now.valueOf()
          const thirtyVaule = thirty.valueOf()
          const sub = Math.floor((thirtyVaule - nowVaule) / 1000)
          console.log(sub, 'sub++++++++++++++++++++++++')
          this.timeStr = Math.floor(sub / 60) + '分钟' + (sub % 60) + '秒'
          if (sub === 0) {
            this.$router.push({ path: '/account/order' })
            if (this.interval) window.clearInterval(this.interval)
          }
        }
      }, 1000)
    },
    //   支付框
    keyUp(ev) {
      let index = this.pwdList.length
      if (!index) return
      if (ev.keyCode === 8) {
        this.isDelete = true
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop()
          }
          index--
        } else {
          index > 0 && index--
        }
        this.ipt[index].focus()
      } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
        this.isDelete = false
        this.pwdList.pop()
        this.pwdList.push(ev.key)
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
      }
      this.$emit('getPwd', this.pwdList.join(''))
      if (index === 6) {
        this.$emit('update:canPayPassword', true)
      } else {
        this.$emit('update:canPayPassword', false)
      }
    },
    //支付框
    changePwd() {
      let index = this.pwdList.length
      index === 6 && index--
      this.ipt[index].focus()
    },
    //支付框
    changeInput() {
      let index = this.pwdList.length
      const val = this.pwdList[index - 1]
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop()
        return
      }
      if (!val) {
        this.pwdList.pop()
        index--
        if (index > 0) this.ipt[index - 1].focus()
      } else {
        if (index < 6) this.ipt[index].focus()
      }
    },
    // 密码框结束

    // 跳转设置密码
    jumpToSetPayPwd() {
      this.$router.push({ path: '/user/modify-pay-password' })
    }
  }
}
</script>

<style lang="less" scoped>
.configure-server {
  width: 100%;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
  font-size: 16px;
  /deep/.ant-card-body {
    padding: 30px;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .order-info {
    .right {
      width: 94px;
      font-size: 18px;
      margin-right: 48px;
    }
    .left {
      width: 650px;
      .left_header {
        margin-bottom: 10px;
      }
      .left_explain {
        font-size: 16px;
        color: #33b0ed;
      }
    }
  }
  .money-info {
    .right {
      width: 94px;
      font-size: 18px;
      margin-right: 48px;
      display: flex;
      flex-direction: column;
      .title_content {
        margin-bottom: 25px;
      }
    }
    .left {
      font-size: 18px;
      margin-right: 48px;
      display: flex;
      flex-direction: column;
      .title_content {
        margin-bottom: 25px;
        .title_content_num {
          font-size: 24px;
          line-height: 24px;
          color: #fa7321;
          margin-right: 4px;
        }
        .title_content_unit {
          font-size: 14px;
          line-height: 12px;
        }
        .title_content_warn {
          margin-left: 20px;
          color: #fd3939;
          font-size: 14px;
          line-height: 12px;
        }
      }
      .title_contentBottom {
        .title_content_num {
          font-size: 24px;
          line-height: 24px;
          color: #fa7321;
          margin-right: 4px;
        }
        .title_content_unit {
          font-size: 12px;
          line-height: 12px;
        }
        .title_content_warn {
          margin-left: 20px;
          color: #fd3939;
          font-size: 14px;
          line-height: 12px;
        }
      }
    }
  }
  .password-info {
    .right {
      width: 100px;
      font-size: 18px;
      margin-right: 48px;
      display: flex;
      flex-direction: column;
      .right_title {
        margin-bottom: 14px;
      }
      .right_explain {
        font-size: 14px;
        line-height: 14px;
        color: #85899f;
      }
    }
    .left_warn {
      color: #fd3939;
      font-size: 14px;
      height: 14px;
      margin-top: 14px;
    }
    .left {
      display: flex;
      align-items: flex-end;
      /* 支付框样式 */
      .am_payPwd {
        display: inline-block;
      }
      /* 支付框样式 */
      .shortInput {
        background-color: #ebeff8;
        border: 0;
        border-radius: 2px;
        text-align: center;
        font-size: 20px;
        float: left;
        width: 36px;
        height: 48px;
        color: #333;
        outline: #ff0067;
      }
      /* 支付框样式 */
      .shortInput:not(:last-child) {
        margin-right: 14px;
      }
      .spend-pay-button {
        margin: 20px auto 20px 70px;
      }
      .spend-pay-1 {
        margin-top: 4%;
        position: relative;
      }
      .spend-pay-2 {
        font-size: 14px;
        font-weight: 550;
        display: inline-block;
        position: absolute;
        top: 0;
      }
      .spend-pay-3 {
        margin-left: 70px;
        display: inline-block;
        font-size: 10px;
        color: #cccccc;
      }
      .spend-pay-4 {
        margin-left: 85px;
        display: inline-block;
        font-size: 10px;
        font-weight: 600;
      }
      // 密码框样式结束
      .left_explain {
        margin-left: 14px;
        .left_explain_text {
          color: #33b0ed;
        }
        .left_explain_text:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
