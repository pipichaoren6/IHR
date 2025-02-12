import Layout from '@/layout'

export default {
    path: '/department',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/department/index'),
            name: 'Department',
            meta: { title: '组织', icon: 'el-icon-office-building' }
        }
    ]
}   