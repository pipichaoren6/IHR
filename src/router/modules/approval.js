import layout from '@/layout'
export default {
  path: '/approval',
  component: layout,
  children: [{
    path: '',
    name: 'approval',
    component: () => import('@/views/approval'),
    meta: {
      title: '审批',
      icon: 'el-icon-s-check'
    }
  }]
}
