<template>
  <div class="lab-introduce">
    <div class="banner">
      <div class="page-width p20">
        <div class="flex-between">
          <div class="banner-left">
            <div class="banner-title">跨域分布式试验床</div>
            <div class="banner-des">
              基于分布在不同地理位置的数据中心和高速骨干网络提供广域分布式的试验环境，适用于区块链、联邦学习、分布式智能辩手等需
              要真实跨域分布式环境的科研实验场景。
            </div>
            <div class="banner-more-btn" @click="productBug">立即购买</div>
          </div>
          <div class="banner-right">
            <img src="../assets/images/ind-1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="page-width p20 bg-white">
      <div class="gntx">
        <span>-</span>
        <span>功能特性</span>
        <span>-</span>
      </div>
      <div class="gntx-des">
        用户痛点：越来越多的去中心化技术实验需要真实的广域分布式环境支撑，以区块链为例，依托实验室局域网环境难以对区块链的数据传输交互、跨链通信等进行有效模拟，无法验证技术的有效性。
      </div>
      <div class="txs">
        <a-row>
          <a-col v-for="item in gntx" :key="item.id" :span="8">
            <div class="tx-card">
              <div class="tx-content">
                <div class="tx-icon">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="tx-title">{{ item.title }}</div>
                <div class="tx-des">{{ item.des }}</div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="page-width p20 bg-white">
      <div class="gntx">
        <span>-</span>
        <span>架构示意图</span>
        <span>-</span>
      </div>
    </div>
    <div class="jg-img">
      <img src="../assets/images/ind-5.png" alt="" />
    </div>
    <div class="page-width p20 bg-white">
      <div class="gntx">
        <span>-</span>
        <span>应用场景</span>
        <span>-</span>
      </div>
      <a-row :gutter="20">
        <a-col v-for="item in cj" :key="item.id" :span="8">
          <div class="cj-card">
            <img :src="item.icon" alt="" />
            <div class="cj-title">{{ item.title }}</div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="create-btn">
      <a-button type="primary" size="large">
        <router-link to="/lab/add">创建实验</router-link>
      </a-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import GNTX1 from '@/assets/images/ind-2.png'
import GNTX2 from '@/assets/images/ind-3.png'
import GNTX3 from '@/assets/images/ind-4.png'
import CJ1 from '@/assets/images/ind-6.png'
import CJ2 from '@/assets/images/ind-7.png'
import CJ3 from '@/assets/images/ind-8.png'
export default {
  data() {
    return {
      gntx: [
        { id: 1, title: '一键式部署', icon: GNTX1, des: '批量地从所选择的数据中心分配所需算力资源，快速完成部署' },
        { id: 2, title: '自动化配置', icon: GNTX2, des: '在线自动化完成软硬件环境配置' },
        {
          id: 3,
          title: '资源灵活选择',
          icon: GNTX3,
          des: 'CPU、内存、硬盘、加速卡、骨干网链路带宽、操作系统等均可自主选择搭配'
        }
      ],
      cj: [
        { id: 1, title: '区块链实验', icon: CJ1 },
        { id: 2, title: '联邦学习', icon: CJ2 },
        { id: 3, title: '分布式智能辩手', icon: CJ3 }
      ]
    }
  },
  methods: {
    productBug() {
      this.$router.push({
        path: '/product/test-bed',
        query: { productId: 17, productName: '分布式实验床' }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.p20 {
  padding: 20px;
}
.lab-introduce {
  padding-top: 60px;
  background: #fff;
}
.bg-white {
  background: #fff;
}
.breadcrumb {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.banner {
  width: 100%;
  height: 315px;
  background: #239bd7;
}
.banner-left {
  color: #fff;
  flex-basis: 70%;
  .banner-title {
    font-size: 32px;
    font-weight: 100;
    margin-bottom: 20px;
  }
  .banner-des {
    font-size: 18px;
    line-height: 2;
    font-weight: 100;
    margin-bottom: 20px;
  }
  .banner-more-btn {
    font-size: 18px;
    display: inline-block;
    padding: 5px 20px;
    background: #fff;
    cursor: pointer;
    color: #239bd7;
  }
}
.gntx {
  text-align: center;
  font-size: 34px;
  color: #282e3f;
  margin-top: 40px;
  margin-bottom: 60px;
  font-weight: 100;
  span:nth-of-type(2) {
    margin: 0 40px;
  }
}
.gntx-des {
  width: 100%;
  font-size: 16px;
}
.tx-card {
  width: 450px;
  height: 450px;
  background: url('~@/assets/images/ind-9.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding-top: 60px;
  left: 50%;
  margin-left: -225px;
  .tx-content {
    width: 320px;
    height: 320px;
    // background: red;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    top: 28px;
  }
  .tx-icon {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tx-title {
    width: 300px;
    text-align: center;
    font-size: 26px;
    color: #282e3f;
    font-weight: 100;
    margin-bottom: 20px;
  }
}
.jg-img {
  width: 100%;
  // height: 288px;
  // background: red;
  img {
    width: 100%;

    // height: auto;
  }
}
.cj-card {
  position: relative;
  img {
    width: 360px;
    // height: auto;
    height: 288px;
  }
  .cj-title {
    position: absolute;
    top: 60%;
    width: 360px;
    left: 50%;
    transform: translate(-50%, 0);
    color: #fff;
    font-size: 26px;
    font-weight: 100;
    text-align: center;
  }
}
.create-btn {
  font-size: 16px;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 40px;
}
</style>
