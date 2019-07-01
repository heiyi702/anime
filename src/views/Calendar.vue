<template>
  <div>
    <CalendarTop @restMonth="restMonth"></CalendarTop>
    <CalendarMonth ref="month"></CalendarMonth>
  </div>
</template>

<script>
import CalendarTop from "../components/CalendarTop";
import CalendarMonth from "../components/CalendarMonth";
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("calendar");
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$refs.month.setCanlendar);
  },
  methods: {
    restMonth(){
      this.$refs.month.setCanlendar();
    },
    // tapNext() {
    //   this.$refs.month.setCanlendar();
    // },
    // tapPrev() {
    //   this.$refs.month.setCanlendar();
    // },
    // tapAdd(){
    //   this.$refs.month.setCanlendar();
    // }
  },
  components: {
    CalendarTop,
    CalendarMonth
  },
  computed: {
    // ...mapState({
    //   nowshow: state => state.nowshow,
    //   year: state => state.nowshow.year,
    //   month: state => state.nowshow.month
    // })
  }
};
</script>

<style lang="less" scoped>
</style>
