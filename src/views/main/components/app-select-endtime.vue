<template>
  <DatePicker type="date" v-model="formData.dateEnd" :options="dateEndDisabledDate()" class="w100" placeholder="请选择下单开始日期"></DatePicker>
</template>
<script>
export default {
  name: 'app-select-endtime', // 选择结束时间
  props: ['formData'],
  methods: {
    dateEndDisabledDate() {
      const _this = this;
      return {
        disabledDate(date) {
          return date && date.valueOf() < new Date(_this.formData.dateBegin);
        }
      };
    }
  }
};
</script>