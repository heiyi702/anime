<template>
  <div id="anmeSearchBox">
    <Form ref="animeSearch" :model="animeSearch" inline :label-width="120">
      <Row type="flex" align="middle" justify="space-around">
        <Col span="6">
          <FormItem label="名称" style="width:100%;">
            <Input v-model="animeSearch.title" placeholder="视频名称"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="连载状态" style="width:100%;">
            <Select v-model="animeSearch.playStatus" clearable style="width:100%">
              <Option value="on">连载中</Option>
              <Option value="off">完结</Option>
              <Option value="other">其他</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="是否看完" style="width:100%;">
            <Select v-model="animeSearch.lookOver" clearable style="width:100%;">
              <Option value="want">想看</Option>
              <Option value="now">正在看</Option>
              <Option value="over">看完</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="更新时间" clearable style="width:100%;">
            <Select v-model="animeSearch.changeDay" clearable style="width:100%">
              <Option value="1">周一</Option>
              <Option value="2">周二</Option>
              <Option value="3">周三</Option>
              <Option value="4">周四</Option>
              <Option value="5">周五</Option>
              <Option value="6">周六</Option>
              <Option value="7">周日</Option>
              <Option value="8">其他</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem :label-width="0" style="width:100%;text-align: center;margin-bottom: 0;">
            <Button class="searchBtn" size="large" type="primary" @click="search">搜索</Button>
            <Button
              class="searchBtn"
              @click="handleReset('animeSearch')"
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
const { mapState, mapActions } = createNamespacedHelpers("anime");

export default {
  data() {
    return {
      animeSearch: {
        title: "",
        playStatus: "",
        lookOver: "",
        changeDay: ""
      }
    };
  },
  methods: {
    ...mapActions(["RESET", "CHANGE"]),
    search() {
      this.CHANGE(this.animeSearch);
      this.$emit('tapSearch')
    },
    handleReset() {
      this.animeSearch = {
        title: "",
        playStatus: "",
        lookOver: "",
        changeDay: ""
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
  background: rgba(0, 0, 0, 0.2);
  .searchBtn {
    margin: 0 10px;
  }
}
</style>