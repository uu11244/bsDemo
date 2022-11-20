<template>
  <div>
    <!-- 添加用户的对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" @close="dialogClosed">
      <!-- 内容主体区 -->
      <el-form :model="userForm" :rules="userFormRules" ref="userForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" :disabled="editId !== 0 ? true : false"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="showPassword">
          <el-input v-model="userForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import req from '@/utils/request.js'
export default {
  created() {
    if (this.editId !== 0) {
      this.showPassword = false;
      this.showEditDialog();
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
    },
    editId: {
      type: Number,
      default: 0
    }
  },
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
      disabled: false,
      showPassword: true,
      title: '',
      // 添加用户的表单数据
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 添加表单的验证规则对象
      userFormRules: {
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
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        // console.log(val);
        // dialogVisible改变时通知父组件
        this.$emit('update:visible', val);
      }
    },
  },
  methods: {
    submitBtn() {
      if (this.editId === 0) {
        // 提交新增
        this.addUser();
      } else {
        // 提交修改
        this.editUserInfo();
      }
    },
    // 点击按钮 新增用户
    addUser() {
      // 添加新用户的预验证
      this.$refs.userForm.validate(async vilid => {
        // console.log(vilid);
        if (!vilid) {
          return;
        }
        // 执行添加用户的网络请求
        const { data: res } = await req.require.post('users', this.userForm);
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败');
        }
        this.$message.success('添加用户成功');
        // 隐藏添加用户对话框
        this.dialogVisible = false;
        // location.reload();
        this.reload();
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog() {
      const { data: res } = await req.require.get('users/' + this.editId);
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！');
      }
      this.userForm = res.data;

    },
    // 修改用户信息并提交
    async editUserInfo() {
      // 修改用户的预验证
      this.$refs.userForm.validate(async vilid => {
        if (!vilid) {
          return
        }
        // 发起修改用户的请求
        const { data: res } = await req.require.put('users/' + this.userForm.id, { email: this.userForm.email, mobile: this.userForm.mobile });
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.error('修改失败');

        this.$message.success('修改成功');
        this.editDialogVisible = false;
        this.reload();
      });
    },
    // 监听添加用户对话框的事件
    dialogClosed() {
      this.userForm = {};
    },
  },
  inject: [
    'reload'
  ]
}
</script>

<style>

</style>