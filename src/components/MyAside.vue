<template>
  <!-- 侧边栏菜单 -->
  <!-- unique-opened每次展开一个 -->
  <el-menu background-color="#253457" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse"
    :collapse-transition="false" router>
    <!-- 渲染菜单 -->
    <template v-for="item in menuList">
      <!-- 有子集 显示el-submenu 在el-submenu调用递归组件 -->
      <el-submenu :index="item.id + ''" :key="item.id" v-if="item.children && item.children.length > 0">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span slot="title">{{ item.authName }}</span>
        </template>
        <!-- 调用自身-->
        <MyAside :menuList="item.children"></MyAside>
      </el-submenu>
      <!--无子集 显示当前内容 -->
      <!--if 与 else 的 key 不能相同-->
      <el-menu-item :index="item.path" :key="item.id + 1" v-else>
        <i :class="iconsObj[item.id]"></i>
        <span slot="title">{{ item.authName }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import MyAside from '@/components/MyAside.vue'
// import sideBar from '@/utils/sideBarData(1)';
export default {
  components: {
    MyAside
  },
  name: 'MyAside',
  props: {
    isCollapse: {
      type: Boolean
    },
    menuList: {
      type: Array,
      default: () => []
    }
  },
  created() {
    // this.menuList = this.menuData;
    // console.log(this.menuList);
  },
  data() {
    return {
      // menuList: [],
      iconsObj: {
        '999': 'el-icon-s-home',
        '1': 'el-icon-user-solid',
        '2': 'el-icon-location',
        '3': 'el-icon-s-tools',
        '4': 'el-icon-menu',
      },
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  width: 100%;
  border-right-width: 0;
}
</style>
