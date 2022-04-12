<template>
  <div class="fill introduce network-intro">
    <div class="banner">
      <div class="page-width p20">
        <a-row>
          <a-col :span="16">
            <div class="banner-title">智能核心网实验床</div>
            <div class="banner-des">
              基于SDN技术架构，智能核心网实验床依托未来网络试验设施CENI，支撑信息高铁云站点之间的广域互联与数据可控传输。
              基于自主研发的智能网络测调系统，实现网络状态动态感知和网络资源智能调度，为信息高铁用户提供高带宽、强实时、高可靠的网络传输服务。
            </div>
            <div class="banner-more-btn" @click="toOrder">立即购买</div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="page-width p20 bg-white">
      <div class="subtitle">
        <span>-</span>
        <span style="margin: 0 40px">功能特性</span>
        <span>-</span>
      </div>
      <div class="subtitle-description">
        基于SDN设计广域网架构，数据平面通过SRv6隧道、网络切片等技术实现网络虚拟化和带宽时延可控，通过智能可编程路由器进一步提高网络开放编程能力。
        基于随流监测技术，实现网络服务质量可视、可感、故障快速定位，基于AI和大数据技术实现智能调度和智能运维。
      </div>
      <div class="txs">
        <a-row style="left: -40px">
          <a-col :span="8">
            <div class="tx-card">
              <div class="tx-content">
                <div class="tx-icon">
                  <img src="@/assets/intelligent-network-lab-imgs/network_feature_1.png" alt />
                </div>
                <div class="tx-title">网络状况可感知</div>
                <div class="tx-des">采用SDN网络状态动态感知技术，基于主动、被动测量技术实现实时感知链路状态</div>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="tx-card">
              <div class="tx-content">
                <div class="tx-icon">
                  <img src="@/assets/intelligent-network-lab-imgs/network_feature_2.png" alt />
                </div>
                <div class="tx-title">业务需求可定制</div>
                <div class="tx-des">对不同类型的应用提供不同QOS服务保障</div>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="tx-card">
              <div class="tx-content">
                <div class="tx-icon">
                  <img src="@/assets/intelligent-network-lab-imgs/network_feature_3.png" alt />
                </div>
                <div class="tx-title">数据平面可编程</div>
                <div class="tx-des">
                  数据平面通过SRv6隧道、网络切片等技术实现网络虚拟化和数据平面可编程，基于智能可编程路由器提高网络功能定制开发能力
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="page-width p20 bg-white">
      <div class="subtitle">
        <span>-</span>
        <span style="margin: 0 40px">架构示意图</span>
        <span>-</span>
      </div>
    </div>

    <div class="jg-img">
      <img src="@/assets/intelligent-network-lab-imgs/network_frame.png" alt="图片" />
    </div>

    <div class="page-width p20 bg-white" style="padding-bottom: 100px">
      <div class="subtitle">
        <span>-</span>
        <span style="margin: 0 40px">应用场景</span>
        <span>-</span>
      </div>
      <a-row style="margin-left: -10px; margin-right: -10px">
        <a-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="cj-card">
            <img src="@/assets/intelligent-network-lab-imgs/network_scene_1.png" alt />
            <div class="cj-title">5G应用实验</div>
          </div>
        </a-col>
        <a-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="cj-card">
            <img src="@/assets/intelligent-network-lab-imgs/network_scene_2.png" alt />
            <div class="cj-title">广域网优化实验</div>
          </div>
        </a-col>
        <a-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="cj-card">
            <img src="@/assets/intelligent-network-lab-imgs/network_scene_3.png" alt />
            <div class="cj-title">可控数据传输实验</div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toOrder() {
      this.$router.push({ name: 'bed_source', query: { productId: 18, productName: '智能核心网实验床' } })
    },
  },
}
</script>
<style lang="less" scoped>
.network-intro {
  //padding-top: 60px;
  background: #fff;
}

.banner {
  width: 100%;
  height: 350px;
  background: url('~@/assets/intelligent-network-lab-imgs/network_banner.png') no-repeat center;
  color: white;

  .banner-title {
    font-size: 32px;
    font-weight: 100;
    margin-top: 50px;
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

.p20 {
  padding: 20px;
}

.page-width {
  width: 1200px;
  margin: 0 auto;
}

.bg-white {
  background-color: #fff;
}

.jg-img {
  width: 100%;
  background: #9bcbff;
  text-align: center;
}

.subtitle {
  text-align: center;
  font-size: 34px;
  color: #282e3f;
  margin-top: 40px;
  margin-bottom: 60px;
  font-weight: 100;
}

.subtitle-description {
  font-size: 16px;
}

.tx-card {
  width: 450px;
  height: 450px;
  background: url('~@/assets/intelligent-network-lab-imgs/tx-card.png') no-repeat;
  background-size: 100%;
  padding-top: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tx-content {
    width: 320px;
    height: 320px;
    top: 28px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tx-icon {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;

    img {
      width: 120px;
      height: 120px;
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

.cj-card {
  position: relative;

  .cj-title {
    position: absolute;
    top: 60%;
    width: 360px;
    left: 50%;
    transform: translate(-50%);
    color: #fff;
    font-size: 26px;
    font-weight: 100;
    text-align: center;
    text-shadow: 0 0 5px black;
  }

  img {
    width: 360px;
    height: 288px;
    vertical-align: middle;
    border-style: none;
  }
}

.fill {
  width: 100%;
  height: 100%;
}
.left-bar {
  width: 160px;
  flex-shrink: 0;
  background: #fff;
  position: fixed;
  z-index: 101;
  top: 60px;
  left: 0px;
  bottom: 0;
  height: 100%;
}
.introduce {
  background: #fff;
  padding: 0px;
}
.introduce-title {
  color: #333;
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 30px;
}
.introduce-des {
  font-weight: 400;
  line-height: 32px;
  font-size: 18px;
  margin-bottom: 25px;
}
.btn-group {
  margin-bottom: 30px;
}
.map {
  height: calc(100% - 220px);
  // background: red;
}
</style>
