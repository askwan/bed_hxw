<template>
  <div class="configure-server">
    <a-card :bordered="false" class="optional">
      <div class="optional_main">
        <span class="optional_title">计费方式</span>
        <div class="optional_tab" :style="tabKey === 'monthTab' ? styleObject : null" @click="changeTabKey('monthTab')">
          <span class="optional_tab_h3">包年包月</span>
          <span class="optional_tab_explain">（预付费，优惠更多）</span>
        </div>
        <div class="optional_tab" :style="tabKey === 'hourTab' ? styleObject : null" @click="changeTabKey('hourTab')">
          <span class="optional_tab_h3">按使用量计费（小时）</span>
          <span class="optional_tab_explain">（后付费，每小时自动扣费）</span>
        </div>
      </div>
      <div class="explain">
        <span v-if="tabKey === 'monthTab'">支持多种付费方式，使用更灵活，性价比更高。</span>
        <span v-else-if="tabKey === 'hourTab'">
          按量付费+节省计划，价格跟包年包月相近，支持分期付款，资源使用更加灵活。
        </span>
      </div>
    </a-card>
    <a-card :bordered="false" class="station">
      <div class="station_main">
        <span class="optional_title">站点</span>
        <a-checkbox-group @change="changeStation">
          <a-checkbox v-for="item in menuListToOptionNotAll(stationAll)" :key="item.key" :value="JSON.stringify(item)">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
        <warn-alter :style="{ display: dispalyWarnStation ? 'block' : 'none' }" :marginLeft="4">
          <template slot="extra">请选择适合您的站点</template>
        </warn-alter>
      </div>
      <div class="explain">
        支持在不同站点间选择多台云服务器，以更好的适配您试验床的开发需求。
      </div>
    </a-card>
    <a-card :bordered="false" class="gpu">
      <div class="gpu_main">
        <span class="optional_title">规格配置</span>
        <div class="optional_tab_index">架构：</div>
        <div
          v-for="item in checkSpecList"
          :key="item.key"
          class="optional_tab_gpu"
          :style="gpuTabKey === item.key ? styleObject : null"
          @click="changeGpuTabKey(item)"
        >
          <div>
            <span>
              <ellipsis :length="20" tooltip>{{ item.name }}</ellipsis>
            </span>
          </div>
        </div>
        <warn-alter :style="{ display: dispalyWarnGpu ? 'block' : 'none' }" :marginLeft="4">
          <template slot="extra">请选择适合您的架构</template>
        </warn-alter>
      </div>
      <div class="gpu_search">
        <div class="gpu_search_index">规格名称：</div>
        <div class="gpu_search_button">
          <a-input
            v-model="gpuSearchName"
            autocomplete="off"
            :maxLength="14"
            class="gpu_search_button_out"
            @pressEnter="handleGpuSearchName"
          >
            <img
              slot="suffix"
              src="~@/assets/image/product/cloudServer/search.png"
              class="gpu_search_button_logo"
              alt="logo"
              @click.stop="handleGpuSearchName"
            />
          </a-input>
        </div>
      </div>
      <div class="gpu_table">
        <a-table
          v-if="selectedKeyFlag"
          key="selectedKeyFlagTrue"
          :bordered="false"
          :row-key="(record, index) => record.id + index"
          :loading="loadingGpu"
          :columns="columns"
          :data-source="gpuInfoList"
          :pagination="false"
          style="width: 850px"
          :row-selection="rowSelection"
          :locale="{ emptyText: '暂无可选服务器' }"
        >
          <span slot="gpuProductName" slot-scope="text">
            <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="cpuSize" slot-scope="text">
            <ellipsis :length="10" tooltip>{{ text + 'CPU' }}</ellipsis>
          </span>
          <span slot="memorySize" slot-scope="text">
            <ellipsis :length="10" tooltip>{{ text + 'GB' }}</ellipsis>
          </span>
          <span slot="gpuTypeValue" slot-scope="text">
            <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="price" slot-scope="text">
            <ellipsis :length="20" tooltip>{{ priceUnitFilter(text) }}</ellipsis>
          </span>
        </a-table>
        <a-table
          v-if="!selectedKeyFlag"
          key="selectedKeyFlagFalse"
          :bordered="false"
          :row-key="(record, index) => record.id + index"
          :loading="loadingGpu"
          :columns="columns"
          :data-source="gpuInfoList"
          :pagination="false"
          style="width: 850px"
          :row-selection="rowSelection"
          :locale="{ emptyText: '暂无可选服务器' }"
        >
          <span slot="gpuProductName" slot-scope="text">
            <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="cpuSize" slot-scope="text">
            <ellipsis :length="10" tooltip>{{ text + 'CPU' }}</ellipsis>
          </span>
          <span slot="memorySize" slot-scope="text">
            <ellipsis :length="10" tooltip>{{ text + 'GB' }}</ellipsis>
          </span>
          <span slot="gpuTypeValue" slot-scope="text">
            <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="price" slot-scope="text">
            <ellipsis :length="20" tooltip>{{ priceUnitFilter(text) }}</ellipsis>
          </span>
        </a-table>
      </div>
      <div class="gpu_detial">
        <div>
          当前所选规格： {{ selectedRows && selectedRows.gpuProductName ? selectedRows.gpuProductName : ' ' }} ({{
            selectedRows && selectedRows.cpuSize ? selectedRows.cpuSize + 'CPU, ' : ' '
          }}{{ selectedRows && selectedRows.memorySize ? selectedRows.memorySize + 'GB内存' : ' ' }})
        </div>
        <warn-alter :style="{ display: dispalyWarnRows ? 'block' : 'none' }" :marginLeft="4">
          <template slot="extra">请选择适合您的规格配置</template>
        </warn-alter>
      </div>
    </a-card>
    <a-card :bordered="false" class="docker">
      <div class="system_main">
        <span class="optional_title">容器</span>
        <!-- Docker 需要重新定义数据 -->
        <a-select
          v-model="firstContainerValue"
          style="width: 180px; height: 30px; marginRight: 6px"
          @change="handleContainerChange"
        >
          <a-select-option
            v-for="item in dictionaryToOptionNotAll(tempContainerAll)"
            :key="item.key"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>

        <a-select
          v-model="secondContainerVersionValue"
          style="width: 180px; height: 30px;"
          @change="handleContainerVersionChange"
        >
          <a-select-option
            v-for="item in dictionaryToOptionNotAll(containerVersions)"
            :key="item.key"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>

        <warn-alter :style="{ display: dispalyWarnAi ? 'block' : 'none' }" :marginLeft="16">
          <template slot="extra">请选择适合您的容器</template>
        </warn-alter>
      </div>
      <div class="explain">
        容器将会预装在购买的云服务器中，无需配置，可一键部署至云服务器中，满足开发的基本需求。
      </div>
    </a-card>
    <a-card :bordered="false" class="system">
      <div class="system_main">
        <span class="optional_title">镜像</span>
        <div class="system_tab_index">操作系统：</div>
        <a-select
          v-model="firstSysValue"
          style="width: 180px; height: 30px; marginRight: 6px"
          @change="handleSysFrameChange"
        >
          <a-select-option v-for="item in dictionaryToOptionNotAll(tempOsAll)" :key="item.key" :value="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>

        <a-select v-model="secondSysVersionValue" style="width: 180px; height: 30px;" @change="handleSysVersionChange">
          <a-select-option v-for="item in dictionaryToOptionNotAll(sysVersions)" :key="item.key" :value="item.value">
            {{ item.name }}
          </a-select-option>
        </a-select>
        <warn-alter :style="{ display: dispalyWarnSys ? 'block' : 'none' }" :marginLeft="16">
          <template slot="extra">请选择适合您的操作系统</template>
        </warn-alter>
      </div>
    </a-card>
    <a-card :bordered="false" class="storage">
      <div class="storage_main">
        <span class="optional_title">存储</span>
        <div class="storage_tab_index">
          <a-select
            :disabled="true"
            :value="storageType || null"
            style="width: 180px; height: 30px; marginRight: 7px"
            @change="handleStorageChange"
          >
            <a-select-option v-for="item in dictionaryToOptionNotAll(storageAll)" :key="item.key" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <count-input
          class="storage_input_block"
          :maxValue="20480"
          :minValue="30"
          :defaultValue="storageSize"
          :width="120"
          :require="true"
          :err.sync="countErrStorage"
          @handleInputValue="handleStorageSize"
        />
        <span>GB</span>
        <span style="fontSize: 12px; marginLeft: 16px; color: #5c5c5c;">容量最小值是30GB</span>
        <warn-alter :style="{ display: dispalyWarnStorage ? 'block' : 'none' }" :marginLeft="38">
          <template slot="extra">请选择适合您的存储</template>
        </warn-alter>
      </div>
    </a-card>
    <a-card :bordered="false" class="ip">
      <div class="ip_main">
        <span class="optional_title">网络</span>
        <div class="ip_tab_index">
          <a-checkbox @change="onIpChange">
            <div
              style="width: 103px; height: 30px; lineHeight: 30px; textAlign: center; fontSize: 12px; borderRadius: 2px; border: solid 1px #e1e5ee;"
            >
              分配弹性公网IP
            </div>
          </a-checkbox>
        </div>
      </div>
      <div class="explain">
        可采用更加灵活的弹性公网 IP 方案和直通IP方案
      </div>
      <div class="ip_input" :style="{ display: ipDisplay ? 'flex' : 'none' }">
        <NetworkItem
          v-for="(item, index) in selectedStation"
          :key="index"
          style="margin-right: 40px;margin-top: 20px"
          :stationValue="item"
          :dataList="businessData"
          @handleNetworkValue="handleNetworkValue"
        ></NetworkItem>
      </div>
    </a-card>

    <a-card :bordered="false" class="ceni">
      <div class="ceni_main">
        <span class="optional_title"></span>
        <div style="display: flex">
          <div class="ceni_tab_index">
            <a-checkbox @change="onCeniChange">
              <div
                style="width: 103px; height: 30px; lineHeight: 30px; textAlign: center; fontSize: 12px; borderRadius: 2px; border: solid 1px #e1e5ee;"
              >
                跨站虚拟专网
              </div>
            </a-checkbox>
          </div>
          <div class="ceni_input" :style="{ display: isDisplayCeni ? 'flex' : 'none' }">
            <div class="ceni_input_index">内网带宽：</div>
            <count-input
              :maxValue="1000"
              :minValue="1"
              :defaultValue="1"
              :width="138"
              :require="true"
              :err.sync="countErrIP"
              @handleInputValue="handleCeniSize"
            />
            <div style="margin-left: 5px">Mbps</div>
          </div>
        </div>
      </div>
      <div class="explain">
        跨站虚拟专网基于CENI网专线，选择后可以保障您的通信质量以及传输速度。
      </div>
    </a-card>

    <a-card :bordered="false" class="name">
      <div class="name_main">
        <span class="name_main_title">分布式试验床名称</span>
        <div class="name_main_input">
          <a-input
            v-model="serverName"
            placeholder="分布式试验床"
            :maxLength="20"
            @blur="handleServerName"
            @change="handleServerNameChange"
          />
        </div>
        <img src="~@/assets/image/product/cloudServer/edit.png" class="name_main_logo" alt="logo" />
        <warn-alter :style="{ display: dispalyWarnServerName ? 'block' : 'none' }" :marginLeft="38">
          <template slot="extra">输入名称格式有误</template>
        </warn-alter>
      </div>
      <div class="name_explain">
        目前名称最大可输入20个字符，格式支持中文，英文字母，数字，与下划线“_”
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Ellipsis } from '@/components'
import CountInput from '../../CountInput'
import WarnAlter from '../../WarnAlter'
import { specConfigId, availableMirror } from '@/api/Product/cloudServer'
import NetworkItem from './childComp/NetworkItem'
const monthColumns = [
  {
    title: '名称',
    dataIndex: 'gpuProductName',
    width: '100px',
    scopedSlots: { customRender: 'gpuProductName' }
  },
  {
    title: 'vCPU',
    dataIndex: 'cpuSize',
    width: '90px',
    scopedSlots: { customRender: 'cpuSize' }
  },
  {
    title: 'vCPU描述',
    dataIndex: 'cpuDesp',
    width: '160px',
    scopedSlots: { customRender: 'cpuDesp' }
  },
  {
    title: '内存',
    dataIndex: 'memorySize',
    width: '160px',
    scopedSlots: { customRender: 'memorySize' }
  },
  {
    title: '费用',
    dataIndex: 'annualMonthlyPrice',
    width: '160px',
    scopedSlots: { customRender: 'price' }
  }
]
const hourColumns = [
  {
    title: '名称',
    dataIndex: 'gpuProductName',
    width: '100px',
    scopedSlots: { customRender: 'gpuProductName' }
  },
  {
    title: 'vCPU',
    dataIndex: 'cpuSize',
    width: '90px',
    scopedSlots: { customRender: 'cpuSize' }
  },
  {
    title: 'vCPU描述',
    dataIndex: 'cpuDesp',
    width: '160px',
    scopedSlots: { customRender: 'cpuDesp' }
  },
  {
    title: '内存',
    dataIndex: 'memorySize',
    width: '160px',
    scopedSlots: { customRender: 'memorySize' }
  },
  {
    title: '费用',
    dataIndex: 'hourlyPrice',
    width: '160px',
    scopedSlots: { customRender: 'price' }
  }
]
export default {
  name: 'ConfigureServer',
  components: {
    NetworkItem,
    Ellipsis,
    CountInput,
    WarnAlter
  },
  props: {
    // 产品id
    productId: {
      type: [String, Number],
      default: null
    },
    businessData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      checkedList: [],
      selectedStation: [],
      plainOptions: ['北京', '南京', '盐城'],
      styleObject: {
        backgroundColor: '#e6f2ff',
        border: 'solid 1px #75c6ee'
      },
      tabKey: 'monthTab', // 按周期购买的标签
      columns: monthColumns,
      stationTabKey: '', // 站点的标签
      gpuTabKey: '', // GPU的标签
      gpuSearchName: '',
      gpuInfoList: [], // 查询到的GPU列表
      selectedRows: null, // 具体的GPU
      selectedKeyFlag: true,
      // 一下以下是几个warn是否展示，单独写
      dispalyWarnStation: false,
      dispalyWarnGpu: false,
      dispalyWarnRows: false,
      dispalyWarnAi: false,
      dispalyWarnSys: false,
      dispalyWarnStorage: false,
      dispalyWarnServerName: false,
      // 自定义数字输入必填项校验
      countErrIP: false,
      countErrStorage: false,
      // 镜像
      availableMirror: Object,
      // 以下是AI框架部分的参数开始
      firstAiFrame: null, // AI二级联动-框架选项的默认值
      aiVersions: [], // AI二级联动-版本的对应二级选项
      secondAiVersion: null, // AI二级联动-版本的对应二级选项的默认值对象
      secondAiVersionValue: null, // AI二级联动-版本的对应二级选项的默认值
      // 以上是AI框架部分的参数结束

      // 以下是容器部分的参数开始
      firstContainer: null, // 容器二级联动-框架选项的默认值
      firstContainerValue: null,
      containerVersions: [], // 容器二级联动-版本的对应二级选项
      secondContainerVersion: null, // 容器二级联动-版本的对应二级选项的默认值对象
      secondContainerVersionValue: null, // 容器二级联动-版本的对应二级选项的默认值
      // 以上是容器部分的参数结束
      // 以下是操作系统部分的参数开始
      firstSysFrame: null, // sys二级联动-框架选项的默认值
      firstSysValue: null,
      sysVersions: [], // sys二级联动-版本的对应二级选项
      secondSysVersion: null, // sys二级联动-版本的对应二级选项的默认值对象
      secondSysVersionValue: null, // sys二级联动-版本的对应二级选项的默认值
      // 以上是操作系统部分的参数结束
      // 存储
      storageType: null, // 存储类型
      storageSize: 30, // 存储大小
      ipDisplay: false, // 是否选择弹性IP
      isDisplayCeni: false,
      ipSize: 1, // 宽带的大小
      ceniSize: 1, // ceni宽带大小
      serverName: '', // 服务器名称
      checkSpecList: [],
      tempOsAll: [],
      tempOsVersionAll: [],
      tempContainerAll: [],
      tempContainerVersionAll: []
    }
  },
  computed: {
    ...mapState({
      osAll: state => state.cloudServer.dictionary['OS'] || [], // 操作系统
      osVersionAll: state => state.cloudServer.dictionary['OS_VERSION'] || [], // 操作系统版本
      aiAll: state => state.cloudServer.dictionary['AI'] || [], // AI框架
      aiVersionAll: state => state.cloudServer.dictionary['AI_VERSION'] || [], // AI框架版本
      containerAll: state => state.cloudServer.dictionary['CONTAINER'] || [], // CONTAINER框架
      containerVersionAll: state => state.cloudServer.dictionary['CONTAINER_VERSION'] || [], // CONTAINER框架版本
      storageAll: state => state.cloudServer.dictionary['STORAGE_TYPE'] || [], // 存储类型
      specConfigArchitecture: state => state.cloudServer.dictionary['CPU_TYPE'] || [],
      loadingGpu: state => state.cloudServer.loadingGpu,
      stationAll: state => state.cloudServer.stationAll || [],
      gpuTabList: state => state.cloudServer.gpuTabList
    }),
    // GPU具体选项
    rowSelection() {
      const that = this
      return {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
          that.selectedRows = selectedRows[0]
          const tempBusinessData = that.businessData
          // 查询出具体的资源池，拿到存储类型
          if (selectedRows[0] && selectedRows[0].specConfigId) {
            const configId = selectedRows[0].specConfigId
            specConfigId({ specConfigId: configId }).then(res => {
              that.storageType =
                res && res.data && res.data.storageType !== null && res.data.storageType !== undefined
                  ? res.data.storageType
                  : null
              const storageItem = { id: res.data.storageType || null, name: res.data.storageTypeName || null }

              tempBusinessData.forEach(e => {
                e.configureBase = selectedRows[0]
                e.storageType = {
                  name: res.data.storageTypeName,
                  type: res.data.storageType
                }

                e.serverValue = selectedRows[0]
                selectedRows[0].stationIdList.forEach((f, index) => {
                  if (f == e.stationId) {
                    e.resourceId = selectedRows[0].resourceIdList[index]
                    e.specConfigId = selectedRows[0].specConfigIdList[index]
                  }
                })
              })
              this.$emit('handleBusinessData', tempBusinessData)
              that.$emit('handleStorageType', storageItem)
              that.$emit('handleStorageSize', that.storageSize)
            })
          }

          this.$emit('handleConfigureBase', selectedRows[0])
          // this.$emit('handleBusinessData', tempBusinessData)
        }
      }
    }
  },
  watch: {
    gpuTabList: function(newValue, oldvalue) {
      if (oldvalue !== newValue) {
        this.gpuTabKey = '' // GPU的标签
        this.gpuSearchName = ''
        this.gpuInfoList = [] // 查询到的GPU列表
        this.selectedRows = null // 具体的GPU
        this.storageType = null
        this.selectedKeyFlag = !this.selectedKeyFlag
      }
    },
    selectedRows: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnRows = true
      } else {
        this.dispalyWarnRows = false
      }
    },
    // 站点标签
    stationTabKey: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnStation = true
      } else {
        this.dispalyWarnStation = false
      }
    },
    businessData: {
      // eslint-disable-next-line
      handler(val) {
        // console.log(val)
      }
    },
    // GPU标签
    gpuTabKey: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnGpu = true
      } else {
        this.dispalyWarnGpu = false
      }
      this.selectedRows = null // 具体的GPU
      this.storageType = null
      this.selectedKeyFlag = !this.selectedKeyFlag
    },
    // AI标签
    firstContainer: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnAi = true
      } else {
        this.dispalyWarnAi = false
      }
    },
    // AI标签
    secondContainerVersion: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnAi = true
      } else {
        this.dispalyWarnAi = false
      }
    },
    // 操作系统标签
    firstSysFrame: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnSys = true
      } else {
        this.dispalyWarnSys = false
      }
    },
    // 操作系统标签
    secondSysVersion: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnSys = true
      } else {
        this.dispalyWarnSys = false
      }
    },
    storageType: function(newValue, oldvalue) {
      console.log(oldvalue, newValue)
      if (newValue === null || newValue === undefined || newValue.length === 0) {
        this.dispalyWarnStorage = true
      } else {
        this.dispalyWarnStorage = false
      }
    }
  },
  mounted() {
    this.dictionaryByType()
    this.initStation()
  },
  methods: {
    ...mapActions(['dictionaryByType', 'multiSiteInfo', 'getSationList', 'externalType']),
    dictionaryToOptionNotAll(list) {
      const result = []
      if (!list || list.length === 0) return result
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        result.push({ key: item.id, name: item.name, value: item.id })
      }
      return result
    },
    changeStation(checkedList) {
      this.gpuTabKey = '' // GPU的标签
      this.gpuSearchName = ''
      this.gpuInfoList = [] // 查询到的GPU列表
      this.selectedRows = null // 具体的GPU
      this.selectedKeyFlag = false
      // 一下以下是几个warn是否展示，单独写
      this.dispalyWarnStation = false
      this.dispalyWarnGpu = false
      this.dispalyWarnRows = false
      this.dispalyWarnAi = false
      this.dispalyWarnSys = false
      this.dispalyWarnStorage = false
      this.dispalyWarnServerName = false
      // 自定义数字输入必填项校验
      this.countErrIP = false
      this.countErrStorage = false
      // 镜像
      this.availableMirror = {}

      // 以下是容器部分的参数开始
      this.firstContainer = null // 容器二级联动-框架选项的默认值
      this.firstContainerValue = null // 容器二级联动-框架选项的默认值
      this.secondContainerVersion = null // 容器二级联动-版本的对应二级选项的默认值对象
      this.secondContainerVersionValue = null // 容器二级联动-版本的对应二级选项的默认值
      // 以上是容器部分的参数结束
      // 以下是操作系统部分的参数开始
      this.firstSysFrame = null // sys二级联动-框架选项的默认值
      this.firstSysValue = null // sys二级联动-版本的对应二级选项的默认值对象
      this.secondSysVersion = null // sys二级联动-版本的对应二级选项的默认值对象
      this.secondSysVersionValue = null // sys二级联动-版本的对应二级选项的默认值
      // 以上是操作系统部分的参数结束
      // 存储
      this.storageType = null // 存储类型
      this.storageSize = 30 // 存储大小
      this.ipDisplay = false // 是否选择弹性IP
      this.isDisplayCeni = false
      this.ipSize = 1 // 宽带的大小
      this.ceniSize = 1 // ceni宽带大小
      this.serverName = '' // 服务器名称
      this.checkSpecList = []
      this.tempOsAll = []
      this.tempOsVersionAll = []
      this.tempContainerAll = []
      this.tempContainerVersionAll = []

      const tempArr = []
      const tempDataArr = []
      const tempBusinessDataArr = this.businessData
      checkedList.forEach(e => {
        let isHasStation = false
        const tempData = JSON.parse(e)
        tempArr.push(tempData)
        tempBusinessDataArr.forEach(f => {
          if (f.stationId == tempData.key) {
            isHasStation = true
            tempDataArr.push(f)
          }
        })
        if (!isHasStation) {
          tempDataArr.push({
            stationName: tempData.name,
            stationId: tempData.key,
            serverNum: 1,
            configureBase: null,
            tabKey: this.tabKey,
            specFee: 0, // 规格费用
            storageCount: 0, // 存储费用
            broadbandCount: 0, // 带宽费用
            moneyCount: 0, // 总费用
            networkBandwidth: 0,
            networkNumber: 0,
            productName: '分布式试验床',
            storageType: null, // 存储类型
            storageSize: 30, // 存储大小
            sysImageType: null, // 系统
            sysImageVersion: null, // 系统版本信息
            timeNum: 1, // 购买的时长，不带单位，周期方式为'月'、使用量方式为空
            isAllocatedIP: false,
            ceniNetwork: false,
            ceniNetworkBandwidth: 0
          })
        }
      })
      this.selectedStation = tempArr

      if (this.selectedStation.length == 0) {
        this.checkSpecList = []
      } else {
        this.checkSpecList = this.menuListToOptionNotAll(this.specConfigArchitecture)
      }

      // if (tempDataArr.length > 0) {
      //   // 重新查询规格配置
      //   if (tempDataArr[0].architectureTypeId) this.getGpuData()
      //   // 重新查询镜像
      //   const stationList = []
      //   tempArr.forEach(e => {
      //     stationList.push(e.key)
      //   })
      //   const obj = {
      //     productId: this.productId,
      //     stationIdList: stationList,
      //     architectureTypeId: tempDataArr[0].architectureTypeId
      //   }
      //   availableMirror(obj).then(res => {
      //     this.availableMirror = res.data
      //
      //     this.tempOsAll = []
      //     this.osAll.forEach(item => {
      //       this.availableMirror.osDicItemIds.forEach(e => {
      //         if (item.id === e) {
      //           this.tempOsAll.push(item)
      //         }
      //       })
      //     })
      //
      //     this.tempOsVersionAll = []
      //     this.osVersionAll.forEach(item => {
      //       this.availableMirror.versionDicItemIds.forEach(e => {
      //         if (item.id === e) {
      //           this.tempOsVersionAll.push(item)
      //         }
      //       })
      //     })
      //
      //     this.tempContainerAll = []
      //     this.containerAll.forEach(item => {
      //       this.availableMirror.softwareDicItemIds.forEach(e => {
      //         if (item.id === e) {
      //           this.tempContainerAll.push(item)
      //         }
      //       })
      //     })
      //
      //     this.tempContainerVersionAll = []
      //     this.containerVersionAll.forEach(item => {
      //       this.availableMirror.softwareVersionDicItemIds.forEach(e => {
      //         if (item.id === e) {
      //           this.tempContainerVersionAll.push(item)
      //         }
      //       })
      //     })
      //   })
      // }

      // 重置

      this.$emit('changeStationList', this.selectedStation)
      this.$emit('handleBusinessData', tempDataArr)
    },
    // 购买方式切换
    changeTabKey(value) {
      this.tabKey = value
      const tempBusinessData = this.businessData
      if (tempBusinessData != null) {
        tempBusinessData.forEach(e => {
          e.tabKey = value
        })
      }
      this.columns = value === 'monthTab' ? monthColumns : hourColumns
      this.$forceUpdate()
      this.$emit('changeTabKey', value)
      this.$emit('handleBusinessData', tempBusinessData)
    },
    menuListToOptionNotAll(list) {
      const result = []
      if (!list || list.length === 0) return result
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        result.push({ key: item.id, name: item.name, value: item.id })
      }
      return result
    },
    // gpu的tab需要筛选
    menuListToOptionGpu(list) {
      const result = []
      if (!list || list.length === 0) return result
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        result.push({ key: item.cardType, name: item.cardTypeName, value: item.cardType })
      }
      return result
    },
    // 查询所有站点
    initStation() {
      const productId = this.productId
      this.getSationList({ productId })
    },
    // 查询GPU列表
    getGpuData() {
      const { multiSiteInfo } = this
      const obj = {}
      obj.productId = this.productId
      if (this.gpuSearchName) {
        obj.name = this.gpuSearchName
      } // 模糊查询规格配置名称
      if (this.selectedStation) {
        const tempArr = []
        this.selectedStation.forEach(e => {
          tempArr.push(e.key)
        })
        obj.stationIdList = tempArr
      } //	站点ID
      if (this.gpuTabKey) {
        obj.architectureTypeId = this.gpuTabKey
      } //	GPU类型
      multiSiteInfo(obj)
        .then(res => {
          const gpuInfoList = res.data && res.data.rows ? res.data.rows : []
          gpuInfoList.forEach((item, index, arr) => {
            arr[index] = {
              ...item,
              id: index,
              specConfigId: item.specConfigIdList[0],
              gpuProductName: item.name || '',
              cpuSize: item.cpuCore || '',
              cpuDesp: item.cpuFeature || '',
              memorySize: item.memoryCapacity || '',
              gpuType: item.acceleratorTypeId,
              gpuTypeName: item.acceleratorTypeName,
              gpuTypeValue: (item.acceleratorNumber ? item.acceleratorNumber : 0) + '*' + item.acceleratorTypeName,
              hourlyPrice: item.hourlyPrice,
              annualMonthlyPrice: item.annualMonthlyPrice
            }
          })
          this.gpuInfoList = gpuInfoList
        })
        .catch(err => this.$error(err))
        .finally(() => {})
    },
    // GPU的切换
    changeGpuTabKey(item) {
      this.gpuTabKey = item.key
      const stationList = []
      this.selectedStation.forEach(e => {
        stationList.push(e.key)
      })

      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.architectureTypeId = item.key
      })
      this.$emit('handleBusinessData', tempBusinessData)

      const obj = {
        productId: this.productId,
        stationIdList: stationList,
        architectureTypeId: item.key
      }
      availableMirror(obj).then(res => {
        this.availableMirror = res.data

        this.tempOsAll = []
        this.osAll.forEach(item => {
          this.availableMirror.osDicItemIds.forEach(e => {
            if (item.id === e) {
              this.tempOsAll.push(item)
            }
          })
        })

        this.tempOsVersionAll = []
        this.osVersionAll.forEach(item => {
          this.availableMirror.versionDicItemIds.forEach(e => {
            if (item.id === e) {
              this.tempOsVersionAll.push(item)
            }
          })
        })

        this.tempContainerAll = []
        this.containerAll.forEach(item => {
          this.availableMirror.softwareDicItemIds.forEach(e => {
            if (item.id === e) {
              this.tempContainerAll.push(item)
            }
          })
        })

        this.tempContainerVersionAll = []
        this.containerVersionAll.forEach(item => {
          this.availableMirror.softwareVersionDicItemIds.forEach(e => {
            if (item.id === e) {
              this.tempContainerVersionAll.push(item)
            }
          })
        })
      })
      this.gpuSearchName = ''
      this.$emit('changeGpuTabKey', item)
      this.getGpuData()
    },
    // 模糊搜索GPU名称
    handleGpuSearchName() {
      if (this.gpuTabKey) {
        this.getGpuData()
      } else {
        this.$message.error('请先选择具体站点下的的GPU类型再做搜索', 2)
      }
    },
    // 算力豆单价的单位
    priceUnitFilter(type) {
      if (this.tabKey === 'monthTab') {
        return type + '算力豆/月'
      } else {
        return type + '算力豆/小时'
      }
    },
    // 容器的select二级联动的选项
    handleContainerChange(value) {
      const containerVersionAll = this.tempContainerVersionAll
      const containerVersionAllTemp = containerVersionAll.filter(item => {
        if (item.parentId === value) {
          return item
        }
      })
      const ItemValue = this.tempContainerAll.find(item => {
        return item.id === value
      })
      this.firstContainerValue = value
      this.firstContainer = ItemValue // 一级选项
      this.containerVersions = containerVersionAllTemp || []
      const secondContainerVersion = containerVersionAllTemp[0] ? containerVersionAllTemp[0] : null
      this.secondContainerVersion = secondContainerVersion
      this.secondContainerVersionValue =
        secondContainerVersion && secondContainerVersion.id ? secondContainerVersion.id : null
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.container = ItemValue
        e.containerVersion = secondContainerVersion
      })
      this.$emit('handleAiImageType', ItemValue)
      this.$emit('handleAiImageVersion', secondContainerVersion)
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 容器的select二级联动的选项-子选项
    handleContainerVersionChange(value) {
      const ItemValue = this.containerVersions.find(item => {
        return item.id === value
      })
      this.secondAiVersion = ItemValue
      this.secondAiVersionValue = ItemValue && ItemValue.id ? ItemValue.id : null
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.containerVersion = ItemValue
      })
      this.$emit('handleAiImageVersion', ItemValue)
      this.$emit('handleBusinessData', tempBusinessData)
    },

    // 操作系统框架的select二级联动的选项
    handleSysFrameChange(value) {
      const osVersionAll = this.tempOsVersionAll
      const osVersionAllTemp = osVersionAll.filter(item => {
        if (item.parentId === value) {
          return item
        }
      })
      const ItemValue = this.osAll.find(item => {
        return item.id === value
      })
      this.firstSysValue = value
      this.firstSysFrame = ItemValue // 一级选项

      this.sysVersions = osVersionAllTemp || []
      const secondSysVersion = osVersionAllTemp[0] ? osVersionAllTemp[0] : ''
      this.secondSysVersion = secondSysVersion
      this.secondSysVersionValue = secondSysVersion && secondSysVersion.id ? secondSysVersion.id : null
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.sysImageType = ItemValue
        e.sysImageVersion = secondSysVersion
      })
      this.$emit('handleSysImageType', ItemValue)
      this.$emit('handleSysImageVersion', secondSysVersion)
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 操作系统框架的select二级联动的选项-子选项
    handleSysVersionChange(value) {
      const ItemValue = this.sysVersions.find(item => {
        return item.id === value
      })
      this.secondSysVersion = ItemValue
      this.secondSysVersionValue = ItemValue && ItemValue.id ? ItemValue.id : null
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.sysImageVersion = ItemValue
      })
      this.$emit('handleSysImageVersion', ItemValue)
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 存储类型-------这里类型是不可变的，因为站点-规格 确定唯一的资源池，资源池的存储类型唯一，这个方法不会触发的
    handleStorageChange(value, option) {
      // 需修改
      console.log(option)
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.storageType = value
      })
      this.$emit('handleStorageType', value)
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 存储大小
    handleStorageSize(value) {
      this.storageSize = value
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.storageSize = value
      })
      this.$emit('handleStorageSize', value)
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 是否勾选弹性公网IP
    onIpChange(e) {
      this.ipDisplay = e.target.checked
      const tempBusinessData = this.businessData
      if (e.target.checked) {
        this.$emit('handleFlexibleIpSize', this.ipSize)
      } else {
        this.countErrIP = false
        this.$emit('handleFlexibleIpSize', null)
      }
      tempBusinessData.forEach(i => {
        i.isAllocatedIP = e.target.checked
        i.networkBandwidth = 1
        i.networkNumber = i.serverNum
      })
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 弹性ip
    handleNetworkValue(value, status) {
      console.log(status)
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        if (e.stationId == value.stationId) {
          e.networkBandwidth = value.bandSize
          e.networkNumber = value.ipSize
          e.isAllocatedIP = status
        }
      })

      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 弹性IP大小
    handleIpSize(value) {
      this.ipSize = value
      this.$emit('handleFlexibleIpSize', value)
    },

    // 是否勾选弹性公网IP
    onCeniChange(s) {
      this.isDisplayCeni = s.target.checked
      if (s.target.checked) {
        this.$emit('handleCeniNetSize', this.ceniSize)
      } else {
        this.countErrIP = false
        this.$emit('handleCeniNetSize', null)
      }

      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.ceniNetwork = s.target.checked
        e.ceniNetworkBandwidth = this.ceniSize
      })
      this.$emit('handleBusinessData', tempBusinessData)
    },
    // 弹性IP大小
    handleCeniSize(value) {
      this.ceniSize = value
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.ceniNetworkBandwidth = this.ceniSize
      })
      this.$emit('handleBusinessData', tempBusinessData)
      // this.$emit('handleFlexibleIpSize', value)
    },
    // 输入校验
    handleServerNameChange(e) {
      const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
      if (e.target.value === undefined || e.target.value === null || e.target.value.length === 0) {
        this.dispalyWarnServerName = false
      } else if (!regex.test(e.target.value)) {
        this.dispalyWarnServerName = true
      } else {
        this.dispalyWarnServerName = false
      }
    },
    // 服务器名称
    handleServerName(s) {
      const value = s.target.value
      const tempBusinessData = this.businessData
      tempBusinessData.forEach(e => {
        e.serverName = s.target.value
      })
      this.$emit('handleBusinessData', tempBusinessData)
      this.$emit('handleServerName', value)
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
  /deep/.ant-card-body {
    padding: 20px 0 20px 30px;
    margin-bottom: 8px;
  }
  .optional_title {
    height: 14px;
    width: 120px;
    margin-right: 40px;
    font-size: 16px;
    line-height: 16px;
    color: #333333;
  }
  .explain {
    margin: 12px 0 0 160px;
    height: 12px;
    font-size: 14px;
    line-height: 14px;
    color: #5c5c5c;
  }
  .optional_main {
    display: flex;
    align-items: center;
    .optional_tab {
      width: 200px;
      height: 56px;
      margin-right: 10px;
      border-radius: 2px;
      border: solid 1px #e1e5ee;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .optional_tab_h3 {
        height: 14px;
        width: 100%;
        text-align: center;
        line-height: 14px;
        color: #333333;
        margin-bottom: 6px;
      }
      .optional_tab_explain {
        width: 100%;
        text-align: center;
        height: 12px;
        font-size: 14px;
        line-height: 14px;
        color: #5c5c5c;
      }
    }
    .optional_tab:hover {
      cursor: pointer;
    }
  }
  .station_main {
    display: flex;
    align-items: center;
    .optional_tab_index {
      width: 72px;
      height: 14px;
      font-size: 16px;
      line-height: 16px;
      color: #333333;
      margin-right: 8px;
    }
    .optional_tab_station {
      height: 30px;
      padding: 9px 14px;
      margin-right: 8px;
      border-radius: 2px;
      border: solid 1px #e1e5ee;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #333333;
    }
    .optional_tab_station:hover {
      cursor: pointer;
    }
  }
  .gpu {
    .gpu_main {
      height: 30px;
      display: flex;
      align-items: center;
      .optional_tab_gpu {
        height: 30px;
        padding: 9px 27px;
        margin-right: 8px;
        border-radius: 2px;
        border: solid 1px #e1e5ee;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
      .optional_tab_gpu:hover {
        cursor: pointer;
      }
    }
    .gpu_search {
      margin: 12px 0 0 160px;
      display: flex;
      align-items: center;
      .gpu_search_index {
        width: 80px;
        height: 14px;
        font-size: 16px;
        line-height: 16px;
        color: #333333;
      }
      .gpu_search_button {
        .gpu_search_button_out {
          /deep/.ant-input {
            width: 256px;
            height: 30px;
            border-radius: 2px;
            border: solid 1px #e1e5ee;
            padding: 5px 5px;
          }
          /deep/.ant-input-suffix {
            width: 48px;
            height: 30px;
            right: 0;
          }
          /deep/.ant-input-suffix:hover {
            cursor: pointer;
          }
        }
      }
    }
    .gpu_table {
      height: 245px;
      color: #333333;
      margin: 12px 0 0 160px;
      /deep/.ant-table-row {
        height: 50px;
        font-size: 14px;
      }
      /deep/.ant-table-body {
        //overflow: scroll;
        max-height: 200px;
        overflow-x: hidden;
      }
      /deep/.ant-table-thead > tr > th {
        padding: 12px 16px 11px 16px;
        font-size: 16px;
        overflow-wrap: break-word;
      }
      /deep/.ant-table-tbody > tr > td {
        padding: 14px 16px;
        font-size: 14px;
        overflow-wrap: break-word;
      }
      /deep/ .ant-table-row-cell-break-word:last-child {
        width: 100px;
      }
      .gpu_table_choice {
        width: 18px;
        height: 18px;
      }
      .gpu_table_choice:hover {
        cursor: pointer;
      }
    }
    .gpu_detial {
      margin: 12px 0 0 160px;
      display: flex;
      align-items: center;
      padding-left: 24px;
      width: 850px;
      height: 48px;
      line-height: 40px;
      background-color: #f6f8fd;
      border-radius: 2px;
      font-size: 16px;
      border-left: 4px solid #33b0ed;
    }
  }
  .docker {
    .system_tab_index {
      width: 97px;
    }
    .system_main {
      display: flex;
      align-items: center;
      .optional_tab_gpu {
        height: 30px;
        padding: 9px 27px;
        margin-right: 8px;
        border-radius: 2px;
        border: solid 1px #e1e5ee;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
    }
    .system_sys {
      display: flex;
      align-items: center;
      margin: 12px 0 0 96px;
    }
  }
  .system {
    .system_tab_index {
      width: 97px;
    }
    .system_main {
      display: flex;
      align-items: center;
      .optional_tab_gpu {
        height: 30px;
        padding: 9px 27px;
        margin-right: 8px;
        border-radius: 2px;
        border: solid 1px #e1e5ee;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
    }
    .system_sys {
      display: flex;
      align-items: center;
      margin: 12px 0 0 96px;
    }
  }
  .storage {
    .storage_main {
      display: flex;
      align-items: center;
      .optional_tab_gpu {
        height: 30px;
        padding: 9px 27px;
        margin-right: 8px;
        border-radius: 2px;
        border: solid 1px #e1e5ee;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .ip {
    .ip_main {
      display: flex;
      align-items: center;
      /deep/.ant-checkbox-wrapper {
        display: flex;
        align-items: center;
      }
    }
    .ip_input_index {
      width: 70px;
      margin-right: 11px;
    }
    .ip_input {
      display: flex;
      flex-wrap: wrap;
      font-size: 16px;
      //align-items: center;
      margin: 0 0 0 160px;
    }
  }
  .ceni {
    .ceni_main {
      display: flex;
      align-items: center;
      /deep/.ant-checkbox-wrapper {
        display: flex;
        align-items: center;
      }
    }
    .ceni_input_index {
      width: 90px;
      margin-right: 11px;
    }
    .ceni_input {
      display: flex;
      align-items: center;
      margin: 0 0 0 80px;
    }
  }
  .name {
    .name_main {
      display: flex;
      align-items: center;
    }
    .name_main_title {
      height: 14px;
      width: 140px;
      margin-right: 14px;
      font-size: 16px;
      line-height: 16px;
      color: #333333;
    }
    .name_main_input {
      /deep/.ant-input {
        width: 400px;
        border: none;
        padding: 8px 0;
        border-bottom: 1px solid #c4c8d3;
      }
      /deep/.ant-input:focus {
        border: none;
        border-bottom: 1px solid #c4c8d3;
        box-shadow: none;
      }
    }
    .name_main_logo {
      margin-left: 10px;
      width: 20px;
      height: 20px;
    }
    .name_explain {
      margin: 12px 0 0 154px;
      height: 12px;
      font-size: 14px;
      line-height: 14px;
      color: #5c5c5c;
    }
  }
}
</style>
