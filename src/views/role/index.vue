<template>
  <div class="container">
    <div class="app-container">
      <div class="head-role">
        <el-button type="primary" @click="handleAdd">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="name" label="角色名称" />
        <el-table-column align="center" prop="desc" label="启用" />
        <el-table-column align="center" prop="createdAt" label="描述" />
        <el-table-column align="center" prop="updatedAt" label="操作" />
      </el-table>
    </div>
    <el-row align="middle" type="flex" justify="end" style="height: 50px;">
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
export default {
  name: 'Role'
}
</script>
<style scoped>
  .head-role {
    padding: 10px;
  }
</style>
