<template>
  <a-table :columns="columns" :data-source="list" :pagination="false" rowKey="id">
    <div slot="name" slot-scope="text, item">
      <a-button type="link" @click="toDetail(item)">{{ text }}</a-button>
    </div>
    <div slot="config" slot-scope="text, item">
      <span>{{ item.cpuNum }}CPU，{{ item.memoryNum }}GB内存</span>
    </div>
    <div slot="holdOnNum" slot-scope="text, item">
      <span>{{ item.holdOnNum }}/{{ item.productNumber }}</span>
    </div>
    <div slot="stroage" slot-scope="text, item">高速，{{ item.storageTypeName }}，{{ item.storageNum }}GB</div>
    <div slot="chartype" slot-scope="text, item">
      {{ getChartypeName(item) }}
    </div>
    <div slot="imageName" slot-scope="text, item">{{ item.osName }} {{ item.osVersion }}</div>
    <div slot="action" slot-scope="text, item">
      <!-- <a-button type="link" @click="handleOperate(1, item)">续费</a-button> -->
      <a-button type="link" @click="handleOperate(2, item)">释放资源</a-button>
    </div>
  </a-table>
</template>
<script>
/* eslint-disable */
import {releaseBed} from '@/api/Lab/labserver'
const columns = [
  {
    title: '套餐名称',
    dataIndex: 'name',
    align: 'center',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '类型',
    dataIndex: 'cpuFeature',
    align: 'center',
  },
  {
    title: '配置',
    scopedSlots: { customRender: 'config' },
    align: 'center',
  },
  {
    title: '容器',
    dataIndex: 'container',
    align: 'center',
  },
  {
    title: '镜像',
    dataIndex: 'imageName',
    align: 'center',
    scopedSlots: { customRender: 'imageName' },
  },
  {
    title: '存储',
    dataIndex: 'stroage',
    scopedSlots: { customRender: 'stroage' },
    align: 'center',
  },
  {
    title: '留存数量',
    dataIndex: 'holdOnNum',
    align: 'center',
    scopedSlots: { customRender: 'holdOnNum' },
  },
  {
    title: '付费类型',
    dataIndex: 'chartype',
    scopedSlots: { customRender: 'chartype' },
    align: 'center',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
]
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns,
    }
  },
  methods: {
    handleOperate(type, item) {
      console.log(type, item)
      if (type === 2) {
        this.release(item)
      }
    },
    release(item) {
      this.$confirm({
        type: 'info',
        title: '释放实验床',
        content: '释放实验床将会释放该实验床包含的所有资源，您确定要执行该操作吗？',
        onOk:()=>{
          releaseBed(item.id).then(res=>{
            console.log(res,'res')
            if(res.statusCode === 200 ){
              this.$message.success(res.message)
              this.$emit('update')
            }else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    getChartypeName(item) {
      return item.chargeType == 0 ? '包年包月' : '按小时计费'
    },
    toDetail(item) {
      console.log(item)
      this.$router.push({
        path: '/lab/bed_detail',
        query: {
          bedid: item.id,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
</style>
