<template>
  <div id="ScheduleDay">
    <!-- 表格 -->
    <Table :columns="columns" :data="showList" disabled-hover stripe>
      <template slot-scope="{ row, index }" slot="type">
        <div class="typeBox schedule">
          <div :class="['schedule',row.type]"></div>
          <span>{{schedule_types[row.type]}}</span>
        </div>
      </template>

      <template slot-scope="{ row, index }" slot="time">
        <span>{{row.time[0]}} ~ {{row.time[1]}}</span>
      </template>

      <template slot-scope="{ row, index }" slot="during">
        <span>{{row.during}}天</span>
      </template>

      <template slot-scope="{ row, index }" slot="title">
        <span class="title">{{row.title}}</span>
      </template>

      <template slot-scope="{ row, index }" slot="memo">
        <span class="memo">{{row.memo}}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div>
          <Button size="small" class="look" @click="look(row,index)">查看</Button>
          <Button size="small" class="edit" type="primary" @click="edit(row,index)">修改</Button>
          <Button size="small" class="del" type="warning" @click="del(row,index)">删除</Button>
        </div>
      </template>
    </Table>
    <!-- 表格end -->

    <!-- 弹窗 -->
    <Modal
      :title="isDisabled?'查看详情':'修改日程'"
      v-model="showAddBox"
      footer-hide
      class-name="vertical-center-modal"
    >
      <Form
        class="calendarAddForm"
        :model="formItem"
        ref="formItem"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="日程标题" prop="title">
          <Input v-model="formItem.title" placeholder="日程标题" :disabled="isDisabled"></Input>
        </FormItem>
        <FormItem label="日程类型" prop="type">
          <Select v-model="formItem.type" placeholder="日程类型" :disabled="isDisabled">
            <Option
              v-for="(val,key) in schedule_types"
              :key="key"
              :value="key"
              :disabled="isDisabled"
            >{{val}}</Option>
          </Select>
        </FormItem>
        <FormItem label="起止时间" prop="time">
          <DatePicker
            :disabled="isDisabled"
            v-model="formItem.timeVal"
            value="yyyy-MM-dd HH:mm:ss"
            :options="optionsTime"
            type="datetimerange"
            format="yyyy/MM/dd HH:mm"
            placeholder="日程起止日期与时间,最多20天"
            style="width: 100%;"
          ></DatePicker>
        </FormItem>
        <FormItem label="持续天数" prop="during">
          <Input v-model="formItem.during" disabled type="number"></Input>
        </FormItem>

        <FormItem label="备注">
          <Input
            :disabled="isDisabled"
            :maxlength="100"
            wrap="soft"
            :rows="2"
            v-model="formItem.memo"
            type="textarea"
            placeholder="日程备注,最多100字"
          ></Input>
        </FormItem>
        <FormItem>
          <Button :disabled="isDisabled" type="primary" @click="handleSubmit('formItem')">保存</Button>
          <Button @click="showAddBox=false" style="margin-left: 8px">关闭</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 弹窗end -->

    <!-- 删除提示 -->
    <Modal v-model="showDelBox" @on-ok="delOk" @on-cancel="delId=''">
      <p>确定要删除这条任务嘛？</p>
    </Modal>
    <!-- 删除提示end -->
  </div>
</template>



<script>
import init from "@/libs/init.js";
import calendarAPI from "@/api/calendar";
import { async } from "q";

export default {
  props: ["list"],
  data() {
    return {
      delId: "",
      schedule_types: init.schedule_types,
      showDelBox: false,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "类型",
          slot: "type",
          width: 180,
          align: "center"
        },
        {
          title: "起止时间",
          slot: "time",
          width: 280,
          align: "center"
        },
        {
          title: "持续天数",
          slot: "during",
          width: 100,
          align: "center"
        },
        {
          title: "名称",
          slot: "title",
          width: 500,
          align: "center"
        },
        {
          title: "备注",
          slot: "memo",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      // list: [],
      showAddBox: false,
      isDisabled: true,
      optionsTime: {},
      formItem: {
        title: "",
        time: [],
        during: 1,
        memo: "",
        type: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "类型不能为空",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: "起止时间不能为空",
            trigger: "change",
            type: "array"
          }
        ]
      },

      title: "",
      time: [],
      during: 1,
      memo: "",
      type: ""
    };
  },
  created() {},
  methods: {
    look(row, index) {
      this.formItem = { ...row };
      this.showAddBox = true;
      this.isDisabled = true;
    },
    edit(row, index) {
      this.formItem = { ...row };
      console.log(this.formItem);
      this.showAddBox = true;
      this.isDisabled = false;
    },
    del(row, index) {
      this.showDelBox = true;
      this.delId = row.id;
    },
    delOk() {
      let delId = this.delId;
      calendarAPI.delSchedule(delId).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$emit("restDay");
          this.$Message.success("Success!");
        } else {
          this.$Message.error("数据填写有误!");
        }
      });
    },

    getDuring(date) {
      // 计算持续天数
      let during = 0;
      let star = new Date(date[0].split(" ")[0]);
      let end = new Date(date[1].split(" ")[0]);
      if (!date[0].split(" ")[0] || !date[1].split(" ")[0]) {
        this.formItem.during = during;
        return;
      }
      let day = 24 * 60 * 60 * 1000;
      // (end-star)/day
      during = Math.floor((end - star) / day) + 1;
      this.formItem.during = during;
    },
    handleSubmit(name) {
      let flag = true;
      if (this.formItem.during == 0) {
        flag = false;
        this.$Message.error("请填写正确的起止时间!");
        return;
      }
      if (this.formItem.during > 20) {
        flag = false;
        this.$Message.error("日程最多持续20天!");
        return;
      }
      let msg = {
        id: this.formItem.id,
        title: this.formItem.title,
        during: this.formItem.during,
        type: this.formItem.type,
        memo: this.formItem.memo
      };
      let timeArr = this.formItem.timeVal;
      let start = new Date(timeArr[0]);
      let end = new Date(timeArr[1]);

      let dateJson1 = {
        yyyy: start.getFullYear(),
        MM: start.getMonth() + 1,
        dd: start.getDate(),
        HH: start.getHours(),
        mm: start.getMinutes()
      };
      let dateJson2 = {
        yyyy: end.getFullYear(),
        MM: end.getMonth() + 1,
        dd: end.getDate(),
        HH: end.getHours(),
        mm: end.getMinutes()
      };
      msg.date = dateJson1.dd;
      msg.date2 = dateJson2.dd;

      msg.year = dateJson1.yyyy;
      msg.month = dateJson1.MM;

      msg.year2 = dateJson2.yyyy;
      msg.month2 = dateJson2.MM;

      msg.hour = dateJson1.HH;
      msg.hour2 = dateJson2.HH;

      msg.minutes = dateJson1.mm;
      msg.minutes2 = dateJson2.mm;
      this.$refs[name].validate(valid => {
        if (valid && flag) {
          calendarAPI.changeSchedule(msg).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$Message.success("Success!");
              this.formItem = {
                title: "",
                time: [],
                during: 0,
                memo: "",
                type: ""
              };
              this.showAddBox = false;
              this.$emit("restDay");
            } else {
              this.$Message.error(res.data.data);
            }
          });
        } else {
          this.$Message.error("数据填写有误!");
        }
      });
    }
  },
  computed: {
    showList() {
      let list = this.list;
      let showList = [];
      if (!list) {
        return showList;
      }
      for (let i = 0; i < list.length; i++) {
        let time = [];
        showList[i] = {};
        showList[i].id = list[i]._id;
        showList[i].type = list[i].type;
        showList[i].title = list[i].title;
        showList[i].memo = list[i].memo;
        showList[i].during = list[i].during;

        let yyyy1 = `${list[i].year}`;
        let MM1 = +list[i].month < 10 ? "0" + list[i].month : list[i].month;
        let dd1 = +list[i].date < 10 ? "0" + list[i].date : list[i].date;

        let yyyy2 = `${list[i].year2}`;
        let MM2 = +list[i].month2 < 10 ? "0" + list[i].month2 : list[i].month2;
        let dd2 = +list[i].date2 < 10 ? "0" + list[i].date2 : list[i].date2;

        let HH1 = +list[i].hour < 10 ? "0" + list[i].hour : list[i].hour;
        let HH2 = +list[i].hour2 < 10 ? "0" + list[i].hour2 : list[i].hour2;

        let mm1 =
          +list[i].minutes < 10 ? "0" + list[i].minutes : list[i].minutes;
        let mm2 =
          +list[i].minutes2 < 10 ? "0" + list[i].minutes2 : list[i].minutes2;

        time[0] = `${yyyy1}-${MM1}-${dd1} ${HH1}:${mm1}`;
        time[1] = `${yyyy2}-${MM2}-${dd2} ${HH2}:${mm2}`;

        showList[i].sort = new Date(time[0]).getTime();
        // time[0] = `${list[i].year}-${list[i].month}-${list[i].date}`;
        // time[1] = `${list[i].year2}-${list[i].month2}-${list[i].date2}`;

        let timeVal = [new Date(time[0]), new Date(time[1])];
        showList[i].time = time;
        showList[i].timeVal = timeVal;
      }
      showList.sort(function(a, b) {
        return a.sort - b.sort;
      });
      return showList;
    }
  }
};
</script>
<style lang="less" scoped>
#ScheduleDay {
  .typeBox {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    .schedule {
      margin-right: 5px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
    }
  }

  .memo,
  .title {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .look {
    margin-right: 5px;
  }

  .edit {
    margin: 0 5px;
  }

  .schedule.life {
    background: -webkit-linear-gradient(
      top,
      rgba(174, 213, 129, 0.49),
      rgba(76, 175, 80, 0.54)
    );
  }
  .schedule.warning {
    background: -webkit-linear-gradient(top, darkred, red);
    color: white;
  }
  .schedule.work {
    background: -webkit-linear-gradient(
      top,
      rgba(255, 215, 0, 0.32),
      rgba(255, 165, 0, 0.61)
    );
  }
  .schedule.important {
    background: -webkit-linear-gradient(
      top,
      rgba(135, 206, 235, 0.38),
      rgba(33, 150, 243, 0.7)
    );
  }
}
</style>

