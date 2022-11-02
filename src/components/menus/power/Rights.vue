<template>
  <div class="rights-contianer">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 表格 -->
      <el-table :data="rightsList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
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
  </div>
</template>

<script>
import req from '@/utils/request.js'

export default {
  data() {
    return {
      // 权限列表
      rightsList: [],
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
      this.rightsList = res.data;
      // console.log(this.rightsList);
    }
  }
}
</script>

<style lang="less" scoped>

</style>