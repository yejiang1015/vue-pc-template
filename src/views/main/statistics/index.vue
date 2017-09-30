<template>
  <div>
    <section class="query-wrap">
      <Row :gutter="16">
        <Col span="8">
          <app-select-product :formData.sync="formData"></app-select-product>
        </Col>
        <Col span="8">
          <app-select-hospital :formData.sync="formData"></app-select-hospital>
        </Col>
        <Col span="8">
          <app-select-orderstatus :formData.sync="formData"></app-select-orderstatus>
        </Col>
      </Row>
      <Row :gutter="16" class="ui-mt-10">
        <Col span="8">
          <app-select-starttime :formData.sync="formData"></app-select-starttime>
        </Col>
        <Col span="8">
          <app-select-endtime :formData.sync="formData"></app-select-endtime>
        </Col>
        <Col span="8">
          <!-- <Select v-model="formData.grading" class="w100" placeholder="请选择统计粒度">
            <Option v-for="item in statisticsGradingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
        </Col>
      </Row>
      <Row class="ui-ta-c">
        <Col push="10" span="4">
        <Button class="ui-mt-10" type="info" long @click="query">查询</Button>
        </Col>
      </Row>
    </section>
    <section class="app-charts">
      <ve-histogram v-if="veHistogramData.rows.length" :data="veHistogramData" :settings="veHistogramDataSettings"></ve-histogram>
      <p v-else class="w100 ui-ta-c">暂无数据</p>
    </section>
  </div>
</template>
<script>
import dateUtil from 'util/dateTools';
import veHistogram from 'v-charts/lib/histogram';
import appSelectStarttime from '../components/app-select-starttime';
import appSelectEndtime from '../components/app-select-endtime';
import appSelectProduct from '../components/app-select-product';
import appSelectOrderstatus from '../components/app-select-orderstatus';
import appSelectHospital from '../components/app-select-hospital';

export default {
  name: 'statistics',
  data() {
    return {
      formData: {
        insuranceProductSysid: '', // 保险产品编号
        hospital: '', // 关联医院,分号隔开
        orderStatus: '', // 订单状态
        dateBegin: '', // 下单时间段
        dateEnd: '', // 下单时间段
        grading: '0' // 统计粒度。0,天；1，周；2，月
      },
      // 统计粒度
      statisticsGradingList: [
        {
          value: '0',
          label: '天'
        },
        {
          value: '1',
          label: '周'
        },
        {
          value: '2',
          label: '月'
        }
      ],
      veHistogramData: {
        columns: ['日期', '订单量', '总额度'],
        rows: []
      },
      veHistogramDataSettings: {
        dimension: ['日期'],
        metrics: ['订单量', '总额度'],
        axisSite: {
          right: ['总额度']
        },
        yAxisType: ['value', 'value'],
        yAxisName: ['订单量', '总额度（元）'],
        area: true,
        stack: {
          '销售额': ['销售额-1季度', '销售额-2季度']
        }
      }
    };
  },
  components: {
    veHistogram,
    appSelectStarttime,
    appSelectEndtime,
    appSelectProduct,
    appSelectOrderstatus,
    appSelectHospital
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.$store.dispatch('getOrderStatisticsList', {
        data: {
          productSysId: this.formData.insuranceProductSysid, // 产品ID
          hospitalCode: this.formData.hospital, // 医院代码
          orderStatus: this.formData.orderStatus, // 订单状态
          beginDate: dateUtil.fmtDate(this.formData.dateBegin, 'yyyy-MM-dd hh:mm:ss'),
          endDate: dateUtil.fmtDate(this.formData.dateEnd, 'yyyy-MM-dd hh:mm:ss'),
          grading: this.formData.grading // 统计粒度。0,天；1，周；2，月
        },
        success: (data) => {
          if (data && data.retCode === 0) {
            const result = data.data;
            const tableData = [];
            if (result && result.length) {
              result.forEach((item) => {
                tableData.push({
                  '日期': dateUtil.fmtDate(new Date(item.orderDate), 'yyyy-MM-dd'),
                  '订单量': Number(item.orderNum),
                  '总额度': Number(item.amount / 100)
                });
              });
            }
            this.veHistogramData.rows = tableData;
          }
        }
      });
    }
  }
};
</script>