<template>
  <header class="header color-fff f15">
    <div class="header-left f18">
      <span>医疗保险运营系统</span>
    </div>
    <div class="header-right">
      <div class="header-right-item pointer">
        <Dropdown trigger="click">
          <span>
            {{ account }}
            <Icon type="arrow-down-b"></Icon>
          </span>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="signOut">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import cookieUtil from 'util/cookie';

export default {
  name: 'app-header',
  computed: {
    ...mapGetters(['account'])
  },
  methods: {
    signOut() {
      cookieUtil.delCookie('account');
      cookieUtil.delCookie('token');
      this.$router.push('/login');
    }
  }
};
</script>
