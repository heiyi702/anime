<template>
  <div id="calendarAdd">
    <Modal title="Title" v-model="modal10" class-name="vertical-center-modal">
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
            disabled
            type="textarea"
            placeholder="日程备注,最多100字"
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">关闭</Button>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        title: "",
        dateStart: "",
        timetart: "",
        dateEnd: "",
        timeEnd: "",
        during: "",
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
        dateStart: [
          {
            required: true,
            message: "开始日期不能为空",
            trigger: "change"
          }
        ],
        timetart: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
        timeEnd: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
        dateEnd: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
        during: [
          {
            required: true,
            message: "持续时间不能小于1",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
#calendarAdd {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(55, 55, 55, 0.6);
}
</style>
