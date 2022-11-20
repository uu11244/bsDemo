
<template>
  <div class="login-container" clearfix>
    <div class="login-wrap">

      <el-row type="flex">
        <el-form ref="loginForm" :model="user" :rules="rules">
          <h3>登录</h3>
          <!-- <hr> -->
          <el-form-item prop="username">
            <el-input v-model.trim="user.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <el-form-item id="password" prop="password">
            <el-input prefix-icon="el-icon-edit" v-model.trim="user.password" show-password placeholder="请输入密码">
            </el-input>
          </el-form-item>

          <router-link to="/">找回密码</router-link>
          <router-link to="/register">注册账号</router-link>
          <el-form-item>
            <el-button type="primary" @click.prevent="doLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import req from '@/utils/request.js'
import sStorage from '@/utils/sessionStorage.js'
export default {
  name: 'login',
  data() {
    return {
      user: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则对象
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() { },
  methods: {
    doLogin() {
      // 表单预验证
      this.$refs.loginForm.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        // 加密
        let m = this.$md5(this.user.password);
        // console.log('加密后的密码：' + m);
        const { data: res } = await req.require.get('/login', { params: { username: this.user.username, password: this.user.password } }).catch((error) => { console.log(error); })
        // console.log(res);
        if (res.meta.status === 200) {
          // 登录成功
          // 储存token
          sStorage.set('token', res.data.token);
          this.$store.commit('setToken', sStorage.get('token'));
          this.$message.success(res.meta.msg);
          this.$router.push('/home');
        } else {
          this.$message.error(res.meta.msg);
        }
      })
    }
  }
};
</script>
 
<style lang="less" scoped>
.login-container {
  height: 100%;
  /* background: url("../assets/images/bg1.png") no-repeat; */
  background-size: cover;
  overflow: hidden;
  text-align: center;

}

.login-wrap {
  /* background: url("../assets/images/login_bg.png") no-repeat; */
  background-size: cover;
  width: 350px;
  height: 300px;
  margin: 120px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}

.el-form {
  width: 100%;
}

/deep/.el-input .el-input--prefix .el-input--suffix {
  width: 100%;
}

/deep/.prefix-icon {
  margin-left: 0;
}

#password {
  margin-bottom: 5px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}

hr {
  background-color: #444;
  margin: 20px auto;
}

a {
  padding: 0 20px;
  text-decoration: none;
  color: #aaa;
  font-size: 14px;
}

a:hover {
  color: coral;
}

.el-button {
  width: 100%;
  // margin-left: -80px;
}
</style>