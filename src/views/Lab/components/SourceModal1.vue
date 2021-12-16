<template>
  <a-modal v-model="sourceModal" title="请选择要添加的资源" on-ok="handleOkSource" cancel="handleCancel" width="80%">
    <template slot="footer">
      <a-button key="submit" type="primary" :loading="loading" @click="handleOkSource"> 确定添加 </a-button>
    </template>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="资源列表">
        <a-table
          bordered
          :pagination="{
            onChange: (current) => this.changePage(current),
            total: total,
            pageSize: 10, //每页中显示10条数据
            current: currentPage,
          }"
          :columns="columns"
          :data-source="data"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
            getCheckboxProps: (record) => ({
              props: {
                defaultChecked: selectedRowKeys.includes(record.id),
              },
            }),
          }"
          rowKey="id"
        >
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="实验床列表">
        <div class="bed-list">
          <div v-for="item in bedList" :key="item.id" class="bed-item">
            <div class="bed-check flex-align mb10">
              <a-checkbox :checked="Boolean(selecteds.find(el => el.id === item.id))" @change="handleSelect(item)">
                实验床名称：{{ item.name }}
              </a-checkbox>
            </div>
            <a-row class="p10 mb10">
              <a-col class="label-col" :span="1">站点：</a-col>
              <a-col :span="3">
                <div class="mb10">北京</div>
                <div>数量：{{ item.productNumber }}</div>
              </a-col>
            </a-row>
            <a-row class="p10">
              <a-col class="label-col" :span="1">配置：</a-col>
              <a-col :span="23">
                <a-row>
                  <a-col class="mb10" :span="8">
                    {{ item.cpuNum }}CPU，{{ item.memoryNum }}GB 内存，1*NVIDA T4（ocs.T4.c8m32）
                  </a-col>
                  <a-col class="mb10" :span="8">存储：高速硬盘 容量{{ item.storageNum }}G</a-col>
                  <a-col class="mb10" :span="8">容器：{{ item.container }}</a-col>
                  <a-col class="mb10" :span="8">操作系统：{{ item.osName }} {{ item.osVersion }}版本</a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
/* eslint-disable */
import { listLaboratory,getTestBedList } from '@/api/Lab/labserver'
export default {
  props: {
    selectedRowKeys: {
      type: Array,
      default: () => [],
    },
    selectedRowBedKeys:{
      type:Array,
      default:() => []
    }
  },
  data() {
    return {
      sourceModal: false,
      loading: false,
      columns: [
        {
          title: '资源类型：云服务器',
          dataIndex: 'id',
          key: 'id',
          // text, row, index
          customRender: (text, row) => {
            return (
              <div class="service-detail">
                <p>设备：{row.serverName}</p>
                <p>
                  <span>云服务器ID：{row.serverUuid}</span>
                  <span style="width:70%">
                    配置：{row.cpuNum}CPU，{row.memoryNum}内存
                  </span>
                  <span>站点：{row.stationName}</span>
                  <span>网络：{row.privateIp}</span>
                </p>
              </div>
            )
          },
        },
      ],
      data: [],
      selectedRows: [],
      currentPage: 1,
      total: 0,
      bedList:[],
      selecteds:[]
    }
  },
  methods: {
    changePage(current) {
      this.currentPage = current
      this.getList()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      // this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.$emit('updateSource', {
        selectedRowKeys: selectedRowKeys,
      })
    },
    getList() {
      listLaboratory({ currentPage: this.currentPage, pageSize: 10 }).then((res) => {
        this.data = res.data.rows || []
        this.total = Number(res.data.total)
      });
      getTestBedList({currentPage:1,pageSize:100}).then((res) => {
        this.bedList = res.data.rows
        this.selecteds = this.bedList.filter(el=>{
          return Boolean(this.selectedRowBedKeys.find(ev=>el.id == ev))
        })
      })
    },
    show() {
      this.sourceModal = true
      this.getList()
    },
    handleCancel() {
      this.sourceModal = false
    },
    handleOkSource() {
      this.$emit('handleOk', {
        selectedRowKeys: [...this.selectedRowKeys],
        selectedRows: [...this.selectedRows],
        selectedRowBedKeys:[...this.selectedRowBedKeys],
        selectedBeds:[...this.selecteds]
      })
      this.handleCancel()
    },
    handleSelect(item) {
      let index = this.selecteds.findIndex((el) => el.id === item.id)
      if (index > -1) {
        this.selecteds.splice(index, 1)
      } else {
        this.selecteds.push(item)
      }
      console.log(this.selecteds)
      this.$emit('updateSource', {
        selectedRowBedKeys: this.selecteds.map(el=>el.id),
      })

    },
  },
}
</script>
<style lang="less" scoped>
.service-detail {
  padding: 0px 20px 0px;
  p {
    margin-bottom: 0;
    line-height: 24px;
    &:last-child {
      display: flex;
      flex-wrap: wrap;
      span {
        width: 30%;
      }
    }
  }
}
/deep/ .ant-modal-footer {
  padding-left: 25px;
}
/deep/ .ant-modal-title {
  line-height: 15px;
}
/deep/ .ant-modal-body {
  padding: 20px;
}

.bed-check {
  height: 40px;
  background: #f8f9fa;
  padding-left: 10px;
}
.label-col {
  text-align: right;
}
</style>
