<template>
  <div class="configure-server">
    <a-card :bordered="false" class="sure-info">
      <div class="title">
        <div class="title_logo"></div>
        <div class="title_content">确认配置信息</div>
      </div>
      <div class="content">
        <div class="content_header">云服务器配置详情</div>
        <div style="display:flex;flex-wrap:wrap;padding:15px">
          <div v-for="item in businessData" :key="item.stationId" class="content_main">
            <div class="content_divider">
              <div class="content_main_item" style="width:320px">
                <div class="content_main_item_index">站点：</div>
                <div class="content_main_item_main">{{ item.stationName }}</div>
              </div>
              <div class="content_main_item">
                <div class="content_main_item_index">参数规格：</div>
                <div class="content_main_item_main">
                  {{
                    item.configureBase && item.configureBase.gpuProductName ? item.configureBase.gpuProductName : '空 '
                  }}
                  ({{
                    item.configureBase && item.configureBase.cpuDesp && item.configureBase.cpuDesp == 'arm'
                      ? 'ARM计算'
                      : ' X86计算'
                  }},{{ item.configureBase && item.configureBase.cpuSize ? item.configureBase.cpuSize : ' 空' }}CPU,
                  {{
                    item.configureBase && item.configureBase.memorySize ? item.configureBase.memorySize : ' 空'
                  }}GB内存)
                </div>
              </div>
              <div class="content_main_item">
                <div class="content_main_item_index">容器：</div>
                <div class="content_main_item_main">
                  {{ item.container && item.container.name ? item.container.name : '空' }}
                  {{ item.containerVersion && item.containerVersion.name ? item.containerVersion.name : '未定义' }}
                </div>
              </div>
              <div class="content_main_item">
                <div class="content_main_item_index">操作系统</div>
                <div class="content_main_item_main">
                  {{ item.sysImageType && item.sysImageType.name ? item.sysImageType.name : '未定义' }}
                  {{ item.sysImageVersion && item.sysImageVersion.name ? item.sysImageVersion.name : '未定义' }}
                </div>
              </div>
              <div class="content_main_item">
                <div class="content_main_item_index">系统盘：</div>
                <div class="content_main_item_main">
                  {{ item.storageType && item.storageType.name ? item.storageType.name : '未定义' }} 容量{{
                    item.storageSize ? item.storageSize + 'GB' : '空'
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div v-if="item.isAllocatedIP || item.ceniNetwork in businessData" class="content"> -->
      <div class="content">
        <div class="content_header">网络配置详情</div>
        <div style="display:flex; flex-wrap:wrap;padding:15px">
          <div v-for="item in businessData" :key="item.stationId" class="content_main">
            <div class="content_divider" style="width:320px">
              <div class="content_main_item">
                <div class="content_main_item_index">站点：</div>
                <div class="content_main_item_main">
                  {{ item.stationName }}
                </div>
              </div>
              <div class="content_main_item" style="width:450px">
                <div class="content_main_item_index">弹性IP：</div>
                <div class="content_main_item_main" style="margin-left:30px">
                  <!-- {{ item.isAllocatedIP ? '已配置' + item.networkNumber : '无' }} -->
                  {{ item.isAllocatedIP ? '是' : '无' }}
                </div>
                <div v-if="item.isAllocatedIP" class="content_main_item_indexo" style="margin-left:20px">带宽：</div>
                <div v-if="item.isAllocatedIP" class="content_main_item_maino">{{ item.networkBandwidth }}Mbps</div>
              </div>
              <div class="content_main_item" style="width:450px">
                <div class="content_main_item_index" style="width:110px">跨站虚拟专网：</div>
                <div class="content_main_item_main">
                  <!-- {{ item.ceniNetwork ? '已配置' : '无' }} -->
                  {{ item.ceniNetwork ? '是' : '无' }}
                </div>
                <div v-if="item.ceniNetwork" class="content_main_item_indexo" style="margin-left:20px">带宽：</div>
                <div v-if="item.ceniNetwork" class="content_main_item_maino">{{ item.ceniNetworkBandwidth }}Mbps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <warn-alter :style="{ display: infoCheck ? 'block' : 'none' }" :marginLeft="4" class="warning">
        <template slot="extra">站点配置不能为空,请返回重新选择</template>
      </warn-alter>
    </a-card>

    <a-card :bordered="false" class="order-info">
      <div class="title">
        <div class="title_logo"></div>
        <div class="title_content">核对订单</div>
      </div>
      <div class="content">
        <div class="content_header">
          <div
            class="content_header_item"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            产品
          </div>
          <div
            class="content_header_item"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            数量
          </div>
          <div
            class="content_header_item"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            付费类型
          </div>

          <div
            v-if="businessData && businessData[0] && businessData[0].tabKey === 'monthTab'"
            class="content_header_item"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '0' }"
          >
            时长
          </div>
          <div
            class="content_header_item"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            总计费用
          </div>
        </div>
        <!-- <div v-if="item.isAllocatedIP || item.ceniNetwork in businessData" class="content这是一条分割线-----------------------------------------------------------------------"> -->

        <div class="content_main">
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            <!-- {{ businessData && businessData[0] && businessData[0].productName ? businessData[0].productName : '' }} -->
            云服务器
          </div>
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            {{ total + '台' || 'hh' }}
          </div>
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            {{ businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '包年包月' : '按量计费' }}
          </div>
          <div
            v-if="businessData && businessData[0] && businessData[0].tabKey === 'monthTab'"
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '0' }"
          >
            {{ businessData && businessData[0] && businessData[0].timeNum ? businessData[0].timeNum + '个月' : '' }}
          </div>
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            <span>
              <ellipsis :length="8" tooltip>{{ formatNumber(storageCount + specFee) }}</ellipsis>
            </span>
            <span>
              {{ moneyCount !== undefined ? '算力豆' : '' }}
            </span>
            <a-popover class="content_main_popover">
              <template slot="title">
                <div
                  style="width: 240px; font-size: 16px; display: flex; justify-content: space-between; color: #333333;"
                >
                  <div style="width: 140px">计费项</div>
                  <div style="width: 100px">价格</div>
                </div>
              </template>
              <template slot="content">
                <div
                  style="width: 240px; font-size: 14px; display: flex; justify-content: space-between; color: rgba(51, 51, 51, 0.8);padding-bottom: 12px; border-bottom: 1px solid #e6edf5;"
                >
                  <div style="width: 140px">规格配置费用</div>
                  <div style="width: 100px">{{ formatNumber(specFee) }}算力豆</div>
                </div>
                <div
                  style="width: 240px; font-size: 14px; display: flex; justify-content: space-between; color: rgba(51, 51, 51, 0.8);padding: 12px 0; border-bottom: 1px solid #e6edf5;"
                >
                  <div style="width: 140px">存储费用</div>
                  <div style="width: 100px">{{ formatNumber(storageCount) }}算力豆</div>
                </div>
                <!-- <div
                  v-if="broadbandCount"
                  style="width: 240px; font-size: 14px; display: flex; justify-content: space-between; color: rgba(51, 51, 51, 0.8);padding: 12px 0; border-bottom: 1px solid #e6edf5;"
                >
                  <div style="width: 140px">宽带费用</div>
                  <div style="width: 100px">{{ formatNumber(broadbandCount) }}算力豆</div>
                </div> -->
                <div
                  style="width: 240px; font-size: 16px; display: flex; justify-content: space-between; padding: 12px 0; color: #333333;"
                >
                  <div style="width: 140px">合计费用</div>
                  <div style="width: 100px">{{ formatNumber(storageCount + specFee) }}算力豆</div>
                </div>
              </template>
              <span class="content_main_item_popover_explain">
                明细
              </span>
            </a-popover>
          </div>
        </div>
        <div v-if="businessData && businessData[0] && businessData[0].isAllocatedIP" class="content_main">
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            弹性IP
          </div>
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            {{ totalIp + '个' || 'hh' }}
          </div>
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            {{ businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '包年包月' : '按量计费' }}
          </div>
          <div
            v-if="businessData && businessData[0] && businessData[0].tabKey === 'monthTab'"
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '0' }"
          >
            {{ businessData && businessData[0] && businessData[0].timeNum ? businessData[0].timeNum + '个月' : '' }}
          </div>
          <div
            class="content_main_itemdd"
            :style="{ width: businessData && businessData[0] && businessData[0].tabKey === 'monthTab' ? '20%' : '25%' }"
          >
            <span>
              <ellipsis :length="8" tooltip>{{ formatNumber(broadbandCount) }}</ellipsis>
            </span>
            <span>
              {{ moneyCount !== undefined ? '算力豆' : '' }}
            </span>
            <a-popover class="content_main_popover">
              <template slot="title">
                <div
                  style="width: 240px; font-size: 16px; display: flex; justify-content: space-between; color: #333333;"
                >
                  <div style="width: 140px">计费项</div>
                  <div style="width: 100px">价格</div>
                </div>
              </template>
              <template slot="content">
                <div
                  v-if="broadbandCount"
                  style="width: 240px; font-size: 14px; display: flex; justify-content: space-between; color: rgba(51, 51, 51, 0.8);padding: 12px 0; border-bottom: 1px solid #e6edf5;"
                >
                  <div style="width: 140px">宽带费用</div>
                  <div style="width: 100px">{{ formatNumber(broadbandCount) }}算力豆</div>
                </div>
                <div
                  style="width: 240px; font-size: 16px; display: flex; justify-content: space-between; padding: 12px 0; color: #333333;"
                >
                  <div style="width: 140px">合计费用</div>
                  <div style="width: 100px">{{ formatNumber(broadbandCount) }}算力豆</div>
                </div>
              </template>
              <span class="content_main_item_popover_explain">
                明细
              </span>
            </a-popover>
          </div>
        </div>
      </div>
    </a-card>
    <a-card :bordered="false" class="check-info">
      <div class="title">
        <div class="title_logo"></div>
        <div class="title_content">服务协议</div>
      </div>
      <div class="content">
        <div class="content_header">
          <div class="content_header_index">
            <a-checkbox @change="checkServerNotify"> </a-checkbox>
          </div>
          <div class="content_header_about" style="width:230px">《OneITLab实验资源服务条款》</div>
          <warn-alter :style="{ display: dispalyWarnCheck ? 'block' : 'none' }" :marginLeft="4">
            <template slot="extra">您必须先认真阅读相关服务协议，并同意</template>
          </warn-alter>
        </div>
        <div class="content_more">
          <span class="content_more_explain">退款规则及操作说明</span>
          <span class="content_more_notice">购买须知</span>
        </div>
      </div>
    </a-card>
    <!-- <a-button @click="handleCurrentStepBeforePay">测验</a-button> -->
  </div>
</template>

<script>
import WarnAlter from '../../WarnAlter'
import { Ellipsis } from '@/components'
import { formatNumber } from '../../../utils/util'
export default {
  name: 'SureConfigure',
  components: {
    WarnAlter,
    Ellipsis
  },
  props: {
    businessData: {
      type: Array,
      default: null
    },
    moneyCount: {
      type: Number,
      default: 0
    },
    broadbandCount: {
      type: Number,
      default: 0
    },
    storageCount: {
      type: Number,
      default: 0
    },
    specFee: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      checked: false,
      dispalyWarnCheck: false,
      infoCheck: false,
      total: 0,
      totalIp: 0
    }
  },
  computed: {},
  mounted() {
    this.sumSeverNumber()
    console.log(this.businessData, '888888888888888888', this.sumSeverNumber())
  },
  methods: {
    sumSeverNumber() {
      this.total = this.businessData.reduce((p, e) => p + e.serverNum, 0)
      this.totalIp = this.businessData.reduce((p, e) => p + e.networkNumber, 0)
      this.$emit('sumSeverNumber', this.total)
    },
    formatNumber,
    handleCurrentStepBeforePay() {
      this.$emit('handleCurrentStepBeforePay')
    },
    checkServerNotify(e) {
      this.checked = e.target.checked
      this.dispalyWarnCheck = !e.target.checked
    }
  }
}
</script>

<style lang="less" scoped>
.warning {
  margin-top: 12px;
}
.content_main:nth-child(2n + 1) {
  border-right: 1px solid #e1e5ee;
}
.content_main:last-child {
  border: none;
}
.content_main_itemdd {
  padding-left: 23px;
}
.configure-server {
  width: 100%;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
  /deep/.ant-card-body {
    padding: 30px;
    margin-bottom: 8px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .title_logo {
      width: 6px;
      height: 6px;
      background-color: #33b0ed;
      border-radius: 50%;
      margin-right: 18px;
    }
    .title_content {
      height: 16px;
      font-size: 18px;
      line-height: 16px;
    }
  }
  .sure-info {
    .content {
      width: 850px;
      border-radius: 2px;
      border: solid 1px #e1e5ee;
      margin-top: 20px;
      .content_header {
        height: 45px;
        background-color: #f6f8fd;
        line-height: 45px;
        font-size: 16px;
        padding-left: 24px;
      }
      .content_main {
        padding: 20px 24px 4px 24px;
        font-size: 14px;
        .content_main_item {
          display: flex;
          align-items: center;

          margin-bottom: 14px;
          .content_main_item_index {
            width: 85px;
          }
          .content_main_item_main {
            margin-left: 5px;
          }
          .content_main_item_indexo {
            width: 45px;
          }
          .content_main_item_maino {
            margin-left: 5px;
            width: 145px;
          }
        }
      }
    }
  }
  .order-info {
    .content {
      width: 850px;
      border-radius: 2px;
      border: solid 1px #e1e5ee;
      margin-top: 20px;

      .content_header {
        height: 45px;
        background-color: #f6f8fd;
        line-height: 45px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .content_header_item {
          padding-left: 24px;
        }
      }
      .content_main {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 20px 0;

        .content_main_itemdd {
          font-size: 16px;
          .content_main_item_popover_explain {
            font-size: 14px;
            color: #33b0ed;
          }
          .content_main_item_popover_explain:hover {
            cursor: default;
          }
        }
      }
    }
  }
  .check-info {
    .content {
      margin-left: 12px;
      .content_header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 21px;
        .content_header_index {
          margin-right: 10px;
        }
        .content_header_about {
          width: 194px;
          height: 12px;
          font-size: 14px;
          line-height: 12px;
          text-align: center;
          color: #33b0ed;
        }
        .content_header_about:hover {
          cursor: pointer;
        }
      }
      .content_more {
        margin: 10px 0 0 42px;
        color: #33b0ed;
        font-size: 14px;
        .content_more_explain {
          text-decoration: underline;
          margin-right: 28px;
        }
        .content_more_explain:hover {
          cursor: pointer;
        }
        .content_more_notice:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
