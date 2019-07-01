/**
  * anime模块接口列表
  */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例


const gameAPI = {


  // 新增游戏
  addGame(msg) {
    return axios.post(`/api/addGame`, msg);
  },

  // 查询全部游戏
  getAllGameList(type, page, search) {
    return axios.post('/api/allGame', {
      type,
      page,
      search
    })
  },

  // 查询游戏详情
  getGameDetail(id) {
    return axios.post('/api/gameDetail', { id })
  },

  // 更改游戏详情
  changeGame(id, msg) {
    return axios.post('/api/changeGame', { id, msg })
  },

  // 删除游戏详情
  delGame(id) {
    return axios.post('/api/delGame', { id })
  },


}

export default gameAPI;