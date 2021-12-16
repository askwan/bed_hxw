<template>
  <a-modal v-model="personModal" title="请选择要添加的人员" on-ok="handleOkPerson" cancel="handleCancel" width="70%">
    <template slot="footer">
      <a-button key="submit" type="primary" :loading="loading" @click="handleOkPerson"> 确定添加 </a-button>
    </template>
    <a-table
      :pagination="{
        onChange: current => this.changePage(current),
        total: total,
        pageSize: 10, //每页中显示10条数据
        current: currentPage
      }"
      bordered
      :columns="columnsUserSelect"
      :data-source="data"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: record => ({
          props: {
            defaultChecked: selectedRowKeys.includes(record.id)
          }
        })
      }"
      rowKey="id"
    >
    </a-table>
  </a-modal>
</template>
<script>
/* eslint-disable */
import { labUsers } from '@/api/Lab/labserver'
export default {
  props: {
    selectedRowKeys: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columnsUserSelect: [
        {
          key: 'username',
          title: '用户账号',
          dataIndex: 'username',
          width: '25%',
          scopedSlots: { customRender: 'username' },
          align: 'center',
        },
        {
          key: 'name',
          title: '姓名',
          dataIndex: 'name',
          width: '15%',
          scopedSlots: { customRender: 'name' },
          align: 'center',
        },
        {
          key: 'description',
          title: '备注',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
          align: 'center',
        },
      ],
      data: [],
      personModal: false,
      loading: false,
      selectedRows: [],
      currentPage: 1,
      total: 0,
    }
  },
  methods: {
    getList() {
      labUsers({ currentPage: this.currentPage, pageSize: 10 }).then(res => {
        this.data = res.data.rows || []
        this.total = Number(res.data.total)
      })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRows = selectedRows
      this.$emit('updateUser', {
        selectedRowKeys: selectedRowKeys,
      })
    },
    changePage(current) {
      this.currentPage = current
      this.getList()
    },
    show() {
      this.personModal = true
      this.getList()
    },
    handleCancel() {
      this.personModal = false
    },
    handleOkPerson() {
      this.$emit('handleOk', {
        selectedRowKeys: this.selectedRowKeys,
        selectedRows: this.selectedRows,
      })
      this.handleCancel()
    },
  },
}
</script>
