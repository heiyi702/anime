<template>
  <div id="CalendarMonth">
    <!-- 放一个table显示边框用的 -->
    <div class="bg_box bgBox">
      <table>
        <thead>
          <tr class="xingqi">
            <th v-for="(item,index) in dayofweek" :key="index">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tr,rowindx) in the42data" :key="rowindx">
            <td
              class="tipBox"
              v-for="(col,colindex) in tr"
              :key="`${col.day}-${tr}`"
              v-bind:data-row="rowindx"
              v-bind:data-col="colindex"
            >
              <span
                class="tip more"
                v-if="col.schedule.length > 3"
              >...{{col.schedule.length - 3}} more</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 核心数据 -->
    <div class="schedule_box scheduleBox" ref="scheduleBox" @click="getTipBox">
      <div class="row" v-for="index in 6" :key="index">
        <table>
          <thead>
            <tr class="dayTr">
              <!-- 显示日期数字 -->
              <th
                v-for="_index in 7"
                :key="_index"
                v-if="the42data[index - 1].length != 0"
                v-bind:class="{'gray' : the42data[index - 1][_index - 1].prevmonth || the42data[index - 1][_index - 1].nextmonth}"
              >{{ the42data[index - 1][_index - 1].day }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- 日程表 -->
            <tr v-for="(tr,indextr) in domdata[index - 1]" :key="indextr">
              <td
                v-for="(td,indextd) in tr"
                :key="indextd"
                v-bind:colspan="td.colspan"
                v-bind:class="['schedule',td.classname , {'leftEndPointRect' : td.leftEndPointRect} , {'rightEndPointRect' : td.rightEndPointRect} , {'boxshadow' : td.title != ''}]"
                v-bind:data-_id="td._id"
                v-bind:data-month="td.month"
                v-bind:data-date="td.date"
                v-bind:data-hour="td.hour"
                v-bind:data-minutes="td.minutes"
                v-bind:data-hour2="td.hour2"
                v-bind:data-minutes2="td.minutes2"
                v-bind:data-title="td.title"
                v-bind:data-type="td.classname"
                v-bind:data-during="td.colspan"
                v-bind:data-year="td.year"
                v-bind:empty="td.empty"
              >
                <div v-bind:empty="td.empty">{{td.title}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "underscore";
import change42DataToDomData from "@/libs/change42DataToDomData.js";
// import calcDailySchedule from "@/libs/calcDailySchedule.js";
import init from "@/libs/init.js";
import calendarAPI from "@/api/calendar";
import $ from "jquery";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("calendar");

export default {
  // props: ["year", "month"],
  components: {},
  data: function() {
    return {
      // year:this.nowshow.year,
      // month:this.nowshow.month,
      //表头
      dayofweek: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      //本表中的42天的数据，数据符合{title,during,type}格式
      the42data: [[], [], [], [], [], []],
      //本表中的42个小格的DOM情形，Vue就是遍历这个数组来生成DOM的，里面存放colspan、title、classname等信息
      domdata: [
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []]
      ],
      //本表中42个小格每天的任务数量
      the42daythingsnumber: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      //本月的API格式信息
      themonth: [],
      //上个月的信息
      prevmonth: [],
      //下个月的信息
      nextmonth: [],
      // chupeng_id: "",
      toolBox: {
        title: "",
        date: "",
        month: "",
        during: "",
        type: "",
        hour: "",
        hour2: "",
        minutes: "",
        minutes2: ""
      },
      dailyinfo: {
        year: 0,
        month: 0,
        date: 0,
        dailyschedule: []
      }
    };
  },
  created: function() {
    this.setCanlendar();
  },
  mounted: function() {},
  //页面更新完毕之后
  updated: function() {
    // this.setCanlendar();
  },
  methods: {
    getTipBox(event) {
      let that = this;
      let nowYear = this.year;
      let nowMonth = this.month;
      // let window=document.body
      // var left = event.clientX + window.scrollLeft();
      // var top = event.clientY + window.scrollTop();
      // let window = document.getElementsByClassName("auto")[0];
      let window = $(".auto");
      var top = event.clientY + window.scrollTop();
      var left = event.clientX + window.scrollLeft();
      console.log(top);
      // console.log(left);
      $(".bg_box table tbody tr td").each(function() {
        var T = $(this).offset().top;
        var R = $(this).offset().left + $(this).width();
        var B = $(this).offset().top + $(this).height();
        var L = $(this).offset().left;

        if (left > L && left < R && top > T && top < B) {
          let row = Number($(this).attr("data-row"));
          let col = Number($(this).attr("data-col"));

          let data = that.the42data[row][col];
          let day = data.day;
          let prevmonth = data.prevmonth;
          let nextmonth = data.nextmonth;
          let year = nowYear;
          let month = nowMonth;
          if (prevmonth) {
            year = nowMonth == 1 ? nowYear - 1 : nowYear;
            month = nowMonth == 1 ? 12 : nowMonth - 1;
          }
          if (nextmonth) {
            year = nowMonth == 12 ? nowYear + 1 : nowYear;
            month = nowMonth == 12 ? 1 : nowMonth + 1;
          }
          console.log(year, month, day);
          let toDay = `${year}-${month}-${day}`;
          if (!data) {
            that.$Message.error("时间有误!");
            return;
          }
          that.$router.push({ name: "CalendarDetail", params: { day: toDay } });
        }
      });
    },
    //将英语的类型名字变为中文
    chinesetype(type) {
      return init.schedule_types[type];
    },
    //这个函数的主要目的就是发出Ajax请求，请求三个月份的数据，更新这个组件的the42data、domdata两个数据。
    //the42data和表格形态有关，domdata决定了schedule的呈递。
    setCanlendar: function() {
      //复原
      this.domdata = [
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []],
        [[], [], []]
      ];
      this.the42data = [[], [], [], [], [], []];
      this.the42daythingsnumber = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ];

      var self = this;

      calendarAPI.getMonthMsg().then(monthMsg => {
        if (monthMsg) {
          this.themonth = monthMsg.themonth;
          this.prevmonth = monthMsg.prevmonth;
          this.nextmonth = monthMsg.nextmonth;
          set.call(this);
        }
      });

      function set() {
        var themonth = _.clone(this.themonth);
        var prevmonth = _.clone(this.prevmonth);
        var nextmonth = _.clone(this.nextmonth);

        //本月第一天，日期对象
        var thefirstdate = new Date(this.year, this.month - 1, 1);
        //查看本月第一天星期几
        var thefirestdateday = thefirstdate.getDay();
        //星期几就补几个上月（星期0特殊补充7个，星期1补充1个，星期2补充2个……星期6补充6个）
        //上月需要补充的个数
        var shangyuebuchonggeshu = thefirestdateday == 0 ? 7 : thefirestdateday;
        //将上月的补充到第一行
        while (shangyuebuchonggeshu--) {
          let o = prevmonth.pop();
          o.prevmonth = true;
          this.the42data[0].unshift(o);
        }

        //第0行还需要本月的个数
        var count = thefirestdateday != 0 ? 0 : 1;
        var diyihangbenyuegeshu = 7 - thefirestdateday;
        while (diyihangbenyuegeshu--) {
          this.the42data[count].push(themonth.shift());
        }

        while (themonth.length > 7) {
          count++;
          this.the42data[count] = themonth.slice(0, 7);
          themonth = themonth.slice(7);
        }
        //剩下的本月天数推进去
        this.the42data[++count] = themonth;

        //这不满的这一行需要下月的天数个数
        var zhehangxiayuetianshu = 7 - themonth.length;
        while (zhehangxiayuetianshu--) {
          let o = nextmonth.shift();
          o.nextmonth = true;
          this.the42data[count].push(o);
        }

        //补满7天，
        this.the42data[++count] = nextmonth.slice(0, 7);
        //遍历最后一行7天，加上nextmonth = true;
        this.the42data[count].forEach(item => {
          item.nextmonth = true;
        });

        // 【heiyi 确定the42data是六行】
        if (this.the42data.length > 6) {
          this.the42data.length = 6;
        }
        // 【heiyi 确定the42data是六行 end】
        //至此，this.the42data已经生成完毕，下面要根据这个数组来生成42天的DOM情形

        //【分析跨月】
        //这里可以看看4月份还没有做完的，遗留到本月的
        //遍历上个月的数组
        var self = this;
        //计数器，计算下来有多少个事情跨月了
        var count = 0;
        for (let i = 0; i < prevmonth.length; i++) {
          prevmonth[i].schedule.forEach((item, index) => {
            if (item.during + i > prevmonth.length) {
              //发生了跨月的情况
              //计算剩到本月多少天
              let rest = item.during - (prevmonth.length - i);

              //干三件事儿！
              for (let m = 0; m < rest; m++) {
                let hanghao = parseInt(m / 7);
                let liehao = m % 7;

                //第一件事儿，改变the42daythingsnumber
                self.the42daythingsnumber[hanghao][liehao]++;

                //第二件事儿，改变这些天的occupation
                if (
                  !self.the42data[hanghao][liehao].hasOwnProperty("occupation")
                ) {
                  self.the42data[hanghao][liehao].occupation = [];
                }
                self.the42data[hanghao][liehao].occupation.push(count);
              }

              for (let tang = 0; tang < Math.ceil(rest / 7); tang++) {
                if (tang != Math.ceil(rest / 7) - 1) {
                  this.domdata[tang][count] = [
                    {
                      title: item.title,
                      classname: item.type,
                      colspan: 7,
                      leftEndPointRect: true,
                      rightEndPointRect: true,
                      _id: item._id,
                      date: item.date,
                      month: item.month,
                      hour: item.hour,
                      minutes: item.minutes,
                      year: item.year,
                      hour2: item.hour2,
                      minutes2: item.minutes2
                    }
                  ];
                } else {
                  this.domdata[tang][count] = [
                    {
                      title: item.title,
                      classname: item.type,
                      colspan: rest % 7 == 0 ? 7 : rest % 7,
                      leftEndPointRect: true,
                      _id: item._id,
                      date: item.date,
                      month: item.month,
                      hour: item.hour,
                      minutes: item.minutes,
                      year: item.year,
                      hour2: item.hour2,
                      minutes2: item.minutes2
                    }
                  ];
                }
              }
              count++;
            }
          });
        }

        //调用函数
        change42DataToDomData(
          this.the42data,
          this.the42daythingsnumber,
          this.domdata
        );
      }
    }
  },
  computed: {
    ...mapState({
      nowshow: state => state.nowshow,
      year: state => state.nowshow.year,
      month: state => state.nowshow.month
    })
  }
};
</script>

<style lang="less" scoped>
#CalendarMonth {
  position: relative;
  margin: 20px auto;
  width: 1000px;
  height: 860px;

  .bgBox {
    height: 860px;
    // border: 1px solid #888;
    background: #fff;

    table {
      width: 100%;
      // min-height: 660px;
      border-collapse: collapse;
      table-layout: fixed;
      .xingqi {
        height: 80px;
        background: #eee;
      }
      tr {
        height: 130px;

        th,
        td {
          text-align: center;
          border-collapse: collapse;
          border: 1px solid #ccc;
        }
      }
      .tipBox {
        position: relative;
        .tip {
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }

  .scheduleBox {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    height: 780px;

    .row {
      height: 130px;

      .more {
        height: 34px;
        line-height: 34px;
        text-align: center;
        padding-right: 6px;
      }

      table {
        width: 100%;
        table-layout: fixed;
        .dayTr {
          height: 30px;
          line-height: 30px;
          th {
            width: 100%;
            padding-right: 6px;
            height: 30px;
            line-height: 30px;
            text-align: right;
          }
        }
        td {
          padding: 2px;
          div {
            height: 100%;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 2px;
            text-align: center;
            border-radius: 4px;
            font-size: 12px;
            line-height: 18px;
            height: 18px;
          }
        }
        // .schedule {
        //   div {
        //     color: #333;
        //     background: pink;
        //   }
        // }
        // .work {
        //   div {
        //     background: #333;
        //     color: #f1f1f1;
        //   }
        // }
        // .life {
        //   div {
        //     background: #abcdef;
        //     color: rgb(15, 14, 14);
        //   }
        // }
      }
    }
  }

  .schedule.life div {
    background: -webkit-linear-gradient(
      top,
      rgba(174, 213, 129, 0.49),
      rgba(76, 175, 80, 0.54)
    );
  }
  .schedule.warning div {
    background: -webkit-linear-gradient(top, darkred, red);
    color: white;
  }
  .schedule.work div {
    background: -webkit-linear-gradient(
      top,
      rgba(255, 215, 0, 0.32),
      rgba(255, 165, 0, 0.61)
    );
  }
  .schedule.important div {
    background: -webkit-linear-gradient(
      top,
      rgba(135, 206, 235, 0.38),
      rgba(33, 150, 243, 0.7)
    );
  }
  .gray {
    color: #999;
  }
}
</style>
