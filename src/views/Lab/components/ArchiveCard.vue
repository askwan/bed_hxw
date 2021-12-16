<template>
  <a-card class="source-card" hoverable>
    <img slot="cover" class="cover" :src="img_src" alt="" @click="handleSelect" />
    <a-card-meta :title="detail.name">
      <div slot="description" class="description">
        <div class="grow">
          <div v-if="detail.laboratory">{{ detail.laboratory.name }}</div>
          <!-- <div>{{ formateTime(detail.createTime) }}</div> -->
        </div>
        <div class="member">
          <!-- <a-avatar
            v-for="i in members"
            :key="i"
            class="member-icon"
            icon="user"
            :style="{ left: 50 + (i - (members + 1) / 2) * 12 + '%' }"
          /> -->
        </div>
      </div>
    </a-card-meta>
  </a-card>
</template>
<script>
/* eslint-disable */
import { fromNow } from '../utils'
import img from '@/assets/images/lab_default.png'
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      members: 5,
    }
  },
  computed: {
    img_src() {
      if(this.detail && this.detail.laboratory && this.detail.laboratory.bannerUrl) {
        return this.detail.laboratory.bannerUrl
      }else {
        return img
      }
    }
  },
  mounted() {},
  methods: {
    formateTime(time) {
      return fromNow(time)
    },
    handleSelect() {
      this.$router.push('/lab/archive_detail?id=' + this.detail.id)
    },
  },
}
</script>
<style lang="less" scoped>
.source-card {
  height: 343px;
  width: 336px;
  display: inline-block;
  overflow: hidden;
  margin-right: 30px;
  margin-bottom: 30px;
}
.cover {
  width: 100%;
  height: 212px;
}
.description {
  display: flex;
  align-items: center;
}
.grow {
  flex-grow: 2;
}
.member {
  flex-shrink: 0;
  // background: red;
  height: 55px;
  width: 100px;
  position: relative;
  overflow: hidden;
  .member-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px #999;
  }
}
</style>