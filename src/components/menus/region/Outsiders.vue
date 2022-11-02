<template>
  <div outsiders-container>
    <h4 style="color:#909399">外地来(返)人员信息一览</h4>
    <!-- 搜索与添加 -->
    <div style="margin: 10px 0 10px 0;display: flex;flex-direction: row;justify-content:flex-start;">
      <el-input placeholder="请输入内容" class="input-with-select" style="width:800px" clearable @clear="getUserList">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px">
          <el-option label="日期" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
          <el-option label="地址" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
      <el-button class="newEntry" type="primary" plain @click="addDialogVisible = true">新增录入</el-button>
    </div>
    <!-- 用户列表区域 -->
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户的对话框 -->
    <el-dialog title="新增录入信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 新增的表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPersonData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改的对话框 -->
    <el-dialog title="修改" :visible.sync="editdialogVisible" width="50%">
      <span>eeeee</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import testData from '@/utils/testData.js'
export default {
  name: 'outsiders',
  components: {
  },
  data() {
    return {
      tableData: testData,
      addDialogVisible: false,
      editdialogVisible: false,
      select: '',
      total: 0,
      // 新增界面的表单数据
      addForm: {
        // name: '',
        // id: '',
        // tel: ''
      },
      // 新增界面表单的验证规则
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        id: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      }
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    // async getUserList() {
    //   const { data: res } = await getUserList(this.queryInfo);
    //   console.log(res);
    // },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    // 编辑按钮（展示编辑的对话框）
    handleEdit() {
      console.log('点击了编辑');
      this.editdialogVisible = true;
    },
    // 删除按钮
    handleDelete() {
      console.log('点击了删除');
    },
    // 监听新增录入对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 新增个人信息
    addPersonData() {
      this.$refs.addFormRef.validate(valid => {
        // console.log(valid);
        if (!valid) return
        // 发起添加的请求
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

/deep/.el-button.newEntry {
  margin-left: 20px;
  width: 130px;
}

.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>>