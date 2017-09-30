<template>
  <div>
    <section class="query-wrap">
      <Row :gutter="16">
        <Col span="8">
        <Input v-model="formData.orderUser" placeholder="请输入投保人电话"></Input>
        </Col>
        <Col span="8">
        <app-select-product :formData.sync="formData"></app-select-product>
        </Col>
        <Col span="8">
        <app-select-hospital multiple :formData.sync="formData"></app-select-hospital>
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
        <app-select-orderstatus :formData.sync="formData"></app-select-orderstatus>
        </Col>
      </Row>
      <Row class="ui-ta-c">
        <Col push="10" span="4">
        <Button class="ui-mt-10" type="info" long @click="query(true)">查询</Button>
        </Col>
      </Row>
    </section>
    <div class="main-table" ref="mainTable">
      <section class="ui-p-r" :style="`height:${mainTableHeight}px`">
        <Table :columns="tableColumn" :height="mainTableHeight" :data="tableDataList"></Table>
        <Spin fix size="large" v-show="spinShow"></Spin>
      </section>
      <section class="ui-ta-c ui-mt-10">
        <Page @on-change="changePageData" v-show="tableDataList.length" :total="formData.totalItemNum" :page-size="formData.pageItemNum" :current="formData.pageIndex"></Page>
      </section>
    </div>
    <Modal v-model="orderDetailShow" :title="detailTitle">
      <detail-template-tk :data="orderDetailData"></detail-template-tk>
      <div slot="footer">
        <Button type="info" size="large" @click="orderDetailShow = false">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import dateUtil from 'util/dateTools';
import detailTemplateTK from './template/taikang-online-operation-accident-001.vue';
import appSelectStarttime from '../components/app-select-starttime';
import appSelectEndtime from '../components/app-select-endtime';
import appSelectProduct from '../components/app-select-product';
import appSelectOrderstatus from '../components/app-select-orderstatus';
import appSelectHospital from '../components/app-select-hospital';

export default {
  name: 'query',
  data() {
    return {
      formData: {
        orderUser: '', // 下单用户
        insuranceProductSysid: '', // 保险产品编号
        hospital: [], // 关联医院,分号隔开
        orderStatus: '', // 订单状态
        dateBegin: '', // 下单时间段
        dateEnd: '', // 下单时间段
        pageIndex: 1, // 分页查询的页码  从0开始计算
        totalItemNum: 0, // 总条数
        pageItemNum: 15 // 分页查询的单页数据条目数
      },
      // 表格数据
      tableColumn: [
        {
          title: '医院',
          key: 'hospitalName'
        },
        {
          title: '保险产品名称',
          key: 'insuranceName'
        },
        {
          title: '下单用户',
          key: 'user'
        },
        {
          title: '保单号',
          key: 'policyNo'
        },
        {
          title: '投保时间',
          key: 'orderDate'
        },
        {
          title: '订单状态',
          key: 'orderStatus',
          render: (h, params) => {
            const status = this.getOrderStatusData(params);
            return h('Tag', {
              props: {
                color: status.color
              },
              domProps: {
                innerHTML: status.text
              }
            });
          }
        },
        {
          title: '保单金额',
          key: 'orderAmount',
          width: '120',
          render: (h, params) => {
            return h('span', {
              domProps: {
                innerHTML: `&yen;${params.row.orderAmount / 100}元`
              }
            });
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          // fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showOrderdetail(params);
                  }
                }
              }, '详情')
            ]);
          }
        }
      ],
      tableDataList: [],
      orderDetailShow: false,
      orderDetailData: {},
      mainTableHeight: 0,
      spinShow: false,
      detailTitle: '订单详情'
    };
  },
  components: {
    detailTemplateTk: detailTemplateTK,
    appSelectStarttime,
    appSelectEndtime,
    appSelectProduct,
    appSelectOrderstatus,
    appSelectHospital
  },
  created() {
    this.query();
  },
  mounted() {
    // 32 为分页组件的高度
    this.mainTableHeight = this.$refs.mainTable.clientHeight - 44;
  },
  methods: {
    /**
     * 查询列表数据
     */
    query(flag) {
      if (flag) {
        this.formData.pageIndex = 1;
      }
      this.spinShow = true;
      this.$store.dispatch('getOrderList', {
        data: Object.assign({}, this.formData, {
          pageIndex: this.formData.pageIndex - 1,
          dateBegin: dateUtil.fmtDate(this.formData.dateBegin, 'yyyy-MM-dd'),
          dateEnd: dateUtil.fmtDate(this.formData.dateEnd, 'yyyy-MM-dd'),
          hospital: this.formData.hospital.join(';')
        }),
        success: (data) => {
          this.spinShow = false;
          if (data && data.retCode === 1000) {
            this.tableDataList = data.data.list;
            this.formData.totalItemNum = data.data.totalItemNum;
            // this.formData.pageIndex += 1;
          }
        },
        error: () => {
          this.spinShow = false;
        }
      });
    },
    showOrderdetail(params) {
      this.$store.dispatch('getOrderdetail', {
        data: {
          orderSysid: params.row.orderSysid, // 订单编号
          insuranceProductSysid: params.row.insuranceProductSysid // 保险产品编号
        },
        success: (res) => {
          if (res.data && Number(res.retCode) === 1000) {
            this.orderDetailData = Object.assign({}, res.data.commonData, res.data.insuranceProductData);
            this.detailTitle = `订单详情(${this.orderDetailData.purchaserName}, ${this.orderDetailData.purchaserPhone})`;
          }
          this.orderDetailShow = true;
        }
      });
    },
    changePageData(index) {
      this.formData.pageIndex = index;
      this.query();
    },
    getType(t) {
      const types = {
        1: '本人',
        2: '配偶',
        3: '父母',
        4: '子女'
      };
      return types[Number(t)];
    },
    getOrderStatusData(data) {
      const optObj = [
        {
          color: 'green',
          text: '待支付'
        },
        {
          color: 'blue',
          text: '已付款，未出单'
        },
        {
          color: 'default',
          text: '已取消'
        },
        {
          color: 'yellow',
          text: '已完成'
        }];
      return optObj[data.row.orderStatus];
    }
  }
};
</script> 
<style>
.main-table {
  flex: 1;
  overflow: auto;
}

.query-wrap {
  padding-bottom: 20px;
}

.tmp {
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  li {
    height: 24px;
    line-height: 24px;
    color: #666;
    ol {
      margin-top: 10px;
    }
  }
}
</style>
