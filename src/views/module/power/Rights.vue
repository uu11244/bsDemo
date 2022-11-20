<template>
  <div class="rights-contianer">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-button type="info" icon="el-icon-view" @click="setRightDialogVisible = true">树形列表</el-button>
      <!-- 表格 -->
      <el-table :data="treeRightList" row-key="id" border stripe default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <!-- <el-table-column label="#" type="index"></el-table-column> -->
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <!-- 作用域插槽 自定义样式 -->
          <template v-slot="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="树形(路由)列表" :visible.sync="setRightDialogVisible" width="40%">
      <el-tree :data="routerTreeList" :props="treeProps"></el-tree>
    </el-dialog>
  </div>
</template>

<script>
import req from '@/utils/request.js'
import testTree from '@/utils/sideBarData(1).js'

export default {
  data() {
    return {
      // 权限列表
      rightsList: [],
      // 权限列表弹窗
      setRightDialogVisible: false,
      // 树形权限列表
      treeRightList: [],
      routerTreeList:[],
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 获取权限列表
    async getRightsList() {
      const { data: res } = await req.require.get('rights/list');
      if (res.meta.status !== 200)
        return this.$message.error('获取列表数据失败');
      // this.rightsList = res.data;
      // console.log(this.rightsList);
      // this.treeRightList = this.getTreeRightList(0, testTree);
      this.treeRightList = this.getTreeRightList(0, res.data);
      this.routerTreeList = this.getTreeRightList(0, testTree);

    },
    // 获取树形三级权限表
    getTreeRightList(pid, arr) {
      let result = [];
      arr.forEach(item => {
        if (item.pid === pid) {
          item.children = this.getTreeRightList(item.id, arr);
          result.push(item);
        }
      });
      // console.log(result);
      return result;
    },
  }
}
</script>

<style lang="less" scoped>

</style>