<template>
  <main class="container f14">
    <app-header/>
    <div class="content">
      <app-slider/>
      <main class="content-right">
        <router-view class="content-right-main"></router-view>
        <app-copyright/>
      </main>
    </div>
  </main>
</template>
<script>
import appHeader from './components/app-header';
import appSlider from './components/app-slider';
import appCopyright from './components/app-copyright';

export default {
  name: 'app-container',
  components: {
    appHeader,
    appSlider,
    appCopyright
  }
};
</script>  
