<template>
  <div class="content">
    <div class="title">信息高铁网络资源预定</div>
    <div class="antcard">
      <a-form
        :label-col="{ span: 6, offset: 1 }"
        :wrapper-col="{ span: 12 }"
        required="true"
        :model="form"
        labelAlign="left"
        :colon="false"
      >
        <a-card :bordered="false" class="card">
          <a-row>
            <a-col :span="8">
              <a-form-item label="出发站" prop="starts" style="text-align: left;padding-right:0px">
                <a-select v-model="start">
                  <a-select-option
                    v-for="item in starts"
                    :label="item.name + item.location"
                    :key="item.location + item.name"
                    :disabled="item.location + item.name === end"
                  >
                    {{ item.location + item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="到达站" prop="ends">
                <a-select v-model="end">
                  <a-select-option
                    v-for="item in ends"
                    :aria-label="item.name"
                    :key="item.location + item.name"
                    :disabled="item.location + item.name === start"
                  >
                    {{ item.location + item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item label="往返">
                <a-switch default-checked @change="onChange" :checked="isDisabled" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="card">
          <a-row>
            <a-col :span="8">
              <a-form-item label="带宽Mb">
                <a-input v-model="num" value="" :maxLength="5" onkeyup="if(this.value.length==1){this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="card">
          <a-row>
            <a-col :span="8">
              <a-form-item label="使用时间">
                <a-select @change="timeChange" v-model="usetime" type="number">
                  <a-select-option v-for="date in dates" :key="date.value"> {{ date.label }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="card">
          <a-row>
            <a-col :span="8">
              <a-form-item label="车型" prop="models">
                <a-select @change="modelChange" label-in-value>
                  <a-select-option v-for="item in models" :key="item.value"> {{ item.label }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="card">
          <a-row>
            <a-col :span="8">
              <a-form-item label="席位">
                <a-select style="width: 150%" @change="seatChange" label-in-value>
                  <a-select-option v-for="seat in seats" :key="seat.value"> {{ seat.label }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
      <a-card :bordered="false" class="bot">
        <a-row>
          <a-col :span="19" :offset="0" class="left">
            <a-icon type="info-circle" />
            <span style="font-size: 16px"> 费用 = {{ `( 带宽费用 + 车型 + 席位 ) × 购买时长` }}</span>
          </a-col>
          <a-col :span="3">
            <span style="text-align: center; display: block; color: #333333">费用总计：<span style="color: #fa7321; font-size:16px"> {{ ((allPrice) * n).toFixed(2) }}</span>算力豆/折扣价：<span style="color: #fa7321; font-size:16px"> 0 </span>算力豆(折扣-100%)</span>
          </a-col>
          <a-col :span="2">
            <a-button class="btn" type="primary" @click="bought"> 立即购买 </a-button>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { axios } from '@/utils/request'
import guid from '@/utils/guid'
import formatter from '@/utils/formatter'
const dates = [
  { label: '1个月', value: 1 },
  { label: '2个月', value: 2 },
  { label: '3个月', value: 3 },
  { label: '4个月', value: 4 },
  { label: '5个月', value: 5 },
  { label: '6个月', value: 6 },
  { label: '1年', value: 12 }
]
const models = [
  { label: '高可靠性（主备链路）', value: 20 },
  { label: '性价比优（普通链路）', value: 10 }
]
const seats = [
  { label: '高性价比(时延<100ms、抖动<100ms、丢包率<1.5%)', value: 10 },
  { label: '中等质量（时延<100ms）', value: 15 },
  { label: '高质量（时延<30ms）', value: 20 },
  { label: '超高质量(时延<30ms、抖动<30ms、丢包率<0.1%)', value: 30 }
]
export default {
  name: 'Order',
  data () {
    return {
      start: '',
      end: '',
      usetime: '',
      vpnseat: '',
      modelLabel: '',
      form: {
        'noteId': '',
        'msgType': '带宽资源申请',
        'readFlag': '0',
        'deletedFlag': '0',
        'createTime': ''
      },
      starts: [],
      ends: [],
      dates,
      models,
      seats,
      num: '100',
      dateSelection: '',
      modelSelection: '',
      seatSelection: '',
      isDisabled: false,
      n: 1,
      timer: 3
    }
  },
  computed: {
    allPrice () {
      if (this.num === '' || this.dateSelection === '' || this.modelSelection === '' || this.seatSelection === '') {
        return 0
      }
      if (this.num <= 100) {
        return Number(((this.num * 0.1 + this.modelSelection + this.seatSelection) * this.dateSelection).toFixed(2))
      } else if (this.num <= 1000) {
        return Number(
          ((10 + (this.num - 100) * 0.08 + this.modelSelection + this.seatSelection) * this.dateSelection).toFixed(2)
        )
      }
      return Number(
        ((82 + (this.num - 1000) * 0.06 + this.modelSelection + this.seatSelection) * this.dateSelection).toFixed(2)
      )
    },
    price () {
      if (this.num === '') {
        return ''
      }
      if (this.num <= 100) {
        return (this.num * 0.1).toFixed(2)
      } else if (this.num <= 1000) {
        return (10 + (this.num - 100) * 0.08).toFixed(2)
      }
      return (82 + (this.num - 1000) * 0.06).toFixed(2)
    }
  },
  mounted () {
    this.getCity()
  },
  methods: {
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
      this.isDisabled = checked
      if (this.isDisabled === true) {
        this.n = 1.6
      } else {
        this.n = 1
      }
    },
    timeChange (value) {
      this.dateSelection = value
      console.log(this.dateSelection)
    },
    // 车型
    modelChange (value) {
      this.modelSelection = value.key
      this.modelLabel = value.label
      console.log(value)
    },
    // 席位
    seatChange (value) {
      this.seatSelection = value.key
      this.vpnseat = value.label
      console.log(this.seatSelection)
    },
    // 返回network页面
    toNetwork () {
            setTimeout(() => {
            //  this.$router.push('/account/order')
            window.location.href="/account/order"
            }, 3000)
      // this.$router.push('/network')
    },
    // 获取站点信息
    getCity () {
      axios.get('/bed_hxw/restconf/config/networkopt-node-inventory:network-elements', { auth: { username: 'opt', password: '123456' }} ).then((res) => {
        this.starts = res['network-elements']['network-element']
        this.ends = res['network-elements']['network-element']
      })
    },
    // 点击立即购买
    bought () {
      if (this.num === '' || this.dateSelection === '' || this.start === '' || this.end === '' || this.modelLabel === '' || this.vpnseat === '') {
        this.$message.error('请填写完整订单再购买')
        return false
      } else {
              this.form.createTime = formatter.date(new Date())
              this.form.noteId = guid.createGuid()
              axios.put('/bed_hxw/restconf/config/networkopt-notification:noteInform/info/' + this.form.noteId, { 'info': [{
                'noteId': this.form.noteId,
                'msgType': '带宽资源申请',
                'readFlag': '0',
                'deletedFlag': '0',
                'createTime': this.form.createTime
              }] }, { auth: { username: 'opt', password: '123456' } })
              const id = this.form.noteId
              if (this.seatSelection === 10) {
                this.delay = 100
                this.jitter = 100
                this.dropRatio = 15
              } else if (this.seatSelection === 15) {
                this.delay = 100
                this.jitter = 100
                this.dropRatio = 10
              } else if (this.seatSelection === 20) {
                this.delay = 30
                this.jitter = 100
                this.dropRatio = 10
              } else {
                this.delay = 30
                this.jitter = 30
                this.dropRatio = 1
              }
              axios.put('/bed_hxw/restconf/config/networkopt-resource-manage:networkResOrders/order/' + id, { 'order': [{
                'orderId': id,
                'sourceAddress': this.start,
                'targetAddress': this.end,
                'if-bidirectional': this.isDisabled,
                'bandWidth': this.num,
                'useTime': this.usetime,
                'resourceType': this.modelLabel,
                'quality': this.vpnseat,
                'delay': this.delay,
                'jitter': this.jitter,
                'drop-ratio': this.dropRatio,
                'totalAmount': '1500.00',
                'deletedFlag': '0',
                'processedFlag': '0',
                'createTime': formatter.date(new Date()),
                'updateTime': formatter.date(new Date())
              }] }, { auth: { username: 'opt', password: '123456' } })
              this.$message.success({ content: '购买成功，页面将在3秒后跳转...', key: 'key', duration: 2 })
              setTimeout(() => {
                // this.timer = 2
                this.$message.success({ content: '购买成功，页面将在2秒后跳转...', key: 'key', duration: 2 })
                setTimeout(() => {
                  // this.timer = 1
                  this.$message.success({ content: '购买成功，页面将在1秒后跳转...', key: 'key', duration: 2 })
                  setTimeout(() => {
                    // this.timer = 0
                  // this.$router.push('/account/order')
                  window.location.href='/account/order'
                }, 1000)
              }, 1000)
            }, 1000)
            }
          
    }
  }
}
</script>

<style lang="less" scoped>
.ant-form label{
  font-size: 16px;
}
.ant-form-item{
  margin-bottom: 0px;
}
.ant-form-item-label{
  text-align: left;
  padding-right: 20px;
}
.title {
  font-size: 20px;
  line-height: 20px;
  color: #333;
  padding: 30px;
}
.content {
  padding: 0 30px;
  height: 100%;
  min-width: 1800px;
  background-color: #F0F2F5;
}

.card {
  min-width: 1800px;
  margin: 8px 0;
}
.btn {
  float: right;
  margin-left: 20px;
}
.bot {
  min-width: 1800px;
  font-size: 16px;
  background-color: #fff;
  margin: 8px 0;
}
.bot span{
  font-size: 16px;
}
/deep/ .ant-form label {
    font-size: 16px;
}
// .ant-form-item label{
//   margin-right: 10px;
//   width: 50px;
// }
/deep/ .ant-btn-primary {
  background-color: #33b0ed;
  border-color: #33b0ed;
  width: 140px;
}
.left{
  padding-left: 28px;
}
</style>
