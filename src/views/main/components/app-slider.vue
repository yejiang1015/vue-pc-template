<template>
  <aside class="content-left" :style="spanLeftStyle">
    <ul>
      <li @click="changeWidth" class="color-fff f24 ui-ta-c">
        <Icon type="navicon"></Icon>
      </li>
      <router-link v-for="item in data" :key="item.id" class="navitem" :to="item.path" activeClass="navitem-act" tag="li">
        <Icon :type="item.icon" class="f20"></Icon>
        <span class="ui-ml-10">{{ item.name }}</span>
      </router-link>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'app-slider',
  data() {
    return {
      spanLeftStyle: '',
      data: [
        {
          icon: 'ios-navigate',
          name: '订单查询',
          path: '/main/query'
        },
        {
          icon: 'ios-analytics',
          name: '订单统计',
          path: '/main/statistics'
        }
      ]
    };
  },
  methods: {
    changeWidth() {
      this.spanLeftStyle = this.spanLeftStyle === 'width: 50px' ? 'width: 180px' : 'width: 50px';
    }
  }
};
</script>
