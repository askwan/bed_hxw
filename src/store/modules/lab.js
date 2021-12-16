/* eslint-disable */
import {getLabUser} from '@/api/Lab/labserver'
import { Message } from 'ant-design-vue'
const lab = {
  namespaced:true,
  state:{
    user:'',
    labUserList:[]
  },
  getters:{},
  actions:{
    GETLABUSERS({commit}){
      getLabUser().then(res =>{
        if(res.statusCode === 200) {
          commit('setLabUsers',res.data)
        }else {
          Message.error(res.message)
        }
      })
    }
  },
  mutations:{
    setLabUsers(state,list){
      state.labUserList = [...list]
    }
  },
}

export default lab
