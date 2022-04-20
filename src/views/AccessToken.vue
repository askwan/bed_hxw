<template>
  <div></div>
</template>
<script>
import store from '@/store'
export default {
  data(){
    return {
      token: ''
    }
  },
  mounted(){
    const query = this.$route.query
    const globalInfo = store.state.global
    const accessToken = window.__POWERED_BY_QIANKUN__ ? globalInfo.token : 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0d3kxMjMiLCJ1c2VySWQiOiI3MzciLCJuYW1lIjoi55Sw5paH5riKIiwiaWQiOiJNZEpueU5aTSIsImV4cCI6MTY1MDQ1MTI0Mn0.ZPKLU_nRq8B3XW3g1FA4yZTvGuDzEzJun9cQvKcuW5mNxLCGpQToKbJ2qypHF6wgRiJojlwPolUZWyzhNvKyTjWcYtFh3B2F8IFg2gGs3XEPVDvvRNpXzN4MtzI14TmlHWx6BkET8Cf7dFYox1Ug869ZyHRK2zXTi7dzGPuDwKY'
    if(query.access_token) {
      this.setToken(query.access_token, query.redirect)
    } else {
      this.setToken(accessToken, query.redirect)
    }
  },
  methods:{
    setToken(token, to){
      this.$store.dispatch('SetToken',token).then(()=>{
        this.$router.push({
          path: to
        })
      })
    }
  },
}
</script>
