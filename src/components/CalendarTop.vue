<template>
  <div id="CalendarTop">
    <div class="monthBox">
      <Button type="default" @click="tapPrevMonth">
        <Icon type="ios-arrow-back"/>上个月
      </Button>
      <p>{{nowshow.year}}-{{nowshow.month>10?nowshow.month:`0${nowshow.month}`}}</p>
      <Button type="default" @click="tapNextMonth">
        下个月
        <Icon type="ios-arrow-forward"/>
      </Button>
    </div>
    <div class="operateBox">
      <Button type="info" icon="md-add" @click="showAddBox=true">新增日程</Button>
    </div>

    <!-- 新增弹框 -->
    <Modal
      title="新增日程"
      draggable
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
          <Input v-model="formItem.title" placeholder="日程标题"></Input>
        </FormItem>
        <FormItem label="日程类型" prop="type">
          <Select v-model="formItem.type" placeholder="日程类型">
            <Option v-for="(val,key) in schedule_types" :key="key" :value="key">{{val}}</Option>
          </Select>
        </FormItem>
        <FormItem label="起止时间" prop="time">
          <DatePicker
            @on-change="getDuring"
            v-model="formItem.time"
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
          <Button @click="showAddBox=false" style="margin-left: 8px">关闭</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 新增弹框end -->
  </div>
</template>

<script>
import init from "@/libs/init.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("calendar");
import calendarAPI from "@/api/calendar";
export default {
  data() {
    return {
      // nowshow: {},
      schedule_types: init.schedule_types,
      showAddBox: false,
      optionsTime: {},
      formItem: {
        title: "",
        time: [],
        during: 0,
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
      }
    };
  },
  created() {
    this.initNowshow();
  },
  methods: {
    ...mapActions(["nextMonth", "prevMonth", "initNow"]),

    initNowshow() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let nowshow = {
        year,
        month
      };
      this.initNow(nowshow);
    },
    tapNextMonth() {
      //今年
      var y = this.year;
      //本月
      var m = this.month;
      //上一月所在的年
      var prevy = m == 1 ? y - 1 : y;
      //上一月
      var prevm = m == 1 ? 12 : m - 1;
      //下一月所在的年
      var nexty = m == 12 ? y + 1 : y;
      //下一月
      var nextm = m == 12 ? 1 : m + 1;
      let show = {
        year: nexty,
        month: nextm
      };
      this.nextMonth(show);
      this.$emit("restMonth");
    },
    tapPrevMonth() {
      //今年
      var y = this.year;
      //本月
      var m = this.month;
      //上一月所在的年
      var prevy = m == 1 ? y - 1 : y;
      //上一月
      var prevm = m == 1 ? 12 : m - 1;
      //下一月所在的年
      var nexty = m == 12 ? y + 1 : y;
      //下一月
      var nextm = m == 12 ? 1 : m + 1;
      let show = {
        year: prevy,
        month: prevm
      };
      this.prevMonth(show);
      this.$emit("restMonth");
    },
    // 新增
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
      console.log(name);
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
        title: this.formItem.title,
        during: this.formItem.during,
        type: this.formItem.type,
        memo: this.formItem.memo
      };
      let timeArr = this.formItem.time;
      // let star = new Date(timeArr[0].split(" ")[0]);
      // let end = new Date(timeArr[1].split(" ")[0]);
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
          calendarAPI.addSchedule(msg).then(res => {
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
              this.$emit("restMonth");
            }
          });
        } else {
          this.$Message.error("数据填写有误!");
        }
      });
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
#CalendarTop {
  height: 60px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-flow: row;
  align-items: center;

  .monthBox {
    flex: 1;
    // height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;

    p {
      padding: 0 20px;
      font-size: 16px;
    }
  }
  .operateBox {
  }
}
</style>
