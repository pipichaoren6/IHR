<template>
  <div class="container">
    <div class="app-container">
      <el-tree default-expand-all :data="depts" :props="defaultProps" >
          <el-row style="width: 100%;" type="flex" justify="space-between">
            <el-col :span="12">123</el-col>
            <el-col :span="12">123</el-col>
          </el-row>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
    name: 'Department',
    data() {
      return {
        depts: [
          {
            id: "总部集团",
            label: '总裁办',
            name: '总裁办',
            children: [{
              id: 1,
              label: '二级 1-1',
              name: '信息技术部',
            },
            {
              id: 2,
              label: '二级 1-2',
              name: '人事部',
            }
          ]
          }
        ],// 部门数据
        defaultProps: {
          children: 'children', // 子节点
          label: 'name' // 节点名称
        } 
      }
    }
}
</script>
<style scoped>
.app-container {
  /* padding: 30px 140px; */
  font-size: 14px;
}
</style>
