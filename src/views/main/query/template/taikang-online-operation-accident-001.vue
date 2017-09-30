<template>
  <div class="box">
    <dl>
      <dt>订单信息</dt>
      <dd>订单系统编号：{{ data.orderSysid }}</dd>
      <dd>订单状态：{{ getOrderStatusTyps(data.orderStatus) }}</dd>
      <dd>保险产品ID：{{ data.insuranceProductSysid }}</dd>
      <dd>保险产品名称：{{ data.insuranceName }}</dd>
      <dd>订单金额：&yen;{{ (Number(data.orderAmount) / 100).toFixed(2) }}元</dd>
      <dd>订单下单日期：{{ data.orderDate }}</dd>
    </dl>
    <dl>
      <dt>投保人信息</dt>
      <dd>投保人手机号：{{ data.purchaserPhone }}</dd>
      <dd>投保人姓名：{{ data.purchaserName }}</dd>
      <dd>投保人身份证：{{ data.purchaserId }}</dd>
      <dd>投保人邮箱：{{ data.purchaserEmail }}</dd>
    </dl>
    <dl>
      <dt>被保人信息</dt>
      <dd>被保人姓名：{{ data.insuredName }}</dd>
      <dd>被保人身份证：{{ data.insuredId }}</dd>
      <dd>被保人是投保人的：{{ getType(data.relation) }}</dd>
    </dl>
    <dl>
      <dt>保单信息</dt>
      <dd>保单系统号：{{ data.policySysid }}</dd>
      <dd>保单号：{{ data.policyNo }}</dd>
      <dd>保额：&yen;{{ data.insuranceCoverage }}元</dd>
      <dd>保单日期：{{ data.policyDate }}</dd>
      <dd>保单开始日期：{{ data.insuranceBeginDate }}</dd>
      <dd>保单结束日期：{{ data.insuranceEndDate }}</dd>
    </dl>
    <dl>
      <dt>医院信息</dt>
      <dd>医院名称：{{ data.hospitalName }}</dd>
      <dd>医院编码：{{ data.hospitalCode }}</dd>
      <dd>科室名称：{{ data.departmentName }}</dd>
      <dd>科室编码：{{ data.departmentCode }}</dd>
      <dd>手术名称：{{ data.operationName }}</dd>
      <dd>手术日期：{{ data.operationDate }}</dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'detail-tk',
  props: ['data'],
  methods: {
    getOrderStatusTyps(t) {
      // 订单状态，订单待支付 = 0；订单已支付，保单生成中 = 1；订单已取消 = 2；订单已完成 = 3;
      const types = {
        0: '订单待支付',
        1: '订单已支付，保单生成中',
        2: '订单已取消',
        3: '订单已完成'
      };
      return types[Number(t)];
    },
    getType(t) {
      const types = {
        1: '本人',
        2: '配偶',
        3: '父母',
        4: '子女'
      };
      return types[Number(t)];
    }
  }
};
</script>
<style scoped>
.box {
  max-height: 50vh;
  overflow: auto;
}

dl {
  margin: 10px 0;
  dt {
    padding: 5px;
    background: #ddd;
  }
  dd {
    margin: 8px 0;
  }
}
</style>
