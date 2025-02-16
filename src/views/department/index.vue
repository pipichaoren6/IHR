<template>
  <div class="container">
    <div class="app-container">
      <el-tree default-expand-all :data="depts" :props="defaultProps">
        <template v-slot="{ data }">
          <el-row style="width:100%;height: 100px;" type="flex" justify="space-between" align="middle">
            <el-col :span="8">{{ data.name }}</el-col>
            <el-dropdown :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepts } from '@/api/department';
import { listToTree } from '@/utils';
export default {
  name: 'Department',
  data() {
    return {
      depts: [],// 部门数据
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.getDepts();
  },
  methods: {
    async getDepts() {
      const res = await getDepts();
      this.depts = listToTree(res, 0);
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}

.tree-manager {
  display: inline-block;
  margin: 30px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
</style>