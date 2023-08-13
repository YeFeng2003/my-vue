<template>
  <div class="manage">
    <div class="manage-header">
      <!-- 新增用户 -->
      <el-button type="primary" @click="addItem">+ 新增</el-button>
      <!-- form搜索区域 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form label-width="117px" :rules="rules" size="medium" :inline="true" ref="form" :model="form">

        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="common-table">
      <!-- 表格 -->
      <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%" stripe>
        <el-table-column label="姓名" prop="name" sortable>
        </el-table-column>
        <el-table-column label="年龄" prop="age" sortable>
        </el-table-column>
        <el-table-column label="性别" prop="sex" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" prop="addr" sortable>
        </el-table-column>
        <el-table-column label="出生日期" prop="birth" value-format="yyyy-MM-dd" sortable>
        </el-table-column>
        <!-- 搜索框、编辑和删除 -->
        <el-table-column align="right"> <!-- 靠右 -->
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- 删除 -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
  name: 'UserIndex',
  data () {
    return {
      dialogVisible: false,
      operateFormLabel: [
        {
          label: '姓名',
          type: 'input'
        },
        {
          label: '年龄',
          type: 'input'
        }
      ],
      form: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      tableData: [],
      modalType: 0, // 0表示新增的弹窗， 1表示编辑
      total: 0, // 当前的总条数
      search: '',
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 后续对表单数据的处理
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList()
            })
          }
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleEdit (row) {
      this.modalType = 1
      this.dialogVisible = true
      // 注意需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新获取列表的接口
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addItem () {
      this.modalType = 0
      this.dialogVisible = true
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 获取列表的数据
    getList () {
      // 获取的列表的数据
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        console.log(data)
        this.tableData = data.list

        this.total = data.count || 0
      })
    },
    // 选择页码的回调函数
    handlePage (val) {
      this.pageData.page = val
      this.getList()
    },
    // 列表的查询
    onSubmit () {
      this.getList()
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .common-table {
    position: relative;

    .pager {
      position: absolute;
      bottom: -40px;
      right: 20px;
    }
  }
}
</style>
