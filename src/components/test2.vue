<template>
  <div class="canlendar">
    <!-- <div class="bgBox">
      最外层大表格负责布局 不写日期和任务 显示边框用
      <table>
        <thead>
          <tr class="xingqi">
            <th v-for="(item,index) in week" v-bind:key="index">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in 6" v-bind:key="index">
            <td v-for="(item,index) in 7" :key="index"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="scheduleBox">
      6行6个row 放每周日期和任务
      <div class="row" v-for="(row,indexRow) in workarr" :key="indexRow">
        <table cellpadding="0" cellspacing="0">
          显示日期
          <thead>
            <tr class="dayTr">
              <th v-for="(day,indexDay) in weekarr[indexRow]" :key="indexDay">{{day.day}}</th>
            </tr>
          </thead>
          显示任务
          <tbody>
            <tr v-for="(tr,index) in row" :key="index">
              <td
                :class="td.type"
                v-for="(td,idx) in tr"
                :key="idx"
                :colspan="td.colspan"
                :rowspan="td.rowspan"
              >
                <div>{{td.title}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>-->
    <!-- <CalendarAdd></CalendarAdd> -->

    <Modal title="Title" v-model="showAddBox" footer-hide class-name="vertical-center-modal">
      <Form
        class="calendarAddForm"
        :model="formItem"
        ref="formItem"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="日程标题" prop="title">
          <Input v-model="formItem.title" placeholder="日程标题"></Input>
        </FormItem>
        <FormItem label="开始时间" prop="start">
          <Row>
            <Col span="11">
              <DatePicker type="date" placeholder="开始日期" v-model="formItem.dateStart"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker format="HH:mm" type="time" placeholder="开始时间" v-model="formItem.timetart"></TimePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="结束时间" prop="end">
          <Row>
            <Col span="11">
              <DatePicker type="date" placeholder="结束日期" v-model="formItem.dateEnd"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker format="HH:mm" type="time" placeholder="结束时间" v-model="formItem.timeEnd"></TimePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="持续天数" prop="during">
          <Input v-model="formItem.during" disabled type="number"></Input>
        </FormItem>

        <FormItem label="备注">
          <Input
            :maxlength="100"
            wrap="soft"
            :rows="2"
            v-model="formItem.memo"
            type="textarea"
            placeholder="日程备注,最多100字"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
          <Button @click="handleReset('formItem')" style="margin-left: 8px">关闭</Button>
        </FormItem>
      </Form>
    </Modal>

<button @click="showAddBox=true">show add box</button>
  </div>
</template>

<script>
import _ from "underscore";
import API from "@/api";

import CalendarAdd from './CalendarAdd.vue';

export default {
  components:{
    CalendarAdd
  },
  data() {
    return {
      showAddBox:false,
      formItem: {
        title: "",
        dateStart: "",
        timetart: "",
        dateEnd: "",
        timeEnd: "",
        during: 1,
        memo: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        start: [
          {
            required: true,
            message: "开始日期不能为空",
            trigger: "change"
          }
        ],
        end: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
      },
      formInline: {
        user: "",
        password: ""
      },
      t: {
        user: "aaaa",
        password: "bbbbb"
      },
      // themonthdaythingsnumber: [
      //   [0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0]
      // ],
      week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      trs: [
        [
          { rowspan: 4, colspan: 1, title: "" },
          { rowspan: 1, colspan: 1, title: "吃饭" },
          { rowspan: 4, colspan: 1, title: "" },
          { rowspan: 1, colspan: 3, title: "约会" },
          { rowspan: 1, colspan: 1, title: "开会" }
        ],
        [
          { rowspan: 1, colspan: 1, title: "睡觉" },
          { rowspan: 3, colspan: 1, title: "" },
          { rowspan: 1, colspan: 1, title: "早饭" },
          { rowspan: 3, colspan: 1, title: "" },
          { rowspan: 3, colspan: 1, title: "" }
        ],
        [
          { rowspan: 2, colspan: 1, title: "" },
          { rowspan: 1, colspan: 1, title: "午饭" }
        ],
        [{ rowspan: 1, colspan: 1, title: "晚饭" }]
      ],
      weekarr: [
        [
          {
            day: 26,
            schedule: []
          },
          {
            day: 27,
            schedule: [
              {
                title: "吃饭",
                type: "life"
              },
              {
                title: "晚锻炼",
                during: 4,
                type: "life"
              }
            ]
          },
          {
            day: 28,
            schedule: []
          },
          {
            day: 29,
            schedule: [
              {
                title: "约会",
                during: 3,
                type: "life"
              }
            ]
          },
          {
            day: 30,
            schedule: [
              {
                title: "午饭",
                type: "life"
              },
              {
                title: "看电影",
                type: "life"
              }
            ]
          },
          {
            day: 31,
            schedule: []
          },
          {
            day: 1,
            schedule: [
              {
                title: "开会",
                type: "work"
              }
            ]
          }
        ],
        [
          {
            day: 2,
            schedule: [
              {
                title: "吃饭",
                type: "life"
              }
            ]
          },
          {
            day: 3,
            schedule: []
          },
          {
            day: 4,
            schedule: []
          },
          {
            day: 5,
            schedule: [
              {
                title: "约会",
                during: 3,
                type: "life"
              }
            ]
          },
          {
            day: 6,
            schedule: [
              {
                title: "午饭",
                type: "life"
              }
            ]
          },
          {
            day: 7,
            schedule: []
          },
          {
            day: 8,
            schedule: []
          }
        ],
        [
          {
            day: 9,
            schedule: []
          },
          {
            day: 10,
            schedule: []
          },
          {
            day: 11,
            schedule: []
          },
          {
            day: 12,
            schedule: [
              {
                title: "约会",
                during: 3,
                type: "life"
              }
            ]
          },
          {
            day: 13,
            schedule: []
          },
          {
            day: 14,
            schedule: []
          },
          {
            day: 15,
            schedule: [
              {
                title: "开会",
                type: "work"
              }
            ]
          }
        ],
        [
          {
            day: 16,
            schedule: []
          },
          {
            day: 17,
            schedule: [
              {
                title: "晚锻炼",
                during: 4,
                type: "life"
              }
            ]
          },
          {
            day: 18,
            schedule: []
          },
          {
            day: 19,
            schedule: [
              {
                title: "约会",
                during: 3,
                type: "life"
              }
            ]
          },
          {
            day: 20,
            schedule: []
          },
          {
            day: 21,
            schedule: []
          },
          {
            day: 22,
            schedule: []
          }
        ],
        [
          {
            day: 23,
            schedule: []
          },
          {
            day: 24,
            schedule: [
              {
                title: "吃饭",
                type: "life"
              },
              {
                title: "晚锻炼",
                during: 4,
                type: "life"
              }
            ]
          },
          {
            day: 25,
            schedule: []
          },
          {
            day: 5,
            schedule: [
              {
                title: "约会",
                during: 3,
                type: "life"
              }
            ]
          },
          {
            day: 26,
            schedule: [
              {
                title: "午饭",
                type: "life"
              }
            ]
          },
          {
            day: 27,
            schedule: []
          },
          {
            day: 28,
            schedule: [
              {
                title: "开会",
                type: "work"
              }
            ]
          }
        ],
        [
          {
            day: 29,
            schedule: []
          },
          {
            day: 30,
            schedule: [
              {
                title: "吃饭",
                type: "life"
              },
              {
                title: "晚锻炼",
                during: 4,
                type: "life"
              }
            ]
          },
          {
            day: 1,
            schedule: []
          },
          {
            day: 2,
            schedule: [
              {
                title: "约会",
                during: 3,
                type: "life"
              }
            ]
          },
          {
            day: 3,
            schedule: [
              {
                title: "午饭",
                type: "life"
              }
            ]
          },
          {
            day: 4,
            schedule: []
          },
          {
            day: 5,
            schedule: [
              {
                title: "开会",
                type: "work"
              }
            ]
          }
        ]
      ]
      // workarr: []
    };
  },
  created() {
    // let a = API.calendarAPI.getMonthMsg();
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].resetFields(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    get() {
      this.formInline = { ...this.t };
    },
    set() {
      this.t = { ...this.formInline };
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    /*
     * weekarr 数据库中的数据
     * daythingsnumber 这周的事件数 数组
     * workarr 最后的工作数组
     */
    changeDbarrToWorkarr(weekarr, daythingsnumber, workarr, arrindex) {
      // 一天一天的填格子 没有rowspan
      // 1 给每一项补充occupation数组，表示被其他项占用的情况
      // 计算总tr数
      weekarr.forEach((item, index) => {
        if (!item.hasOwnProperty("occupation")) {
          item.occupation = [];
        }
        daythingsnumber[index] += item.schedule.length;
        // 遍历这个item的任务 看看有没有during属性
        item.schedule.forEach((JSON, index2) => {
          if (JSON.during && JSON.during > 1) {
            // 从这个日期的后一天开始 持续during天 在这期间 每天任务数+1
            for (let i = index + 1; i < index + JSON.during; i++) {
              daythingsnumber[i]++;
            }
          }
        });
      });
      // 获取一天最多x条任务
      var max = _.max(daythingsnumber);
      // 循环次数3 表格上最多显示3项任务
      var times = max > 3 ? 3 : max;
      // 2 按照每天 写最后的大数组
      for (let i = 0; i < times; i++) {
        workarr.push([]);
      }

      weekarr.forEach((item, index) => {
        // for (let i = 0; i < max; i++) {
        for (let i = 0; i < times; i++) {
          // 检查这项有没有被占用 如果没占用 弹栈
          if (_.indexOf(item.occupation, i) == -1) {
            let first = item.schedule.shift();
            if (first === undefined) {
              // 如果没有任务 直接加空的
              workarr[i].push({ colspan: 1, title: "" });
            } else {
              // 如果有任务 加宽度为during title为title的
              // schedule type为空的默认样式
              workarr[i].push({
                colspan: first.during || 1,
                title: first.title,
                type: first.type ? first.type : "schedule"
              });
              // 如果有during 在后面during天的occupation中 加入自己的行号 表示要占用这一行
              if (first.during && first.during != 1) {
                for (let j = index + 1; j < index + first.during; j++) {
                  weekarr[j].occupation.push(i);
                }
              }
            }
          }
        }
      });
      // this.workarr = trs;
      // return workarr;
    }
  },
  computed: {
    // workarr() {
    //   let weekarr = this.weekarr;
    //   let workarr = [[], [], [], [], [], []];
    //   let themonthdaythingsnumber = [
    //     [0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0]
    //   ];
    //   for (let i = 0; i < weekarr.length; i++) {
    //     this.changeDbarrToWorkarr(
    //       weekarr[i],
    //       themonthdaythingsnumber[i],
    //       workarr[i],
    //       i
    //     );
    //   }
    //   return workarr;
    // }
  }
};
</script>

<style lang="less" scoped>
.canlendar {
  position: relative;
  margin: 20px auto;
  width: 1000px;
  height: 860px;

  .bgBox {
    height: 860px;
    border: 1px solid #888;
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
        .schedule {
          div {
            color: #333;
            background: pink;
          }
        }
        .work {
          div {
            background: #333;
            color: #f1f1f1;
          }
        }
        .life {
          div {
            background: #abcdef;
            color: rgb(15, 14, 14);
          }
        }
      }
    }
  }
}
</style>
