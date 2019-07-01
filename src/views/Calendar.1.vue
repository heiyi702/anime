<template>
  <div>
    <CalendarTop></CalendarTop>
    <CalendarMonth></CalendarMonth>
  </div>
</template>

<script>
import CalendarTop from '../components/CalendarTop'
import CalendarMonth from '../components/CalendarMonth'
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("calendar");
export default {
  data() {
    return {};
  },
  methods: {


  },
  components:{
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
