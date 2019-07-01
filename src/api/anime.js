/**
  * anime模块接口列表
  */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块
// import md5 from 'md5'; // 根据需求是否导入qs模块

// import store from '@/store';


const animeAPI = {
  // 新闻列表
  //  articleList () {
  //      return axios.get(`${base.sq}/topics`);
  //  },
  // post提交
  //  login (params) {
  //      return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  //  },


  // 新增视频
  addAnime(msg) {
    return axios.post(`/api/addAnime`, msg);
  },

  // 查询全部Acg
  getAllAcgList(type, page, search) {
    return axios.post('/api/allAcg', {
      type,
      page,
      search
    })
  },

  // 查询视频详情
  getAnimeDetail(id) {
    return axios.post('/api/animeDetail', { id })
  },

  // 更改视频详情
  changeAnime(id, msg) {
    return axios.post('/api/changeAnime', { id, msg })
  },

  // 删除视频详情
  delAnime(id) {
    return axios.post('/api/delAnime', { id })
  },


}

export default animeAPI;