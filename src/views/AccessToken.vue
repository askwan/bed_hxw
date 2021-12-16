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
    const accessToken = window.__POWERED_BY_QIANKUN__ ? globalInfo.token : 'test_token'
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
