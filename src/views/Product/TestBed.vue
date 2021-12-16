<template>
  <div class="main-content">
    <div v-if="currentStep === 0">
      <div class="content">
        <div class="content_title">配置{{ productName }}</div>
        <div class="content_block">
          <configure-server
            ref="configureServer"
            :productId="productId"
            :businessData="businessData"
            @changeTabKey="changeTabKey"
            @changeStationList="changeStationList"
            @changeStationTab="changeStationTab"
            @changeGpuTabKey="changeGpuTabKey"
            @handleConfigureBase="handleConfigureBase"
            @handleAiImageType="handleAiImageType"
            @handleAiImageVersion="handleAiImageVersion"
            @handleSysImageType="handleSysImageType"
            @handleSysImageVersion="handleSysImageVersion"
            @handleStorageType="handleStorageType"
            @handleStorageSize="handleStorageSize"
            @handleFlexibleIpSize="handleFlexibleIpSize"
            @handleCeniNetSize="handleCeniNetSize"
            @handleServerName="handleServerName"
            @handleBusinessData="handleBusinessData"
          />
        </div>
      </div>
      <div class="footer">
        <count-footer-month
          v-if="tabKey === 'monthTab'"
          ref="countFooterMonth"
          :baseCount="baseCount"
          :specFee="specFee"
          :storageCount="storageCount"
          :broadbandCount="broadbandCount"
          :flexibleIp="flexibleIp"
          :ceniNet="ceniNet"
          :selStationList="selStationList"
          @handleCountMonth="handleCountMonth"
          @handleCurrentStepBeforeCheck="handleCurrentStepBeforeCheck"
        />
        <count-footer-hour
          v-else
          ref="countFooterHour"
          :baseCount="baseCount"
          :specFee="specFee"
          :storageCount="storageCount"
          :broadbandCount="broadbandCount"
          :flexibleIp="flexibleIp"
          :ceniNet="ceniNet"
          :selStationList="selStationList"
          @handleCountHour="handleCountHour"
          @handleCurrentStepBeforeCheck="handleCurrentStepBeforeCheck"
        />
      </div>
    </div>
    <div v-if="currentStep === 1">
      <div class="content">
        <div class="content_title content_title_button">
          <div>请确认以下产品信息</div>
          <div class="content_title_more" @click="handleCurrentStep(0)">返回重新选择</div>
        </div>
        <div class="content_block">
          <sure-configure
            ref="sureConfigure"
            :businessData="businessData"
            :moneyCount="moneyCount"
            :storageCount="storageCount"
            :specFee="specFee"
            :broadbandCount="broadbandCount"
            @sumSeverNumber="sumSeverNumber"
            @handleCurrentStepBeforePay="handleCurrentStepBeforePay"
          />
        </div>
      </div>
      <div class="footer">
        <count-footer-all
          :moneyCount="moneyCount"
          :tabKey="tabKey"
          @handleCurrentStepBeforePay="handleCurrentStepBeforePay"
        />
      </div>
    </div>
    <div v-if="currentStep === 2">
      <div class="content">
        <div class="content_title content_title_button">
          <div>支付</div>
        </div>
        <div class="content_block">
          <pay-order
            ref="payOrder"
            :orderId="orderId"
            :tabKey="tabKey"
            :canPayCount.sync="canPayCount"
            :canPayPassword.sync="canPayPassword"
          />
        </div>
      </div>
      <div class="footer">
        <count-footer-pay
          :canPayCount="canPayCount"
          :canPayPassword="canPayPassword"
          @handleCurrentStepBeforeSuccess="handleCurrentStepBeforeSuccess"
        />
      </div>
    </div>
    <div v-if="currentStep === 3">
      <order-result></order-result>
    </div>
  </div>
</template>

<script>
import CountFooterHour from '@/components/Product/TestBed/CountFooterHour'
import CountFooterMonth from '@/components/Product/TestBed/CountFooterMonth'
import ConfigureServer from '@/components/Product/TestBed/ConfigureServer'
import SureConfigure from '@/components/Product/TestBed/SureConfigure'
import CountFooterAll from '@/components/Product/TestBed/CountFooterAll'
import PayOrder from '@/components/Product/CloudServer/PayOrder'
import CountFooterPay from '@/components/Product/TestBed/CountFooterPay'
import OrderResult from '@/components/Product/TestBed/OrderResult'
import store from '@/store'
import { mapState, mapActions } from 'vuex'
import { orderPay } from '@/api/Product/cloudServer'
export default {
  name: 'TestBed',
  components: {
    CountFooterHour,
    CountFooterMonth,
    ConfigureServer,
    SureConfigure,
    CountFooterAll,
    PayOrder,
    CountFooterPay,
    OrderResult
  },
  data() {
    return {
      orderId: null,
      tabKey: 'monthTab', // 按周期购买的标签
      stationTab: null, // 站点的标签
      selStationList: [],
      gpuTab: null, // GPU的标签
      configureBase: null, // 具体选择的GPU
      aiImageType: null, // AI框架
      aiImageVersion: null, // AI版本信息
      sysImageType: null, // 系统
      sysImageVersion: null, // 系统版本信息
      storageType: null, // 存储类型
      storageSize: 20, // 存储大小
      flexibleIp: null,
      ceniNet: null,
      serverName: '', // 服务器名称
      // productName: null, // 产品名称
      mirroringDTO: null, // 镜像id
      moneyCountWarn: false,
      // 以下是具体钱的信息
      serverNum: 1, // 购买的服务器台数
      timeNum: 1, // 购买的时长，不带单位，周期方式为'月'、使用量方式为空
      baseCount: 0, // 配置费用（包含存储+规格）
      specFee: 0, // 规格费用
      storageCount: 0, // 存储费用
      broadbandCount: 0, // 带宽费用
      moneyCount: 0, // 总费用
      currentStep: 0, // 购买步骤
      canPayCount: false, // 用来验证账号余额是否满足
      canPayPassword: false, // 用来验证密码是否满足
      businessData: [],
      productTotalNumber: 0
    }
  },
  computed: {
    ...mapState({
      productId: state => state.cloudServer.productId || null, // 产品id
      productName: state => state.cloudServer.productName || null // 产品名称
    })
  },
  watch: {
    // serverNum: function(newValue, oldvalue) {
    //   console.log(newValue, oldvalue)
    //   this.$nextTick(() => {
    //     this.submitOrder()
    //   })
    // },
    // timeNum: function(newValue, oldvalue) {
    //   console.log(newValue, oldvalue)
    //   this.$nextTick(() => {
    //     this.submitOrder()
    //   })
    // }
  },
  created() {
    const obj = {
      productId: this.$route.query.productId,
      productName: this.$route.query.productName
    }
    store.dispatch('updateProductInfo', obj)
  },
  mounted() {
    this.updateGpuTabList()
  },
  methods: {
    ...mapActions(['updateGpuTabList']),
    /**
     * 固定页脚的-时长计费的
     * value: 服务器数量
     */
    handleCountHour(value, stationId) {
      // 服务器台数与时长
      this.serverNum = value
      this.timeNum = null
      if (this.businessData) {
        for (var i = 0; i < this.businessData.length; i++) {
          const tempStation = this.businessData[i]
          tempStation.timeNum = null
          if (stationId == this.businessData[i].stationId) {
            tempStation.serverNum = value
          }
          this.$set(this.businessData, i, tempStation)
        }
        this.submitOrder()
      }
    },
    /**
     * 固定页脚的-时长计费的
     * monthsValue: 购买时长
     * numsValue: 服务器数量
     */
    handleCountMonth(monthsValue, numsValue, stationId) {
      // 服务器台数与时长
      this.serverNum = numsValue
      this.timeNum = monthsValue
      if (this.businessData) {
        for (var i = 0; i < this.businessData.length; i++) {
          const tempStation = this.businessData[i]
          tempStation.timeNum = monthsValue
          if (stationId == this.businessData[i].stationId) {
            tempStation.serverNum = numsValue
          }
          this.$set(this.businessData, i, tempStation)
        }
        this.submitOrder()
      }
    },
    // 查询价格
    submitOrder() {
      if (this.businessData.length > 0) {
        if (
          !(this.businessData[0].stationId && this.businessData[0].configureBase && this.businessData[0].storageType)
        ) {
          this.resetCount()
          return
        }
      } else {
        this.resetCount()
        return
      }
      // 自定义输入框的校验
      if (this.$refs.configureServer.countErrStorage || (this.flexibleIp && this.$refs.configureServer.countErrIP)) {
        this.resetCount()
        return
      }
      // if (
      //   this.businessData[0].tabKey === 'monthTab' &&
      //   (this.$refs.countFooterMonth.countErrMonthTime || this.$refs.countFooterMonth.countErrMonthNum)
      // ) {
      //   this.resetCount()
      //   return
      // }
      // if (this.businessData[0].tabKey === 'hourTab' && this.$refs.countFooterHour.countErrHourNum) {
      //   this.resetCount()
      //   return
      // }
      // 查询价格
      if (this.businessData[0].tabKey === 'monthTab') {
        // 这三个确定的情况下就可以计算价格
        const param = {}
        // 新加参数
        param.ceni = this.businessData[0].ceniNetwork
        param.ceniBandwidth = this.businessData[0].ceniNetworkBandwidth
        param.monthNum = this.timeNum
        const publicIpListList = []
        const chargeParamList = []

        this.businessData.forEach(e => {
          const tempIpList = {
            stationId: e.stationId,
            num: e.networkNumber,
            bandwidth: e.networkBandwidth
          }
          const tempChargeParam = {
            stationId: e.stationId.toString(),
            specConfigId: e.specConfigId.toString(),
            storageSize: e.storageSize,
            serverNum: e.serverNum,
            publicIP: false,
            chargeType: 'SERVER',
            monthNum: this.timeNum
          }
          if (e.isAllocatedIP) {
            publicIpListList.push(tempIpList)
          }
          chargeParamList.push(tempChargeParam)
        })

        param.publicIpListList = publicIpListList
        param.chargeParamList = chargeParamList

        store
          .dispatch('monthlyLabFee', param)
          .then(res => {
            if (res && res.statusCode === 200) {
              this.resetCount()
              this.moneyCountWarn = false
              const bandWidthFee = res.data && res.data.bandWidthFee !== undefined ? res.data.bandWidthFee : 0
              const configFee = res.data && res.data.configFee !== undefined ? res.data.configFee : 0
              const storageFee = res.data && res.data.storageFee !== undefined ? res.data.storageFee : 0
              const specFee = res.data && res.data.specFee !== undefined ? res.data.specFee : 0
              this.broadbandCount = Number(bandWidthFee) || 0
              this.baseCount = Number(configFee) || 0
              this.specFee = Number(specFee) || 0
              this.storageCount = Number(storageFee) || 0
              this.moneyCount = Number(bandWidthFee) + Number(configFee)
            } else {
              this.broadbandCount = 0
              this.baseCount = 0
              this.specFee = 0
              this.storageCount = 0
              this.moneyCount = 0
              this.moneyCountWarn = true
              this.$message.error(res.message || '价格计算错误，请联系管理员', 3)
            }
          })
          .catch(() => {
            this.broadbandCount = 0
            this.baseCount = 0
            this.specFee = 0
            this.storageCount = 0
            this.moneyCount = 0
            this.moneyCountWarn = true
            this.$message.error('价格计算错误，请联系管理员', 3)
          })
      } else {
        const param = {}
        // 新加参数
        param.ceni = this.businessData[0].ceniNetwork
        param.ceniBandwidth = this.businessData[0].ceniNetworkBandwidth
        const publicIpListList = []
        const chargeParamList = []

        this.businessData.forEach(e => {
          const tempIpList = {
            stationId: e.stationId,
            num: e.networkNumber,
            bandwidth: e.networkBandwidth
          }
          const tempChargeParam = {
            stationId: e.stationId.toString(),
            specConfigId: e.specConfigId.toString(),
            storageSize: e.storageSize,
            serverNum: e.serverNum,
            publicIP: false,
            chargeType: 'SERVER',
            monthNum: this.timeNum
          }
          if (e.isAllocatedIP) {
            publicIpListList.push(tempIpList)
          }
          chargeParamList.push(tempChargeParam)
        })

        param.publicIpListList = publicIpListList
        param.chargeParamList = chargeParamList

        store
          .dispatch('hourLabFee', param)
          .then(res => {
            if (res && res.statusCode === 200) {
              this.resetCount()
              this.moneyCountWarn = false
              const bandWidthFee = res.data && res.data.bandWidthFee !== undefined ? res.data.bandWidthFee : 0
              const configFee = res.data && res.data.configFee !== undefined ? res.data.configFee : 0
              const storageFee = res.data && res.data.storageFee !== undefined ? res.data.storageFee : 0
              const specFee = res.data && res.data.specFee !== undefined ? res.data.specFee : 0
              this.broadbandCount = Number(bandWidthFee) || 0
              this.baseCount = Number(configFee) || 0
              this.specFee = Number(specFee) || 0
              this.storageCount = Number(storageFee) || 0
              this.moneyCount = Number(bandWidthFee) + Number(configFee)
            } else {
              this.broadbandCount = 0
              this.baseCount = 0
              this.specFee = 0
              this.storageCount = 0
              this.moneyCount = 0
              this.moneyCountWarn = true
              this.$message.error(res.message || '价格计算错误，请联系管理员', 3)
            }
          })
          .catch(() => {
            this.broadbandCount = 0
            this.baseCount = 0
            this.specFee = 0
            this.storageCount = 0
            this.moneyCount = 0
            this.moneyCountWarn = true
            this.$message.error('价格计算错误，请联系管理员', 3)
          })
      }
    },
    // tab变动时，价格需要归0
    resetCount() {
      this.baseCount = 0
      this.specFee = 0
      this.storageCount = 0
      this.moneyCount = 0
    },
    // 按周期和按月的tab切换
    changeTabKey(value) {
      this.tabKey = value
      if (value === 'monthTab') {
        this.serverNum = 1
        this.timeNum = 1
      } else {
        this.serverNum = 1
        this.timeNum = null
      }

      // this.resetCount()
    },
    // 站点tabList
    changeStationList(value) {
      this.selStationList = value
      this.resetCount()
    },
    // 站点的tab切换
    changeStationTab(value) {
      console.log(value)
      this.stationTab = value
      this.resetCount()
    },
    // GPU的tab切换，1、需要查询出站点下的所有GPU
    changeGpuTabKey(value) {
      this.gpuTab = value
      this.resetCount()
    },
    // GPU具体选择
    handleConfigureBase(value) {
      this.configureBase = value
    },
    // AI框架的select二级联动的选项
    handleAiImageType(value) {
      this.aiImageType = value
    },
    // AI框架的select二级联动的选项-子选项
    handleAiImageVersion(value) {
      this.aiImageVersion = value
    },
    // 操作系统框架的select二级联动的选项
    handleSysImageType(value) {
      this.sysImageType = value
    },
    // 操作系统框架的select二级联动的选项-子选项
    handleSysImageVersion(value) {
      this.sysImageVersion = value
    },
    // 存储类型
    handleStorageType(value) {
      this.storageType = value
    },
    // 存储大小
    handleStorageSize(value) {
      this.storageSize = value
    },
    // 弹性公网
    handleFlexibleIpSize(value) {
      this.flexibleIp = value
    },
    // 弹性公网
    handleCeniNetSize(value) {
      this.ceniNet = value
    },
    // 服务器名称
    handleServerName(value) {
      this.serverName = value
    },
    sumSeverNumber(value) {
      this.productTotalNumber = value
    },
    handleBusinessData(value) {
      this.businessData = value
      this.$forceUpdate()
      if (this.businessData.length > 0) {
        if (this.businessData[0].tabKey == 'monthTab') {
          if (this.timeNum && value[0].serverValue && this.businessData[0].configureBase != null) {
            this.submitOrder()
          }
        } else {
          if (this.businessData[0] && this.businessData[0].serverValue && this.businessData[0].configureBase != null) {
            this.submitOrder()
          }
        }
      }
      console.log(value)
    },

    // 购买流程-判断所选条件是否都满足
    handleCurrentStepBeforeCheck() {
      let flag = true
      if (this.businessData.length == 0) {
        flag = false
        this.$refs.configureServer.dispalyWarnStation = true
      } else {
        // 自定义输入框的校验
        if (this.$refs.configureServer.countErrStorage || this.$refs.configureServer.countErrIP) {
          flag = false
        }
        // if (
        //   this.businessData[0].tabKey === 'monthTab' &&
        //   (this.$refs.countFooterMonth.countErrMonthTime || this.$refs.countFooterMonth.countErrMonthNum)
        // ) {
        //   flag = false
        // }
        // if (this.businessData[0].tabKey === 'hourTab' && this.$refs.countFooterHour.countErrHourNum) {
        //   flag = false
        // }
        this.businessData.forEach(e => {
          if (e.networkNumber > e.serverNum) {
            flag = false
            this.$message.warn(
              '所选公网IP（' + e.stationName + '）数量，不能大于当前所选云服务器（' + e.stationName + '）数量',
              3
            )
          }
          if (e.networkBandwidth > 1000) {
            flag = false
          }
        })
        // 未输入的校验
        if (!this.businessData[0].stationId) {
          flag = false
          this.$refs.configureServer.dispalyWarnStation = true
        }
        if (!this.businessData[0].architectureTypeId) {
          flag = false
          this.$refs.configureServer.dispalyWarnGpu = true
        }
        if (!this.businessData[0].configureBase) {
          flag = false
          this.$refs.configureServer.dispalyWarnRows = true
        }
        if (!this.businessData[0].containerVersion) {
          flag = false
          this.$refs.configureServer.dispalyWarnAi = true
        }
        if (!this.businessData[0].sysImageVersion) {
          flag = false
          this.$refs.configureServer.dispalyWarnSys = true
        }
        if (!this.businessData[0].storageType) {
          flag = false
          this.$refs.configureServer.dispalyWarnStorage = true
        }
        if (this.$refs.configureServer.dispalyWarnServerName) {
          flag = false
        }
        // 如果价格计算错误了，就不能进行下一步
        if (this.moneyCountWarn) {
          this.$message.error('价格计算错误，请联系管理员', 3)
          flag = false
        }
      }

      if (flag) {
        // 需要根据镜像信息把镜像ID查出来，返回给后台在下订单
        // mirroringDTO: null, // 镜像id
        const tempStationList = []
        this.businessData.forEach(e => {
          tempStationList.push(e.stationId)
        })
        const param = {
          productId: this.productId,
          stationIdList: tempStationList,
          osDicItemId: this.businessData[0].sysImageType.id,
          versionDicItemId: this.businessData[0].sysImageVersion.id,
          softwareDicItemId: this.businessData[0].container.id,
          softwareVersionDicItemId: this.businessData[0].containerVersion.id,
          architectureTypeId: this.businessData[0].architectureTypeId
        }

        //multiSiteMirroring

        store.dispatch('multiSiteMirroring', param).then(res => {
          if (res && res.data && res.data.rows) {
            const obj = res.data.rows[0]
            if (obj === undefined) {
              this.$message.error('服务器未配置对应镜像，请联系管理员', 3)
            } else {
              this.mirroringDTO = res.data.rows[0]
              console.log(this.mirroringDTO)

              for (var j = 0; j < this.mirroringDTO.stationIdList.length; j++) {
                for (var i = 0; i < this.businessData.length; i++) {
                  if (this.mirroringDTO.stationIdList[j] == this.businessData[i].stationId) {
                    const tempStation = this.businessData[i]

                    tempStation.mirriorId = this.mirroringDTO.mirroringIdList[j]
                    this.$set(this.businessData, i, tempStation)
                  }
                }
              }
              console.log(this.businessData)
              // 跳转到下一步
              this.handleCurrentStep(1)
            }
          } else {
            this.$message.error('查询对应镜像出错，请联系管理员', 3)
          }
        })
      }
    },
    handleCurrentStepBeforePay() {
      let infoFlag = true
      for (let i = 1; i < this.businessData.length; i++) {
        if (!this.businessData[i].configureBase || !this.businessData[i].sysImageType) {
          infoFlag = false
          this.$refs.sureConfigure.infoCheck = true
          break
        }
      }
      const that = this
      let flag = true
      if (!this.$refs.sureConfigure.checked) {
        flag = false
        this.$refs.sureConfigure.dispalyWarnCheck = true
      }
      if (flag && infoFlag) {
        //组件下订单的数据
        const param = {}
        param.productId = this.productId
        param.productName = this.businessData[0].productName
        param.typeId = 0 // 订单类型 0-购买 1-续费 2-退费【必须】"
        param.chargeType = this.businessData[0].tabKey === 'monthTab' ? 0 : 1 //计费方式 0-包年包月 1-按小时计费【必须】"
        const stationInfoList = []
        this.businessData.forEach(e => {
          const tempList = {
            stationId: e.stationId,
            stationName: e.stationName,
            specConfigId: e.specConfigId,
            networkNumber: e.networkNumber,
            networkBandwidth: e.networkBandwidth,
            productNumber: e.serverNum,
            isAllocatedIP: e.isAllocatedIP == true ? 1 : 0,
            mirroringId: e.mirriorId
          }
          stationInfoList.push(tempList)
        })
        param.stationInfoList = stationInfoList
        param.isVirtualPrivateNetwork = this.businessData[0].ceniNetwork ? 1 : 0
        param.virtualPrivateNetworkBandwidth = this.businessData[0].ceniNetworkBandwidth
        param.storageTypeId = this.businessData[0].storageType.type
        param.storageTypeName = this.businessData[0].storageType.name
        // param.storageTypeId = 1
        // param.storageTypeName = 'ssd'
        param.storageCapacity = this.businessData[0].storageSize
        if (this.businessData[0].serverName) {
          param.name = this.businessData[0].serverName
        }

        param.purchaseTime = this.businessData[0].timeNum

        param.productTotalNumber = this.productTotalNumber
        const configInfoObj = []
        this.businessData.forEach(e => {
          const tempList = {
            云服务器: e.serverNum + '*' + e.stationName,
            参数规格:
              e.configureBase.gpuProductName +
              ' (' +
              e.configureBase.cpuSize +
              'CPU, ' +
              e.configureBase.memorySize +
              'GB内存 ' +
              ')',
            容器: e.container.name + ' ' + e.containerVersion.name,
            操作系统: e.sysImageType.name + ' ' + e.sysImageVersion.name,
            存储: e.storageType.name + ' ' + e.storageSize + 'G',
            网络: e.isAllocatedIP ? e.networkNumber + '*' + '弹性公网IP' + '(' + e.networkBandwidth + 'Mbps)' : null,
            跨站虚拟专网: e.ceniNetwork ? e.ceniNetworkBandwidth + 'Mbps' : null
          }
          configInfoObj.push(tempList)
        })
        // const configInfoObj = {
        //   // 站点: this.businessData.stationName || '',
        //   参数规格:
        //     this.configureBase.gpuProductName +
        //     ' (' +
        //     this.configureBase.cpuSize +
        //     'CPU, ' +
        //     this.configureBase.memorySize +
        //     'GB内存, ' +
        //     ')',

        //   镜像: this.sysImageType.name + ' ' + this.sysImageVersion,
        //   系统盘: this.storageType.name + ' ' + this.storageSize + 'G'
        // }
        const configInfo = JSON.stringify(configInfoObj)
        const transactionInfoObj = {
          规格费用: this.specFee + '算力豆', // 规格的价格
          配置费用: this.baseCount + '算力豆', // 配置费用的价格
          存储费用: this.storageCount + '算力豆', // 存储的价格
          宽带费用: this.broadbandCount + '算力豆', // 宽带配置的费用价格
          合计费用: this.moneyCount + '算力豆' // 总价格
        }
        const transactionInfo = JSON.stringify(transactionInfoObj)
        param.configInfo = configInfo
        param.price = this.moneyCount
        param.transactionInfo = transactionInfo
        store
          .dispatch('testBedAdd', param)
          .then(res => {
            if (res && res.statusCode === 200) {
              const orderId = res.data ? res.data : null
              that.orderId = orderId
              this.handleCurrentStep(2)
            } else {
              this.$message.error(res.message || '后端异常，请联系管理员', 3)
            }
          })
          .catch(() => {
            this.$message.error('后端异常，请联系管理员', 3)
          })
        store.dispatch('GetInfo')
      }
    },
    handleCurrentStepBeforeSuccess() {
      if (this.canPayPassword && this.canPayCount) {
        const param = {
          payPassword: this.$refs.payOrder.pwdList.join(''),
          productName: this.productName,
          productNumber: this.serverNum,
          orderId: this.orderId,
          price: this.moneyCount,
          payType: '8', // 1-支付宝 2-微信 3-GPU云服务器算力豆支付 4-弹性公网算力豆支付
          chargeType: this.tabKey === 'monthTab' ? 0 : 1 //计费方式 0-包年包月 1-按小时计费【必须】"
        }
        orderPay([param]).then(res => {
          if (res && res.data) {
            // int，1成功；2没有设置支付密码；3密码输入错误(如果只有0次了也返回)；4订单支付时间过期
            const status = res.data.status || 1
            if (status === 1) {
              this.handleCurrentStep(3)
              store.dispatch('GetInfo')
            } else if (status === 2) {
              const str = '请先设置支付密码'
              this.canPayPassword = false
              this.$refs.payOrder.message = str
            } else if (status === 3) {
              const count = res.data.count || 0
              if (count === 0) {
                this.$message.error('密码连续输错，已锁定，请稍后再试', 5)
                setTimeout(() => {
                  this.$router.push({ path: '/home' })
                }, 5000)
                const str = ''
                this.$refs.payOrder.message = str
              } else {
                const str = '支付密码不正确，您还可以尝试' + count + '次'
                this.$refs.payOrder.message = str
              }
            } else if (status === 4) {
              this.$message.error('订单支付时间过期', 2)
              setTimeout(() => {
                this.$router.push({ path: '/home' })
              }, 2000)
            } else if (status === 5) {
              this.$message.error('账户余额不足', 2)
              store.dispatch('GetInfo')
              setTimeout(() => {
                this.$router.push({ path: '/home' })
              }, 2000)
            }
          } else if (res && res.statusCode && res.statusCode === 200) {
            this.handleCurrentStep(3)
            store.dispatch('GetInfo')
          } else {
            this.$message.error(res.message || '服务异常', 2)
            // this.$router.push({ path: '/home' })
          }
        })
      }
    },
    // 购买流程
    handleCurrentStep(value) {
      this.currentStep = value
      if (value === 0) {
        // 所有数据刷新
        Object.assign(this.$data, this.$options.data())
        // GPU类型也要清空
        this.updateGpuTabList([])
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  width: 100%;
  min-height: calc(100vh - 60px);
  position: relative;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  .content {
    z-index: 1;
    width: 100%;
    padding: 0 30px 116px 30px; // 下面的是固定页脚，需要超过这个116px
    .content_title {
      font-size: 20px;
      line-height: 20px;
      color: #333333;
      padding: 30px;
    }
    .content_title_button {
      margin-top: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .content_title_more {
        width: 112px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-left: 15px;
        background-color: #e6f2ff;
        border-radius: 2px;
        border: solid 1px #75c6ee;
        font-size: 14px;
      }
      .content_title_more:hover {
        cursor: pointer;
        color: #33b0ed;
      }
    }
    .content_block {
      width: 100%;
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
