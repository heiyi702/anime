<template>
  <div class="canlendar">
    <div class="row"></div>
    <div class="row">
      <table border="0" cellspacing="0" cellpadding="0">
        <!-- 显示日期 -->
        <thead>
          <tr>
            <!-- 周日 -->
            <th>2</th>
            <!-- 周一 -->
            <th>3</th>
            <!-- 周二 -->
            <th>4</th>
            <!-- 周三 -->
            <th>5</th>
            <!-- 周四 -->
            <th>6</th>
            <!-- 周五 -->
            <th>7</th>
            <!-- 周六 -->
            <th>8</th>
          </tr>
        </thead>
        <!-- 日程 按照本周最多的那天算 他有几个日程 就有几个tr -->
        <!-- 每行tr中的 td算上 之前tr中的rowspan过继的 等于 7 -->
        <tbody>
          <tr v-for="(tr,index) in workarr" :key="index">
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
    <div class="row"></div>
    <div class="row"></div>
    <div class="row"></div>
  </div>
</template>

<script>
import _ from 'underscore';

export default {
  data() {
    return {
      trs2: [],
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
        {
          day: 2,
          schedule: []
        },
        {
          day: 3,
          schedule: [
            {
              title: "吃饭",
              type: "life"
            },
            {
              title: "睡觉",
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
              title: "早饭",
              type: "life"
            },
            {
              title: "午饭",
              type: "life"
            },
            {
              title: "晚饭"
            }
          ]
        },
        {
          day: 7,
          schedule: []
        },
        {
          day: 8,
          schedule: [
            {
              title: "开会",
              type: "work"
            }
          ]
        }
      ],
      workarr: []
    };
  },
  created(){
this.changeDbarrToWorkarr(this.weekarr)
  },
  methods: {
    changeDbarrToWorkarr(weekarr) {
      // 一天一天的填格子 没有rowspan

      // 1 给每一项补充occupation数组，表示被其他项占用的情况

      var daythingsnumber = [0, 0, 0, 0, 0, 0, 0];

      // 计算总tr数
      weekarr.forEach((item, index) => {
        item.occupation = [];
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

      // 2 按照每天 写最后的大数组
      var trs = (function() {
        // 填充给trs max个的空数组 备用
        var _trs = [];
        for (let i = 0; i < max; i++) {
          _trs.push([]);
        }
        return _trs;
      })();

      weekarr.forEach((item, index) => {
        for (let i = 0; i < max; i++) {
          // 检查这项有没有被占用 如果没占用 弹栈
          if (_.indexOf(item.occupation, i) == -1) {
            let first = item.schedule.shift();
            if (first === undefined) {
              // 如果没有任务 直接加空的
              trs[i].push({ colspan: 1, title: "" });
            } else {
              // 如果有任务 加宽度为during title为title的
              // schedule type为空的默认样式
              trs[i].push({
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
      this.workarr = trs;
      // return trs;
    }
  }
};
</script>

<style lang="less" scoped>
.canlendar {
  margin: 20px auto;
  width: 800px;
  min-height: 600px;
  border: 1px solid #888;
}
.row {
  min-height: 120px;
  border-bottom: 1px solid #888;
  box-sizing: border-box;

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    tr {
      height: 30px;
      th,
      td {
        width: 14.2857%;
        // background: #abcdef;
        // min-height: 20px;
        // line-height: 20px;
        // border: 1px solid #eee;
      }

      .schedule,
      .work,
      .life {
        padding: 2px;
        div {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          font-size: 14px;
        }
      }
      .schedule {
        // padding: 2px;
        div {
          color: #333;
          background: pink;
          // height: 100%;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // border-radius: 4px;
          // font-size: 14px;
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
</style>
