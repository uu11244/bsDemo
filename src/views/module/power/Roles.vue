<template>
  <div class="roles-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" round>添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区 -->
      <el-table :data="roleList" stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1, index1) in scope.row.children"
              :class="['borderBottom', 'vcenter', index1 === 0 ? 'borderTop' : '']" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级、三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环，嵌套渲染二级权限 -->
                <el-row v-for="(item2, index2) in item1.children" :key="item2.id"
                  :class="[index2 === 0 ? '' : 'borderTop', 'vcenter']">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable
                      @close="removeRightById(scope.row, item3.id)">
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-search" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 展示分配权限的 弹窗 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="40%" @close="defKeys = []">
      <el-tree :data="rightList" :props="treeProps" show-checkbox node-key="id" :default-expand-all="true"
        :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import req from '@/utils/request.js'
export default {
  data() {
    return {
      // 所有角色列表数据
      roleList: [],
      // 控制分配权限对话框的显示和隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        children: 'children',
        // 显示的对象
        label: 'authName'
      },
      // 默认选中节点的id值 数组
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: '',
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await req.require.get('roles');
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表数据失败')
      }
      this.roleList = res.data;
      // console.log(this.roleList);
    },
    // 根据id删除对应的权限
    async removeRightById(role, rigthId) {
      // 弹框提示用户是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);

      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除');
      }
      const { data: res } = await req.require.delete(`roles/${role.id}/rights/${rigthId}`);
      // console.log(res);
      if (res.meta.status !== 200)
        return this.$message.error('删除权限失败');
      this.$message.success('删除成功');
      // 直接赋值给role.children 防止整个列表刷新
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id;
      // 递归获取三级节点id
      this.getLeafKeys(role, this.defKeys);
      this.setRightDialogVisible = true;
      // 获取所有权限数据
      const { data: res } = await req.require.get('/rights/tree');
      // console.log(res);
      if (res.meta.status !== 200)
        return this.$message.error('获取权限数据失败');
      //获取到的权限数据 
      this.rightList = res.data;
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到数组 defKeys中
    getLeafKeys(node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 点击为角色分配权限
    async allotRights() {
      // 把所有选中的id放入数组中
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedNodes()
      ];
      // console.log(keys);
      // 字符串拼接
      const idStr = keys.join(',');
      const { data: res } = await req.require.post(`roles/${this.roleId}/rights`, { rids: idStr });
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败');
      }
      this.$message.success('分配权限成功');
      this.getRoleList();
      this.setRightDialogVisible = false;
    }

  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.borderBottom {
  border-bottom: 1px solid #eee;
}

.borderTop {
  border-top: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>