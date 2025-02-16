import request from '@/utils/request';

export function getDepts() {
    return request({
        url: '/company/department',
        method: 'get'
    });
};