<template>
  <DatePicker type="date" v-model="formData.dateBegin" @on-change="startDateChange" class="w100" placeholder="请选择下单开始日期"></DatePicker>
</template>
<script>
export default {
  name: 'app-select-starttime', // 选择开始时间
  props: ['formData'],
  methods: {
    startDateChange(val) {
      if (new Date(val) > this.formData.dateEnd) {
        this.formData.dateEnd = '';
      }
    }
  }
};
</script>