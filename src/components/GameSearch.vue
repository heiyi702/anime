<template>
  <div id="anmeSearchBox">
    <Form ref="gemeSearch" :model="gemeSearch" inline :label-width="120">
      <Row type="flex" align="middle" justify="space-around">
        <Col span="8">
          <FormItem label="名称" style="width:100%;">
            <Input v-model="gemeSearch.title" placeholder="游戏名称"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="游戏状态" style="width:100%;">
            <Select v-model="gemeSearch.playStatus" clearable style="width:100%;">
              <Option value="want">想玩</Option>
              <Option value="now">正在玩</Option>
              <Option value="over">玩完</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label-width="0" style="width:100%;text-align: center;">
            <Button class="searchBtn" size="large" type="primary" @click="search">搜索</Button>
            <Button
              class="searchBtn"
              @click="handleReset('gemeSearch')"
              size="large"
              type="default"
            >重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("game");

export default {
  data() {
    return {
      gemeSearch: {
        title: "",
        playStatus: ""
      }
    };
  },
  methods: {
    ...mapActions(["RESET", "CHANGE"]),
    search() {
      this.CHANGE(this.gemeSearch);
      this.$emit('tapSearch')
    },
    handleReset() {
      this.gemeSearch = {
        title: "",
        playStatus: ""
      };
      this.RESET();
    }
  }
};
</script>

<style lang="less" scoped>
#anmeSearchBox {
  margin: 10px 15px;
  padding: 20px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(0,0,0,.2);
  .searchBtn {
    margin: 0 10px;
  }
}
</style>