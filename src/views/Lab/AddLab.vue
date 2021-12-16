<template>
  <div class="add-source">
    <div class="source-title">{{ title }}</div>
    <div class="source-info">
      <h4 class="info-title"><span></span>基础信息</h4>
      <a-form-model
        ref="addform"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 12 }"
        class="info-form"
      >
        <a-row>
          <a-col :span="16">
            <a-form-model-item label="实验名称：" prop="name">
              <a-input v-model="form.name" autoComplete="off" placeholder="请输入实验名称" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-model-item label="描述：" prop="remark">
              <a-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-model-item label="上传图片：" style="margin-bottom: 0" prop="bannerInfo">
              <a-upload
                :headers="headers"
                name="files"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="action"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="form.bannerUrl" class="img" :src="form.bannerUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <template v-if="!labid">
      <div class="source-info">
        <h4 class="info-title"><span></span>项目资源</h4>
        <div v-for="(item, index) in sourceList" :key="index" class="source-service">
          <p class="asset-type">
            <span>资源类型：{{ item.serverName }}</span>
            <span class="iconfont icon-shanchu" @click="deleteSource(item.id, index)"></span>
          </p>
          <div class="service-detail">
            <p>资源名称：{{ item.serverUuid }}</p>
            <p>
              <span>云服务器ID：vm2021032100001</span>
              <span style="width: 70%">
                配置：{{ item.cpuNum }}CPU，{{ item.memoryNum }}内存，1*yuddededede（dwdew432fdsfefew）
              </span>
              <span>站点：{{ item.stationName }}</span>
              <span>网络：{{ item.privateIp }}</span>
            </p>
          </div>
        </div>
        <div v-for="(item, index) in bedList" :key="index" class="source-service">
          <p class="asset-type">
            <span>资源类型：实验床</span>
            <span class="iconfont icon-shanchu" @click="deleteSource(item.id, index, 'bed')"></span>
          </p>
          <div class="service-detail">
            <p>站点：{{ item.stationList[0].stationName }}</p>
            <p>
              <span>容器：{{ item.container }}</span>
              <span style="width: 70%">
                {{ item.cpuNum }}CPU，{{ item.memoryNum }}GB 内存，1*NVIDA T4（ocs.T4.c8m32）
              </span>
              <span>系统：{{ item.osName + ' ' + item.osVersion }}</span>
              <span>容器：{{ item.container }}</span>
            </p>
          </div>
        </div>
        <a-button type="primary" @click="showModal('sourceModal')">添 加</a-button>
      </div>
      <div class="source-info">
        <h4 class="info-title"><span></span>添加人员</h4>
        <a-table
          :columns="columnsUser"
          rowKey="id"
          :data-source="userData"
          bordered
          :pagination="false"
          style="margin-bottom: 10px"
        >
          <template slot="operation" slot-scope="text, record, index">
            <span>
              <a class="iconfont icon-shanchu" @click="deleteUser(index, record.id)"></a>
            </span>
          </template>
        </a-table>
        <a-button type="primary" @click="showModal('personModal')">添 加</a-button>
      </div>
      <div class="btn">
        <a-button :disabled="disabled" type="primary" @click="submit">确认创建</a-button>
      </div>
    </template>
    <div v-else class="submit-group">
      <a-space>
        <a-button type="primary" @click="updateBase">确认</a-button>
        <a-button @click="cancel">取消</a-button>
      </a-space>
    </div>
    <SourceModal
      ref="sourceModal"
      :selectedRowKeys="selectedRowKeysSource"
      :selectedRowBedKeys="selectedRowBedKeys"
      @updateSource="updateSource"
      @handleOk="handleOkSource"
    ></SourceModal>
    <PersonModal
      ref="PersonModal"
      :selectedRowKeys="selectedRowKeysUser"
      @updateUser="updateUser"
      @handleOk="handleOkUser"
    ></PersonModal>
  </div>
</template>
<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import SourceModal from '@/views/Lab/components/SourceModal1'
import PersonModal from '@/views/Lab/components/PersonModal'
import { addLab, uploadImageUrl, labDetail } from '@/api/Lab/labserver'
import { FormModel, Space } from 'ant-design-vue'
export default {
  components: {
    SourceModal,
    PersonModal,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    ASpace: Space
  },
  data() {
    return {
      headers: {
        Authorization: storage.get(ACCESS_TOKEN) || ''
      },
      action: uploadImageUrl(),
      form: {
        name: '',
        remark: '',
        bannerUrl: ''
      },
      loading: false,
      columnsUser: [
        {
          title: '用户账号',
          dataIndex: 'username',
          width: '25%',
          scopedSlots: { customRender: 'username' },
          align: 'center'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: '15%',
          scopedSlots: { customRender: 'name' },
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          align: 'center'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入实验名称' },
          { min: 2, message: '请输入2-12个字符' },
          { max: 12, message: '请输入2-12个字符' }
        ],
        remark: [
          { required: true, message: '请输入实验备注' },
          { max: 20, message: '请输入0-20个字符' }
        ]
      },
      userData: [],
      sourcesIds: [],
      selectedRowKeysSource: [],
      selectedRowBedKeys: [],
      selectedRowKeysUser: [],
      usersIds: [],
      sourceList: [],
      bedList: [],
      labid: null
    }
  },
  computed: {
    title() {
      return !this.labid ? '新建项目' : '编辑项目'
    },
    disabled() {
      if (!this.usersIds.length) return true
      if (this.sourcesIds.length + this.selectedRowBedKeys.length === 0) return true
      return false
    }
  },
  mounted() {
    const query = this.$route.query
    if (query.labid) {
      this.labid = query.labid
      this.getLabDetail()
    }
  },
  methods: {
    getLabDetail() {
      labDetail(this.labid).then(res => {
        this.form.name = res.data.name
        this.form.bannerUrl = res.data.bannerUrl
        this.form.remark = res.data.remark
      })
    },
    handleOkUser(obj) {
      this.usersIds = obj.selectedRowKeys
      this.userData = obj.selectedRows
    },
    handleOkSource(obj) {
      this.sourcesIds = obj.selectedRowKeys
      this.sourceList = obj.selectedRows
      this.bedList = obj.selectedBeds
      this.selectedRowBedKeys = obj.selectedRowBedKeys
    },
    deleteSource(id, index, type) {
      if (!type) {
        this.sourceList.splice(index, 1)
        const arr = this.sourcesIds.filter(function(item) {
          return item !== id
        })
        this.sourcesIds = arr
        this.selectedRowKeysSource = this.sourcesIds
        this.$refs.sourceModal.selectedRows = this.sourceList
      } else {
        this.bedList.splice(index, 1)
        this.selectedRowBedKeys = this.selectedRowBedKeys.filter(item => item != id)
        // this.$refs.sourceModal.selectedRowBedKeys =
      }
    },
    updateSource(obj) {
      if (obj.selectedRowKeys) {
        this.selectedRowKeysSource = obj.selectedRowKeys
      } else if (obj.selectedRowBedKeys) {
        this.selectedRowBedKeys = obj.selectedRowBedKeys
      }
    },
    updateUser(obj) {
      this.selectedRowKeysUser = obj.selectedRowKeys
    },
    deleteUser(index, id) {
      this.userData.splice(index, 1)
      const arr = this.usersIds.filter(function(item) {
        return item !== id
      })
      this.usersIds = arr
      this.selectedRowKeysUser = this.usersIds
      this.$refs.PersonModal.selectedRows = this.userData
    },
    showModal(type) {
      type === 'sourceModal' ? this.$refs.sourceModal.show() : this.$refs.PersonModal.show()
    },
    delete() {},
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        if (info.file.response && info.file.response.statusCode === 200) {
          this.form.bannerUrl = info.file.response.data
          this.loading = false
        }
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJpgOrPng) {
        this.$message.error('请选择正确的图片格式')
      }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('Image must smaller than 2MB!')
      // }
      return isJpgOrPng
    },
    updateBase() {
      this.$refs.addform.validate(bool => {
        console.log(bool, this.form)
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    submit() {
      // console.log(this.selectedRowBedKeys)
      // return
      this.$refs.addform.validate(bool => {
        if (bool) {
          addLab({
            ...this.form,
            sourcesIds: this.sourcesIds,
            usersIds: this.usersIds,
            distributedLabBedIds: this.selectedRowBedKeys
          }).then(res => {
            if (res.statusCode === 200) {
              this.$router.push(`/lab/list`)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.add-source {
  color: #333;
  background: #fff;
}
.source-title {
  padding: 10px;
  font-size: 26px;
}
.source-info {
  padding: 0 15px 15px;
  background: #fff;
  margin-right: 30px;
  margin-bottom: 0px;
}
.info-title {
  font-size: 22px;
  line-height: 44px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    width: 9px;
    height: 9px;
    background: #33b0ed;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.info-form {
  border: 1px solid #e1e5ee;
  padding-top: 10px;
}
.source-service {
  border: 1px solid #e1e5ee;
  width: 85%;
  margin-bottom: 10px;
  & > p {
    background-color: #f6f8fd;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 18px;
    span:first-child {
      flex: 1;
    }
    span:last-child {
      width: 20px;
      color: #33b0ed;
      cursor: pointer;
    }
  }
}
.service-detail {
  padding: 0px 20px 20px;
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
.btn {
  padding: 15px;
  text-align: center;
  // background: #fff;
  margin-right: 30px;
}
/deep/.ant-modal-footer {
  text-align: left;
  border: 0;
}
/deep/.ant-modal-body {
  padding: 10px 24px;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}
.img {
  width: 104px;
  height: 104px;
}
.submit-group {
  display: flex;
  justify-content: flex-end;
}
</style>
