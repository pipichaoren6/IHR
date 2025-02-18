<template>
  <div class="container">
    <div class="app-container">
      <div class="head-role">
        <el-button type="primary">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="name" label="角色名称" />
        <el-table-column align="center" prop="state" label="启用" >
          <template v-slot="{row}">
            <span>{{row.state ===1 ? '启用' : row.state === 0 ? '禁用' : '未知'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="描述" />
        <el-table-column align="center" prop="updatedAt" label="操作" >
          <template>
            <el-button type="text" @click="handleEdit(row)">分配权限</el-button>
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row align="middle" type="flex" justify="end" style="height: 50px;margin-right: 60px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        :page-size="20"
        :current-page="1"
      />
    </el-row>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const {rows} = await getRoleList()
      this.tableData = rows
    }
  }
}

</script>
<style scoped>
  .head-role {
    padding: 10px;
  }
</style>
