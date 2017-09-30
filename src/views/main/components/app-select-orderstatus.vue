<template>
  <Select v-model="formData.orderStatus" clearable class="w100" placeholder="请选择订单状态">
    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>
<script>
export default {
  name: 'app-select-orderstatus', // 选择订单/保单状态
  data() {
    return {
      statusList: [
        {
          value: '2',
          label: '已取消'
        },
        {
          value: '1',
          label: '已付款，未出单'
        },
        {
          value: '3',
          label: '已完成'
        },
        {
          value: '0',
          label: '待支付'
        }
      ]
    };
  },
  props: ['formData'],
  methods: {}
};
</script>