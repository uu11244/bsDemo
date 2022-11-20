<template>
  <div outsiders-container>
    <h4 style="color:#909399">外地来(返)人员信息一览</h4>
    <!-- 搜索与添加 -->
    <div class="searchContent">
      <el-input placeholder="请输入内容" v-model.trim="inputContent" class="input-with-select" clearable
        @clear="getDataList()">
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
      <el-button class="newEntry" type="primary" plain @click="addDialogVisible">新增录入</el-button>
    </div>
    <!-- 用户列表区域 -->
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号码" width="280">
      </el-table-column>
      <el-table-column prop="tel" label="联系电话">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增信息的对话框  -->
    <!-- <diaLogCard :visible.sync="visible" :dialogTitle="title" v-if="visible" @get-user="getUser"></diaLogCard> -->

    <!-- 新增/修改的对话框 -->
    <diaLogCard v-if="visible" :visible.sync="visible" :dialogTitle="title" :edit="editContent"
      @get-user="getUser(arguments)" @close="handleClose">
    </diaLogCard>
  </div>

</template>

<script>
import testData from '@/utils/testData.js'
import diaLogCard from '@/views/module/region/components/Dialog.vue'
import sStorage from '@/utils/sessionStorage.js'
export default {
  name: 'outsiders',
  components: {
    diaLogCard
  },
  created() {
    this.getDataList();
  },
  data() {
    return {
      tableData: [],
      // addDialogVisible: false,
      editdialogVisible: false,
      select: '',
      total: 0,
      // 新增界面的表单数据
      addForm: {
        // name: '',
        // id: '',
        // tel: ''
      },
      // 弹窗是否可见
      visible: false,
      // 弹窗的名字
      title: '',
      editContent: {},
      // 搜索框的内容
      inputContent: ''
    }
  },
  methods: {
    getDataList() {
      this.tableData = testData;
    },
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
    // 编辑按钮（展示编辑的对话框）
    handleEdit(index, row) {
      // console.log(index);
      console.log(row.id);
      this.visible = true;
      this.title = '编辑信息';
      this.editContent = {
        id: row.id,
        name: row.name,
        idCard: row.idCard,
        tel: row.tel
      };
      // console.log(this.editContent);
      sStorage.set('editContent', this.editContent);
    },
    // 删除按钮
    async handleDelete(index, row) {
      // console.log('点击了删除,index:' + index);
      // 弹框询问客户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err);
      // console.log(confirmResult);
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消，则返回值为字符串cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      // 删除操作
      this.tableData.splice(index, 1);

    },
    // 新增个人信息
    addPersonData() {
      this.$refs.addFormRef.validate(valid => {
        // console.log(valid);
        if (!valid) return
        // 发起添加的请求
      })
    },
    // 显示添加界面的弹窗
    addDialogVisible() {
      this.visible = true;
      this.title = '添加信息'
    },
    // 弹窗关闭
    handleClose() {
      // Object.assign(this.$data, this.$options.data());
    },
    // 获取子组件(弹窗)传来的新增信息
    getUser(value) {
      console.log(value[0], value[1]);
      let data = value[0];
      if (value[1] !== 'add' || 'id' in value[0]) {
        // 执行修改
        console.log('修改,id:' + data.id);
        const editUser = { id: data.id, name: data.name, idCard: data.idCard, tel: data.tel };
        for (let [index, item] of this.tableData.entries()) {
          // console.log(index, item);
          if (item.id === data.id) {
            // console.log(index);
            this.tableData.splice(index, 1, editUser);
          }
        }
      } else {
        //执行新增
        // console.log('新增');
        // ?深拷贝不行
        // let lastId = this.tableData.pop().id;
        let newId =  this.tableData.length + 1;
        const newUser = { id: newId, name: data.name, idCard: data.idCard, tel: data.tel };
        this.tableData.push(newUser);
      }
    },
    // 搜索按钮
    searchBtn() {
      // console.log(this.inputContent);
      let arr = []
      if (this.tableData.length > 0) {
        for (let item of this.tableData) {
          // 搜名字
          if (item.name === this.inputContent) {
            arr.push(item);
            // 有个bug 搜到之后替换tableData后，只能搜当前列表里的数
            this.tableData = arr;
          } else {
            this.tableData = arr;
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchContent {
  margin: 10px 0 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

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
  width: 800px;
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