<template>
  <Select v-model="formData.insuranceProductSysid" clearable class="w100" placeholder="请选择保险产品">
    <Option v-for="item in productSysList" :value="item.insuranceProductSysid" :key="item.id">{{ item.insuranceName }}</Option>
  </Select>
</template>
<script>
export default {
  name: 'app-select-product', // 选择保险产品
  data() {
    return {
      productSysList: []
    };
  },
  props: ['formData'],
  created() {
    this.$store.dispatch('getInsuranceProductSysList', {
      success: (res) => {
        if (res.data && res.retCode === 0) {
          this.productSysList = res.data;
        } else {
          this.productSysList = [];
        }
      }
    });
  },
  methods: {}
};
</script>