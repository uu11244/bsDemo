<template>
  <div class="users-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/homepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable
            @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" plain style="heigth:40px" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="removeUserById(scope.row.id)">
            </el-button>
            <!-- 分配角色 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button icon="el-icon-s-tools" type="warning" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加新用户" :visible.sync="addDialogVisible" width="60%" @close="addDialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="60%">
      <el-form ref="editFormRef" :model="editFrom" :rules="editFromRules" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前用户:{{ userinfo.username }}</p>
        <p>当前角色:{{ userinfo.role_name }}</p>
        <p>分配新角色：
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getUserList } from '@/api/userListAPI.js'
import req from '@/utils/request.js'
export default {
  data() {
    // 验证邮箱的规则
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return callback();
      }
      callback(new Error('请输入合法的邮箱'));
    }
    // 验证电话的规则
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
      if (regMobile.test(value)) {
        // 合法的邮箱
        return callback();
      }
      callback(new Error('请输入合法的手机号'));
    }
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示几条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3-10个字符之间' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在6-15个字符之间' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 查询到的用户信息对象
      editFrom: {},
      // 修改表单的验证规则对象
      editFromRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userinfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色的id
      selectRoleId: ''
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await getUserList(this.queryInfo);
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.userList = res.data.users;
      this.total = res.data.total
    },
    // 监听pagesize改变的事件(改变当前显示几条数据)
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听switch开关状态的改变
    async userStateChanged(userinfo) {
      // console.log(userinfo);
      // 发起修改用户状态的请求
      const { data: res } = await req.require.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg)
    },
    // 监听添加用户对话框的事件
    addDialogClosed() {
      this.$refs.addForm.resetFields();
    },
    // 点击按钮 新增用户
    addUser() {
      // 添加新用户的预验证
      this.$refs.addForm.validate(async vilid => {
        // console.log(vilid);
        if (!vilid) {
          return
        }
        // 执行添加用户的网络请求
        const { data: res } = await req.require.post('users', this.addForm);
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败');
        }
        this.$message.success('添加用户成功');
        // 隐藏添加用户对话框
        this.addDialogVisible = false;
        this.getUserList();

      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      const { data: res } = await req.require.get('users/' + id);
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！');
      }
      this.editFrom = res.data;
      this.editDialogVisible = true;


    },
    // 修改用户信息并提交
    async editUserInfo() {
      // 修改用户的预验证
      this.$refs.editFormRef.validate(async vilid => {
        if (!vilid) {
          return
        }
        // 发起修改用户的请求
        const { data: res } = await req.require.put('users/' + this.editFrom.id, { email: this.editFrom.email, mobile: this.editFrom.mobile });
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error('修改失败');

        this.$message.success('修改成功');
        this.getUserList();
        this.editDialogVisible = false;
      });
    },
    async removeUserById(id) {
      // console.log(id);
      // 弹框询问客户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消，则返回值为字符串cancel
      // console.log(confirmResult);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await req.require.delete('users/' + id);
      if (res.meta.status !== 200)
        return this.$message.error('删除失败');
      this.$message.success('删除成功');
      this.getUserList();



    },
    // 点击 展示分配角色对话框
    async setRole(userinfo) {
      this.userinfo = userinfo;
      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await req.require.get('roles');
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败');
      }
      this.rolesList = res.data;
      console.log(this.rolesList);
      this.setRoleDialogVisible = true;
    },
    // 点击按钮分配角色
    async saveRoleInfo() {
      // 没有选择用户角色
      if (!this.selectRoleId) {
        return this.$message.error('请选择要分配的角色');
      }
      const { data: res } = await req.require.put(`users/${this.userinfo.id}/role`, { rid: this.selectRoleId })
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败');
      }
      this.$message.success('更新角色成功');
      this.selectRoleId = '';
      this.getUserList();
      this.setRoleDialogVisible = false;
    },
    setRoleDialogClosed() {
      // 监听分配角色对话框的关闭事件
      this.selectRoleId = '';
      this.userinfo = {};
    }
  }
}
</script>

<style lang="less" scoped>

</style>