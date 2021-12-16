<template>
  <div class="lab-source">
    <div class="page-width p20 content">
      <div class="source-content">
        <a-card
          v-for="source in sources"
          :key="source.id"
          class="source-card"
          hoverable
          style="width: 318px; height: 374px;"
          @click="handleSelect(source)"
        >
          <!-- <div class="tags">
            <a-tag color="#2db7f5"> 硬件 </a-tag>
          </div> -->
          <div class="source-icon">
            <img :src="source.icon" />
          </div>
          <a-card-meta :title="source.name">
            <div slot="description" class="des">
              {{ source.des }}
            </div>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import FBS from '@/assets/images/FBS.png'
// import MJPT from '@/assets/images/MJPT.png'
// import YJS from '@/assets/images/YJS.png'
import RJW from '@/assets/images/labcombo-bak.png'
// ===================================智能核心网===================
import HXW from '@/assets/intelligent-network-lab-imgs/lab-icon.jpg'
// ===================================智能核心网===================
export default {
  data() {
    return {
      sources: [
        {
          id: 1,
          name: '跨域分布式云试验床',
          icon: FBS,
          des:
            '基于分布在不同地理位置的数据中心和高速骨干网络提供广域分布式的试验环境，适用于区块链、联邦学习、分布式智能辩手等需要真实跨域分布式环境的科研实验场景。',
          owner: '寒武纪',
          path: '/labintroduce'
        },
        // {
        //   id: 2,
        //   name: '芯片敏捷开发平台',
        //   icon: MJPT,
        //   des: '提供多种形式算力资源和海量存储，完整保留项目成果。',
        //   owner: '海光',
        //   path: '/labintroduce',
        // },
        // {
        //   id: 3,
        //   name: '云计算试验床',
        //   icon: YJS,
        //   des: '提供基于裸金属服务器的资源虚拟化实验，还可以基于广域高速网络提供多数据心间云资源调度、边云协同等试验环境。',
        //   owner: '中科院计算所',
        //   path: '/labintroduce',
        // },
        {
          id: 2,
          name: '人机物分布式智能实验床',
          icon: RJW,
          des:
            '基于信息高铁控域技术，为端边云应用分配一体化和隔离的资源空间，形成新型人机物分布式智能实验平台，为无人车群、智能家居、智慧城市等人机物分布式智能应用，提供敏捷的编程开发服务和高效率的运行环境。',
          owner: '寒武纪',
          path: '/distributeIntro'
        },
        // ===================================智能核心网===================
        {
          id: 3,
          name: '智能核心网实验床',
          icon: HXW,
          des:
            '基于SDN技术架构，智能核心网实验床依托未来网络试验设施CENI，支撑信息高铁云站点之间的广域互联与数据可控传输。 基于自主研发的智能网络测调系统，实现网络状态动态感知和网络资源智能调度，为信息高铁用户提供高带宽、强实时、高可靠的网络传输服务。',
          owner: '寒武纪',
          path: '/networklabintro'
        }
        // ===================================智能核心网===================
      ]
    }
  },
  methods: {
    handleSelect(item) {
      // const routeData = this.$router.resolve({
      //   path: item.path
      // })
      // window.open(routeData.href, '_blank')
      this.$router.push(item.path)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-card-body {
  padding-bottom: 0px;
}
.lab-source {
  padding-top: 60px;
  height: 100vh;
  background: #fff;
}
.content {
  margin-top: 20px;
  background: #fff;
  height: 100%;
  margin-bottom: 20px;
}
.p20 {
  padding: 20px;
}
.source-content {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.source-card {
  // display: inline-block;
  margin-left: 50px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 2px 1px 18px -2px #e0ecff;
  border-radius: 4px;
}
.tags {
  display: flex;
  justify-content: flex-end;
}
.source-icon {
  margin-top: 20px;
  width: 68px;
  height: 68px;
  margin-bottom: 48px;
  margin-left: 110px;
  img {
    width: 100%;
    height: 100%;
  }
}
/deep/ .ant-card-meta-title {
  margin-bottom: 48px !important;
}
/deep/.ant-card-bordered {
  border: none;
}
.des {
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  //height: 90px;
}
.actions {
  text-align: left;
  padding-left: 20px;
}
</style>
