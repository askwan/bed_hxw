<template>
  <div class="my-source">
    <a-tabs :activeKey="current" @change="handleChangeTab">
      <a-tab-pane :key="0" tab="进行中">
        <a-spin :spinning="loading">
          <source-card v-for="(item, index) in list" :key="index" :detail="item" />
        </a-spin>
      </a-tab-pane>
      <a-tab-pane :key="1" tab="已归文件">
        <a-spin :spinning="loading">
          <source-card v-for="(item, index) in list" :key="index" :detail="item" />
        </a-spin>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" class="btn" @click="pathTo('/lab/add')">新建项目</a-button>
    </a-tabs>
    <!-- <a-menu v-model="current" mode="horizontal" @click="handleChangeType">
      <a-menu-item :key="0">进行中</a-menu-item>
      <a-menu-item :key="1">已归档</a-menu-item>
    </a-menu> -->
    <div class="pagintion">
      <a-pagination
        v-if="queryParams.total > 0"
        :current="queryParams.currentPage"
        :total="queryParams.total"
        show-less-items
        show-size-changer
        :pageSize="queryParams.pageSize"
        @showSizeChange="onShowSizeChange"
        @change="changePage"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getLabList, getArchiveList } from '@/api/Lab/labserver'
import { Pagination } from 'ant-design-vue'
import { mapGetters, mapState } from 'vuex'
import { Space } from 'ant-design-vue'
export default {
  components: {
    SourceCard: () => import('./components/LabCard'),
    ArchiveCard: () => import('./components/ArchiveCard'),
    APagination: Pagination,
    ASpace: Space
  },
  data() {
    return {
      current: 0,
      loading: false,
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        name: ''
      },
      list: [],
      pageUserId: null
    }
  },
  computed: {
    id() {
      return this.current === 0 ? 'laboratoryId' : 'id'
    },
    ...mapGetters(['userInfo']),
    ...mapState('lab', ['labUserList']),
    hiddenAdd() {
      if (!this.pageUserId) return false
      return !(this.pageUserId === this.userInfo.userId)
    }
  },
  mounted() {
    const query = this.$route.query
    if (query.type) {
      this.current = Number(query.type)
    }

    // const userid = window.sessionStorage.getItem('userid')
    // if (userid == 2) {
    //   this.hiddenAdd = true
    // }
    if (query.userid) {
      this.pageUserId = Number(query.userid)
    }
    this.getList()
  },
  methods: {
    startSearch() {
      this.queryParams.currentPage = 1
      this.getList()
    },
    clearSearch() {
      this.queryParams.name = null
      this.queryParams.currentPage = 1
      this.getList()
    },
    getList() {
      const fn = this.current === 0 ? getLabList : getArchiveList
      const params = { ...this.queryParams, status: this.current }
      if (this.hiddenAdd) {
        params.otherUserId = this.pageUserId
      }
      delete params.total
      this.list = []
      this.queryParams.total = 0
      fn(params).then(res => {
        this.list = res.data.rows
        this.queryParams.total = Number(res.data.total)
      })
    },
    pathTo(url) {
      this.$router.push(url)
    },
    handleChangeTab(key) {
      this.current = key
      this.getList()
      const query = this.$route.query
      this.$router.replace({
        path: '/lab/list',
        query: {
          ...query,
          type: key
        }
      })
    },
    onShowSizeChange(i, pageSize) {
      this.queryParams.currentPage = 1
      this.queryParams.pageSize = pageSize
      this.getList()
    },
    changePage(i) {
      this.queryParams.currentPage = i
      this.getList()
    }
  }
}
</script>
<style scoped lang="less">
.my-source {
  padding: 20px 50px 20px 50px;
  background: #fff;
}
.source-content {
  padding-top: 20px;
  overflow-y: auto;
  background: #fff;
}
/deep/.ant-menu-horizontal > .ant-menu-item-selected {
  @color: #0a2845;
  border-bottom: ~'2px solid @{color}';
  color: @color;
}
.add-card {
  height: 343px;
  width: 336px;
  display: inline-block;
  overflow: hidden;
  margin-left: 30px;
  margin-bottom: 30px;
  // display: inline-block;
  // overflow: hidden;
  // margin-left: 30px;
  // margin-bottom: 30px;
  // background: #fff;
  border: 1px solid #e8e8e8;
  background: #f5f6fd;
  .add-icon {
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      cursor: pointer;
    }
    em {
      font-size: 50px;
      cursor: pointer;
    }
    span {
      margin-top: 15px;
      font-size: 20px;
      color: #999;
      cursor: pointer;
    }
  }
}
.pagintion {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.btn {
  width: 84px;
  height: 36px;
  background-color: #33b0ed;
  color: #ffff;
  font-size: 14px;
  line-height: 14px;
}
</style>
