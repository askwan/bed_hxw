<template>
  <div class="clock_out">
    <div class="clock">
      <p class="date">...403 您无权访问这个页面...</p>
      <p class="time">{{ dateSS }}</p>
      <p class="text">{{ dateMM }}</p>
      <p class="text_back" @click="toHome">Back Home</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Exception403',
  data() {
    return {
      dateSS: moment().format('HH:mm:ss'),
      dateMM: moment().format('YYYY-MM-DD dddd')
    }
  },
  mounted() {
    this.refreshTime()
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' })
    },
    refreshTime() {
      setInterval(() => {
        this.dateSS = moment().format('HH:mm:ss')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.clock_out {
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
  height: 100%;
  // height: 600px;
  p {
    margin: 0;
  }
  .text_back {
    text-decoration: underline;
  }
  .text_back:hover {
    color: #aa0ff9;
    cursor: pointer;
    font-size: 14px;
  }
}
.clock {
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.date {
  letter-spacing: 0.1em;
  font-size: 15px;
}
.time {
  letter-spacing: 0.05em;
  font-size: 60px;
  padding: 5px 0;
}
.text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}</style
>>
