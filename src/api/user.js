/**
  * user模块接口列表
  */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import md5 from 'md5'; // 根据需求是否导入qs模块

import store from '@/store';


const userAPI = {
  // 新闻列表
  //  articleList () {
  //      return axios.get(`${base.sq}/topics`);
  //  },
  // post提交
  //  login (params) {
  //      return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  //  },

  // 注册
  reg(name, psd) {
    return axios.post('/api/register', {
      username: name,
      password: md5(psd)
    })
  },

  login(name, psd) {
    return axios.post('/api/login', {
      username: name,
      password: md5(psd)
    })
  },

  getUser() {
    return axios.post('/api/user')
  },

  editUser(msg) {
    return axios.post('/api/editUser', msg)
  },

  checkUser(username){
    return axios.post('/api/checkUser',{username})
  },

  logout(){
    return axios.post('/api/logout')
  }


}

export default userAPI;