/**
  * article模块接口列表
  */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

import store from '@/store';


const calendarAPI = {

  //  获取每月信息
  getMonthMsg: async () => {
    //今年
    var y = store.state.calendar.nowshow.year;
    //本月
    var m = store.state.calendar.nowshow.month;
    //上一月所在的年
    var prevy = m == 1 ? y - 1 : y;
    //上一月
    var prevm = m == 1 ? 12 : m - 1;
    //下一月所在的年
    var nexty = m == 12 ? y + 1 : y;
    //下一月
    var nextm = m == 12 ? 1 : m + 1;

    let flag = false;
    let monthMsg = {};
    try {
      // let themonth = await axios.get("/api/schedule/" + y + "/" + m)
      let themonth = await axios.post('/api/getSchedule', { y, m })
      monthMsg.themonth = themonth.data.data;
      // console.log('themonth', themonth);

      // let prevmonth = await axios.get("/api/schedule/" + prevy + "/" + prevm)
      let prevmonth = await axios.post('/api/getSchedule', { y: prevy, m: prevm })
      monthMsg.prevmonth = prevmonth.data.data;
      // console.log('prevmonth', prevmonth);

      // let nextmonth = await axios.get("/api/schedule/" + nexty + "/" + nextm)
      let nextmonth = await axios.post('/api/getSchedule', { y: nexty, m: nextm })
      monthMsg.nextmonth = nextmonth.data.data;
      // console.log('nextmonth', nextmonth);

    } catch (err) {
      console.log(err);

      flag = true
    }

    if (!flag) {
      return monthMsg
    } else {
      return false
    }

  },

  addSchedule(msg) {
    return axios.post('/api/addSchedule', msg)
  },

  getDay(day) {
    return axios.post('/api/getDay', { day })
  },

  delSchedule(id) {
    return axios.post('/api/delSchedule', { id })
  },

  changeSchedule(msg) {
    return axios.post('/api/changeSchedule', msg)
  }

}

export default calendarAPI;