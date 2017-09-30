<template>
  <Select v-model="hospitalActList" :multiple="multiple" clearable placeholder="请选择医院">
    <Option v-for="item in hospitalList" :value="item.hospitalCode" :key="item.hospitalCode" :label="item.hospitalName">{{ item.hospitalName }}</Option>
  </Select>
</template>
<script>
export default {
  name: 'app-select-hospital', // 选择订单/保单状态
  data() {
    return {
      hospitalList: [],
      hospitalActList: []
    };
  },
  props: ['formData', 'multiple'],
  watch: {
    hospitalActList(val) {
      this.formData.hospital = val;
    }
  },
  created() {
    this.$store.dispatch('getHospitalList', {
      success: (data) => {
        if (data && data.retCode === 1000) {
          this.hospitalList = data.data;
        }
      }
    });
  },
  methods: {}
};
</script>