<template>
  <div>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
require('assets/css/style.css');
export default {
  name: 'App',
  created() {
    this.$store.dispatch('checkLogin', {
      success: (data) => {
        if (data.retCode === 1000) {
          this.$router.push('/main/query');
        }
      }
    });
  }
};
</script>