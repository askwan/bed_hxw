<template>
  <div class="content">
    <div class="antcard">
      <a-card :bordered="false" class="card">
        <p>信息高铁网络资源预定</p>
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" required="true" :model="form">
          <a-row>
            <a-col :span="4">
              <a-form-item label="出发站" prop="starts">
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
            <a-col :span="4">
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
              往返 &nbsp;&nbsp;&nbsp;&nbsp; <a-switch default-checked @change="onChange" :checked="isDisabled" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4">
              <a-form-item label="带宽Mb">
                <a-input v-model="num" change="change" type="number"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item label="使用时间">
                <a-select @change="timeChange" v-model="usetime" type="number">
                  <a-select-option v-for="date in dates" :key="date.value"> {{ date.label }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4">
              <a-form-item label="车型" prop="models">
                <a-select @change="modelChange" label-in-value>
                  <a-select-option v-for="model in models" :key="model.value"> {{ model.label }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4">
              <a-form-item label="席位">
                <a-select style="width: 140%" @change="seatChange" label-in-value>
                  <a-select-option v-for="seat in seats" :key="seat.value"> {{ seat.label }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card :bordered="false" class="bot">
        <a-row>
          <a-col :span="24">
            <div>
              <!-- <span>费用：<a-checkable-tag style="font-size: 20px">{{ `(${price}+${this.modelSelection}+${this.seatSelection})*${this.dateSelection}` }}</a-checkable-tag></span> -->
              <span>费用：<a-checkable-tag style="font-size: 20px">{{ `(带宽费用 + 车型 + 席位) * 购买时长` }}</a-checkable-tag></span>
              <span style="text-align: center; display: block; color: #d9001b">费用总计：<a-checkable-tag style="color: #d9001b; font-size: 20px">{{ m + allPrice * n }} </a-checkable-tag>算力豆</span>
              <!-- <a-button class="btn" type="primary" @click="toNetwork"> 再考虑一下 </a-button> -->
              <a-button class="btn" type="primary" @click="bought"> 立即购买 </a-button>
            </div>
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
  { label: '性价比优（普通链路）', value: 15 }
]
const seats = [
  { label: '高性价比(时延<100ms、抖动<100ms、丢包率<1 %)', value: 10 },
  { label: '中等质量（时延<100ms）', value: 15 },
  { label: '高质量（时延<30ms）', value: 20 },
  { label: '超高质量(时延<30ms、抖动<30ms、丢包率<0.01 %)', value: 30 }
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
      num: '',
      dateSelection: '',
      modelSelection: '',
      seatSelection: '',
      isDisabled: false,
      n: 0.5,
      m: 0
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
    },
    //node () {
    //  return this.$store.getters.source
    //}
  },
  //watch: {
  //  node (_new) {
  //    this.starts = _new
  //    this.ends = _new
  //  }
  //},
  mounted () {
    this.getCity()
  },
  methods: {
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
      this.isDisabled = checked
      if (this.isDisabled === true) {
        this.n = this.n * 0.8
        this.m = this.allPrice
      } else {
        this.n = 1
        this.m = 0
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
             this.$router.push('/account/order')
            }, 3000)
      // this.$router.push('/network')
    },
    // 获取站点信息
    getCity () {
      axios.get('/restconf/config/networkopt-node-inventory:network-elements', { auth: { username: 'opt', password: '123456' } } ).then((res) => {
        res = res['network-elements']['network-element']
        // console.log(res)
        // this.$store.commit('sourceData', res)
        this.starts = res
        this.ends = res
      })
    },
    // 点击立即购买
    bought () {
         axios.post('/portalsystem/order/distributedLaboratoryBed/add', {
            'productId': 17,
            'productName': '智能核心网实验床',
            'typeId': 0,
            'chargeType': 0,
            'stationInfoList': [
              {
                'stationId': 100,
                'stationName': this.start + '<---->' + this.end,
                'specConfigId': 7000,
                'mirroringId': 7000,
                'isAllocatedIP': 0,
                'networkNumber': 1,
                'networkBandwidth': this.num,
                'productNumber': 1
              }
            ],
            'storageTypeId': 22,
            'storageTypeName': 'SSD',
            'storageCapacity': 23,
            'name': this.start + '<---->' + this.end,
            'purchaseTime': this.usetime,
            'configInfo': '出发站：' + this.start + '--到达站：' + this.end + '带宽：' + this.num + '车型' + this.modelLabel + '席位' + this.vpnseat,
            'price': this.m + this.allPrice * this.n,
            'transactionInfo': '费用:' + this.m + this.allPrice * this.n,
            'productTotalNumber': 1,
            'isVirtualPrivateNetwork': 1,
            'virtualPrivateNetworkBandwidth': 999
          }).then((res) => {
            // console.log(res)
            this.form.createTime = formatter.date(new Date())
            this.form.noteId = guid.createGuid()
            axios.put('/restconf/config/networkopt-notification:noteInform/info/' + this.form.noteId, { 'info': [{
              'noteId': this.form.noteId,
              'msgType': '带宽资源申请',
              'readFlag': '0',
              'deletedFlag': '0',
              'createTime': this.form.createTime
            }] }, { auth: { username: 'opt', password: '123456' } })
            const id = this.form.noteId
            axios.put('/restconf/config/networkopt-resource-manage:networkResOrders/order/' + id, { 'order': [{
              'orderId': id,
              'sourceAddress': this.start,
              'targetAddress': this.end,
              'if-bidirectional': this.isDisabled,
              'bandWidth': this.num,
              'useTime': this.usetime,
              'resourceType': this.modelLabel,
              'quality': this.vpnseat,
              'delay': '0',
              'jitter': '0',
              'drop-ratio': '0',
              'totalAmount': '1500.00',
              'deletedFlag': '0',
              'processedFlag': '0',
              'createTime': formatter.date(new Date()),
              'updateTime': formatter.date(new Date())
            }] }, { auth: { username: 'opt', password: '123456' } })
            this.$message.success('购买成功，三秒后跳到订单页')
            setTimeout(() => {
             // this.$router.push('/account/order')
              window.location.href = '/account/order'
            }, 3000)
          })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  background-color: rgb(212, 224, 220);
}
.antcard {
  p {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    color: #000;
  }
}
.card {
  margin: 0 30px;
}
.btn {
  float: right;
  margin-left: 20px;
}
.bot {
  font-size: 20px;
  background-color: #fff;
  margin: 30px;
}
</style>
