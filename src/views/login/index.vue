<template>
  <div class="login f16">
    <div class="login-box">
      <dt class="f18">
        <Icon type="xbox" size="50" color="#3D9FF3"></Icon>
          <span class="user-title">医疗保险平台运营系统 V1.0</span>
      </dt>
      <ul>
        <li>
          <span>
            <Icon type="android-contact" size="20" color="#ccc"></Icon>
          </span>
          <input @keyup.enter="login" class="user-name" type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号">
        </li>
        <li>
          <span>
            <Icon type="ios-locked-outline" size="20" color="#ccc"></Icon>
          </span>
          <input @keyup.enter="login" class="user-name" type="text" maxlength="6" v-model="code" placeholder="请输入短信验证码">
          <button class="btn" :class="{'disabled': disabled}" @click="sendSmsCode()">{{ smsCodeText || '获取短信验证码' }}</button>
        </li>
      </ul>
      <dd class="ui-ta-c ui-mt-20">
        <button class="btn" @click="login">登录</button>
      </dd>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      link: window.decodeURIComponent(this.$route.query.link) || '',
      disabled: false,
      smsCodeText: '',
      mobile: '',
      code: ''
    };
  },
  methods: {
    sendSmsCode() {
      if (this.disabled || !this.validator(true)) {
        return;
      }
      this.$store.dispatch('sendsms', {
        data: {
          user: this.mobile
        },
        success: (data) => {
          if (data && data.retCode === 1000) {
            this.countDown();
          } else {
            this.$Message.warning(data.retMessage);
          }
        }
      });
    },
    countDown() {
      let count = 180;
      this.disabled = true;
      this.smsCodeText = `${count}秒`;
      const timer = window.setInterval(() => {
        count -= 1;
        this.smsCodeText = `${count}秒`;
        if (count <= 0) {
          this.disabled = false;
          this.smsCodeText = '';
          window.clearInterval(timer);
        }
      }, 1000);
    },
    login() {
      if (!this.validator()) {
        return;
      }
      this.$store.dispatch('login', {
        data: {
          user: this.mobile,
          verifyCode: this.code
        },
        success: (data) => {
          if (data && data.retCode === 1000) {
            this.$router.push('/main/query');
          } else {
            this.$Message.warning(data.retMessage);
          }
        }
      });
    },
    validator(sms) {
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.$Message.warning('手机号格式不正确');
        return false;
      }
      if (!sms && !/^\d{6}$/.test(this.code)) {
        this.$Message.warning('验证码格式不正确');
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #b3b9c6;
  &-box {
    position: relative;
    top: 50%;
    left: 50%;
    width: 500px;
    background: #fff;
    box-shadow: -7px 7px 14px 2px #748188;
    padding: 20px 40px 50px;
    transform: translate(-50%, -50%);
    li {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 2px 0px #888889 inset;
      border-radius: 3px;
      overflow: hidden;
      & > span {
        flex-basis: 34px;
        text-align: center;
      }
      input {
        flex: 1;
        height: 50px;
        color: #999;
        display: inline-block;
      }
      .btn {
        margin-right: 5px;
        border-radius: 5px;
        &.disabled {
          background: #999;
        }
      }
    }
  }
}
.user-title {
  color: #6C93A9;
  float: right;
  line-height: 50px;
}

.btn {
  width: 156px;
  height: 39px;
  background: #0684B0;
  color: #fff;
  font-size: 16px;
}
</style>
