<template>
  <div>
    <CalendarDayTop @restDay="getList"></CalendarDayTop>
    <ScheduleDay :list="list" @restDay="getList"></ScheduleDay>
  </div>
</template>

<script>
import CalendarDayTop from "../components/CalendarDayTop";
import ScheduleDay from "../components/ScheduleDay";
import calendarAPI from "@/api/calendar";
import { async } from "q";

export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      calendarAPI.getDay(this.showDay).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.data;
        }
      });
    }
  },
  computed: {
    showDay() {
      let day = this.$route.params.day;
      day = day.split("-");
      let yyyy = day[0];
      let MM = +day[1] < 10 ? "0" + day[1] : day[1];
      let dd = +day[2] < 10 ? "0" + day[2] : day[2];
      day = `${yyyy}-${MM}-${dd}`;
      return day;
    }
  },
  components: {
    CalendarDayTop,
    ScheduleDay
  }
};
</script>

<style lang="less" scoped>
</style>
