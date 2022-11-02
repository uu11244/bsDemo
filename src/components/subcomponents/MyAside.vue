<template>
  <!-- 侧边栏菜单 -->
  <!-- unique-opened每次展开一个 -->
  <el-menu background-color="#253457" text-color="#fff" active-text-color="#ffd04b" unique-opened :collapse="isCollapse"
    :collapse-transition="false">

    <router-link to="/home/homepage">
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="2">
      <!-- 一级菜单模板区 -->
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>用户管理</span>
      </template>

      <!-- 二级菜单 -->
      <router-link to="/home/users">
        <el-menu-item index="2-1">用户列表</el-menu-item>
      </router-link>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>区域管理</span>
      </template>

      <router-link to="/home/outsiders">
        <el-menu-item index="3-1">外地来(返)人员</el-menu-item>
      </router-link>
      <router-link to="/home/information">
        <el-menu-item index="3-2">信息录入</el-menu-item>
      </router-link>
    </el-submenu>


    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>权限管理</span>
      </template>

      <router-link to="/home/rights">
        <el-menu-item index="4-1">权限列表</el-menu-item>
      </router-link>
      <router-link to="/home/roles">
        <el-menu-item index="4-2">角色列表</el-menu-item>
      </router-link>
    </el-submenu>

    <router-link to="/home/others">
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">其他</span>
      </el-menu-item>
    </router-link>




    <!-- <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: 'MyAside',
  props: ['isCollapse'],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  width: 100%;
}
</style>
