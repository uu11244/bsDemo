<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="" alt="">
        <span>xx社区疫情管理系统</span>
      </div>
      <el-button class="logOut" @click="logOut">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleCollapse">···</div>
        <MyAside :isCollapse="isCollapse"></MyAside>
      </el-aside>
      <!-- 右侧区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyAside from '@/components/subcomponents/MyAside.vue'
export default {
  created() {
    this.getOutsidersList()
  },
  components: {
    MyAside
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    // 获取所有的表单
    getOutsidersList() {

    },
    // 退出按钮
    logOut() {
      // 清空token
      window.sessionStorage.clear();
      // 跳转登录页
      this.$router.push('/login');
    },
    // 折叠 展开侧边栏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }

  }

}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #102452 ;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  // 取消横向滚动条
  overflow-x: hidden;
  background-color: #253457 ;
}

.el-main {
  background-color: #f6f6f6;
}

.toggle-btn {
  background-color: #354261 ;
  font-size: 16px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.logOut {
  padding: 5px 15px;
}
</style>>