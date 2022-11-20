<template>
  <!-- 弹窗组件 -->
  <div dialog-contianer>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" @close="close">
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model.trim="ruleForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model.trim="ruleForm.tel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sStorage from '@/utils/sessionStorage.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
    },
    edit: {
      type: Object,
      default: () => ({
        name: '',
        id: '',
        idCard: '',
        tel: ''
      })
    }
  },
  // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    this.getEditContent();
  },
  data() {
    // 验证身份证的规则
    let checkIdCard = (rule, value, callback) => {
      const regIdCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (regIdCard.test(value)) {
        // 合法的邮箱
        return callback();
      }
      callback(new Error('请输入合法的身份证号码'));
    }
    // 验证电话的规则
    let checkTel = (rule, value, callback) => {
      const regTel = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
      if (regTel.test(value)) {
        return callback();
      }
      callback(new Error('请输入合法的手机号'));
    }
    return {
      ruleForm: {},
      // 表单的验证规则
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' },
        { validator: checkIdCard, message: '请输入正确的身份证号码', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' },
        { validator: checkTel, message: '请输入正确的11位手机号', trigger: 'blur' }]
      },
    }
  },
  // watch: {

  // },
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
    // 获取当前行
    getEditContent() {
      if (this.dialogTitle === '添加信息') {
        return this.ruleForm = {};
      }
      this.ruleForm = sStorage.get('editContent');
    },
    // 关闭弹窗
    close() {
      this.ruleForm = {};
      // location.reload();
    },
    // 点击取消按钮
    cancel() {
      this.dialogVisible = false;
      this.ruleForm = {};
    },
    // 点击确定按钮
    confirmBtn() {
      // console.log('点击了确认');
      // 表单规则的预验证
      this.$refs.ruleForm.validate(vilid => {
        if (!vilid) {
          return;
        }
        // 执行新增
        // console.log(this.ruleForm);
        let status = 'add'
        this.$emit('get-user', this.ruleForm, status);
        this.ruleForm = {};
        this.dialogVisible = false;
      })
    },
  }

}
</script>

<style>

</style>