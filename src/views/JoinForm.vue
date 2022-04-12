<template>
  <div class="join-form">
    <div class="bed-bread mb bg-white">
      <div class="left">
        <span class="pointer" @click="back">&lt;返回</span>
        <span class="bread-title">加入我们</span>
      </div>
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
    <div class="bed-content">
      <div class="tips pip-mb">请填写如下信息，以便我们与您联系。</div>
      <a-form-model
        ref="form"
        class="form"
        :model="form"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-item label="所在地区" prop="area" required>
          <!-- <a-select v-model="form.area" class="width-100" placeholder="请输入"></a-select> -->
          <a-cascader
            v-model="form.area"
            placeholder="请选择"
            :options="citys"
            :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
            @change="handleCityChange"
          />
        </a-form-item>
        <a-form-item label="详细地址" prop="realAddress">
          <div class="textarea">
            <a-textarea
              v-model="form.realAddress"
              class="width-100"
              :autoSize="{ minRows: 3 }"
              placeholder="请输入详细地址"
            >
            </a-textarea>
            <div class="text">{{ form.realAddress.length }} / 100</div>
          </div>
        </a-form-item>
        <a-form-item label="邮编" prop="postalCode">
          <a-input v-model="form.postalCode" class="width-100" placeholder="请输入邮编" @input="rulesNumber"></a-input>
        </a-form-item>
        <a-form-item label="联系人" prop="contactPerson">
          <a-input v-model="form.contactPerson" placeholder="请输入联系人" class="width-100"></a-input>
        </a-form-item>
        <a-form-item label="联系电话" prop="contactTelphone">
          <a-input v-model="form.contactTelphone" placeholder="请输入联系电话" class="width-100"></a-input>
        </a-form-item>
        <a-form-item label="电子邮箱" prop="contactEmail">
          <a-input v-model="form.contactEmail" placeholder="请输入电子邮箱" class="width-100"></a-input>
        </a-form-item>
        <a-form-item label="设备类型" prop="deviceTypeList">
          <a-select
            v-model="form.deviceTypeList"
            mode="multiple"
            placeholder="请选择设备类型（支持多选）"
            :showArrow="false"
          >
            <a-icon slot="suffixIcon" type="down" />
            <a-select-option v-for="item in deviceTypeList" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="设备总数" prop="deviceCount">
          <a-select v-model="form.deviceCount" placeholder="请输入设备总数">
            <a-select-option v-for="item in deviceNumsList" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" prop="remark">
          <div class="textarea">
            <a-textarea
              v-model="form.remark"
              class="width-100"
              :autoSize="{ minRows: 3 }"
              placeholder="请输入备注"
              :max="100"
            ></a-textarea>
            <div class="text">{{ form.remark.length }} / 100</div>
          </div>
        </a-form-item>
      </a-form-model>
      <div class="tips pip-mb">若有疑问，欢迎向实验床联系人咨询：</div>
      <div class="form bg-color">
        实验床联系人：苏老师 邮箱：service@ictnj.ac.cn
      </div>
    </div>
  </div>
</template>
<script>
import { FormModel, Cascader } from 'ant-design-vue'
export default {
  components: {
    AFormModel: FormModel,
    AFormItem: FormModel.Item,
    ACascader: Cascader
  },
  data() {
    return {
      deviceTypeList: ['CPU', 'GPU', 'DPU', 'NPU'],
      deviceNumsList: ['1到9台', '10到99台', '100到999台', '1000台以上'],
      form: {
        city: 0,
        cityName: '',
        province: 0,
        provinceName: '',
        district: 0,
        districtName: '',
        area: [],
        contactEmail: undefined,
        contactPerson: undefined,
        contactTelphone: undefined,
        deviceTypeList: [],
        realAddress: '',
        remark: '',
        postalCode: '',
        deviceCount: undefined
      },
      rules: {
        area: [{ required: true, message: '请选择所在地区' }],
        realAddress: [
          { required: true, message: '请输入详细地址' },
          { max: 100, message: '最多100个字符' }
        ],
        postalCode: [{ max: 6, message: '超出字符限制' }],
        contactPerson: [
          { required: true, message: '请输入联系人' },
          { max: 20, message: '最多20个字符' }
        ],
        contactTelphone: [
          { required: true, message: '请输入联系电话' },
          { max: 20, message: '最多20个字符' }
        ],
        contactEmail: [{ max: 50, message: '最多50个字符' }],
        deviceTypeList: [{ required: true, message: '请选择设备类型' }],
        deviceCount: [{ required: true, message: '请选择设备总数' }],
        remark: [{ max: 100, message: '最多100个字符' }]
      },
      citys: []
    }
  },
  mounted() {
   
  },
  methods: {
    back() {
      this.$router.push({ name: 'bed_join_us' })
    },
    rulesNumber(event) {
      if (isNaN(event.data)) {
        this.form.postalCode = event.target.value.replace(/[^\d]/g, '')
      }
    },
    handleCityChange(value, options) {
      if (options instanceof Array) {
        this.form.province = options[0].id
        this.form.provinceName = options[0].name
        this.form.city = options[1].id
        this.form.cityName = options[1].name
        this.form.district = options[2].id
        this.form.districtName = options[2].name
      } else {
        this.form.province = 0
        this.form.provinceName = ''
        this.form.city = 0
        this.form.cityName = ''
        this.form.district = 0
        this.form.districtName = ''
      }
    },
    submit() {
      this.$refs.form.validate(bool => {
        console.log(bool)
        console.log(this.form)
        // if (bool) {
        //   const data = Object.assign({}, this.form)
        //   data.laboratoryBedId = 17
        //   delete data.area
        //   addRemark(data)
        //     .then(res => {
        //       console.log(res)
        //       if (res.statusCode === 200) {
        //         this.$router.push({ name: 'bed_sub_success' })
        //       } else {
        //         this.$message.error(res.message)
        //       }
        //     })
        //     .catch(err => {
        //       this.$message.error(err.message)
        //     })
        // }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.join-form {
  height: 100%;
}
.bg-white {
  background: #fff;
}
.mb {
  margin-bottom: 8px;
}
.pip-mb {
  margin-bottom: 25px;
}
.bed-bread {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  .span {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
}
.bed-content {
  padding: 30px;
  background: #fff;
  min-height: calc(100% - 70px);
  overflow: hidden;
}
.bread-title {
  font-size: 16px;
  color: #333;
  margin-left: 23px;
}
.pointer {
  cursor: pointer;
}
.tips {
  font-size: 14px;
  color: #5c5c5c;
}
.form {
  width: 620px;
}
.width-100 {
  width: 100%;
}
/deep/ .ant-form-item {
  margin-bottom: 20px;
}

/deep/ #app-content {
  .ant-form-item-label {
    label {
      font-size: 14px !important;
    }
  }
}
/deep/ .ant-form-item-required:before {
  display: inline-block;
  margin-right: 4px;
  // color: #5c5c5c;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: '*';
}
.bg-color {
  background: #f6f8fe;
  height: 48px;
  padding: 0 14px;
  line-height: 48px;
  font-size: 14px;
  color: #333;
  font-weight: 400;
}
.textarea {
  position: relative;
  .text {
    font-size: 14px;
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
}
</style>
