<template>
  <div id="animeTopBox">
    <h2 class="animeTitle">游戏——{{conTitle}}</h2>
    <Button @click="tapAdd" icon="md-add" type="info">新增</Button>
  </div>
</template>

<script>
export default {
  props:['conTitle'],
  data() {
    return {};
  },
  methods: {
    tapAdd() {
      this.$router.push({name:'GameAdd'})
    }
  }
};
</script>

<style lang="less" scoped>
#animeTopBox {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .animeTitle {
    flex: 1;
    text-align: center;
  }
}
</style>