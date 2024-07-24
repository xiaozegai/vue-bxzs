<template>
  <div class="view-container">
    <div class="fixed m-10 z-50">
      <div class="flex space-x-2">
        <img
          class="w-8 rounded-full"
          src="../../assets/favicon.png"
          alt="logo"
        />
      </div>
    </div>
    <div
      class="bg-white dark:bg-gray-900 min-h-screen w-full flex justify-center"
    >
      <div class="w-full sm:max-w-lg px-4 min-h-screen flex flex-col">
        <div class="my-auto pb-10 w-full">
          <form
            class="flex flex-col justify-center bg-white py-6 sm:py-16 px-6 sm:px-16 rounded-2xl"
          >
            <div class="text-xl sm:text-2xl font-bold">
              {{ titleText }}
              <div class="logo"></div>
            </div>
            <div class="mt-1 text-xs font-medium text-gray-500">
              ⓘ NCU xxx
              不进行任何外部连接，您的数据安全地存储在您的本地服务器上。
            </div>
            <div class="flex flex-col mt-4">
              <template v-if="toggleType === 2">
                <div class="text-sm font-semibold text-left mb-1">名称</div>
                <input
                  type="text"
                  class="border px-4 py-2.5 rounded-2xl w-full text-sm"
                  autocomplete="nickname"
                  placeholder="输入您的全名"
                  required=""
                  v-model="form.nickname"
                />
                <hr class="my-3" />
              </template>
              <div class="mb-2">
                <div class="text-sm font-semibold text-left mb-1">电子邮件</div>
                <input
                  type="email"
                  class="border px-4 py-2.5 rounded-2xl w-full text-sm"
                  autocomplete="account"
                  placeholder="输入您的电子邮件"
                  required=""
                  v-model="form.account"
                />
              </div>
              <div>
                <div class="text-sm font-semibold text-left mb-1">密码</div>
                <input
                  type="password"
                  class="border px-4 py-2.5 rounded-2xl w-full text-sm"
                  placeholder="输入您的密码"
                  autocomplete="password"
                  required=""
                  v-model="form.password"
                />
              </div>
            </div>
            <div class="mt-5">
              <button
                class="bg-gray-900 hover:bg-gray-800 w-full rounded-full text-white font-semibold text-sm py-3 transition"
                type="submit"
                @click.prevent="handleSubmit"
              >
                {{ sumbitText }}
              </button>
              <div class="mt-4 text-sm text-center">
                {{ toggleText1 }}
                <button
                  class="font-medium underline"
                  type="button"
                  @click="toggle"
                >
                  {{ toggleText2 }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="footerContainer absolute bottom-2">
        <div class="mt-1.5 text-xs text-gray-500 text-center about">
          Powered by
          <a href="" target="_blank" class="link underline">南昌大学</a>
          &amp;
          <a href="" target="_blank" class="link underline">南大信息化办</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { user_register, user_login, get_user_info } from "@/api/user.js";
export default {
  name: "LoginIndex",
  components: {},
  data() {
    return {
      toggleType: 1, // 1: 登录 2: 注册
      form: {
        nickname: "",
        account: "",
        password: "",
      },
    };
  },
  created() {},
  computed: {
    sumbitText() {
      return this.toggleType === 1 ? "登录" : "创建账户";
    },
    toggleText1() {
      return this.toggleType === 1 ? "没有账户？" : "已经有账户了吗？";
    },
    toggleText2() {
      return this.toggleType === 1 ? "注册" : "登录 ";
    },
    titleText() {
      return this.toggleType === 1 ? "登录" : "注册";
    },
  },
  mounted() {},
  methods: {
    toggle() {
      this.toggleType = this.toggleType === 1 ? 2 : 1;
    },
    verify() {
      let accountReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/; // 邮箱正则
      let psdLength = this.form.password.length;
      let nicknameReg = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,50}$/; // 昵称正则
      if (this.toggleType === 1) {
        if (
          this.form.account === "" ||
          accountReg.test(this.form.account) === false
        ) {
          this.$message.error("账号格式错误，不能为空且必须为邮箱格式");
          return false;
        } else if (
          this.form.password === "" ||
          psdLength < 6 ||
          psdLength > 20
        ) {
          this.$message.error("密码格式错误，不能为空且必须为6-20位长度");
          return false;
        }
        return true;
      } else {
        if (
          this.form.nickname === "" ||
          nicknameReg.test(this.form.nickname) === false
        ) {
          this.$message.error(
            "昵称格式错误，不能为空且必须为2-10位中文、英文、数字"
          );
          return false;
        } else if (
          this.form.account === "" ||
          accountReg.test(this.form.account) === false
        ) {
          this.$message.error("账号格式错误，不能为空且必须为邮箱格式");
          return false;
        } else if (
          this.form.password === "" ||
          psdLength < 6 ||
          psdLength > 20
        ) {
          this.$message.error("密码格式错误，不能为空且必须为6-20位长度");
          return false;
        }
        return true;
      }
    },
    handleSubmit() {
      const isVerify = this.verify();
      if (!isVerify) {
        return;
      }
      if (this.toggleType === 1) {
        this.login();
      } else {
        this.register();
      }
    },
    // 登入事件
    async login() {
      const { data } = await user_login(this.form);
      if (data.status === 200) {
        let accessToken = data.data.token; //从后台返回的token
        localStorage.setItem("accessToken", accessToken); // 用localStorage缓存token值
        this.$message.success("登录成功");
        this.resetForm();
        this.$router.push({ path: "/" });
        this.getUserInfo();
      } else {
        this.$message.error(data.data.message);
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const { data } = await get_user_info();
      if (data.status === 200) {
        this.$store.commit("login", { user: data.data });
      }
    },
    // 注册事件
    async register() {
      const { data } = await user_register(this.form);
      if (data.status === 200) {
        this.$message.success("注册成功");
        this.login();
        this.resetForm();
      } else {
        this.$message.error(data.msg);
      }
    },
    resetForm() {
      this.form = {
        nickname: "",
        account: "",
        password: "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.view-container {
  width: 100vw;
  .logo {
    display: inline-block;
    vertical-align: middle;
    height: 2.5rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-image: url("../../assets/image/logo1.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
