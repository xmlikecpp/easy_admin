const userList = [
    { id: 1, username: 'zhangsan', name: '张三', phone: '13800138000', role: '运营', status: 1, createTime: '2025-01-01' },
    { id: 2, username: 'lisi', name: '李四', phone: '13800138002', role: '编辑', status: 1, createTime: '2025-01-02' },
    { id: 3, username: 'wangwu', name: '王五', phone: '13800138003', role: '运营', status: 0, createTime: '2025-01-03' },
    { id: 4, username: 'zhaoliu', name: '赵六', phone: '13800138004', role: '普通用户', status: 1, createTime: '2025-01-04' },
    { id: 5, username: 'sunqi', name: '孙七', phone: '13800138005', role: '运营', status: 1, createTime: '2025-01-05' },
    { id: 6, username: 'zhouba', name: '周八', phone: '13800138006', role: '编辑', status: 0, createTime: '2025-01-06' },
    { id: 7, username: 'wujiu', name: '吴九', phone: '13800138007', role: '普通用户', status: 1, createTime: '2025-01-07' },
    { id: 8, username: 'zhengshi', name: '郑十', phone: '13800138008', role: '运营', status: 1, createTime: '2025-01-08' },
    { id: 9, username: 'fengyi', name: '冯一', phone: '13800138009', role: '编辑', status: 1, createTime: '2025-01-09' },
    { id: 10, username: 'chener', name: '陈二', phone: '13800138010', role: '普通用户', status: 0, createTime: '2025-01-10' },
    { id: 11, username: 'zhangsan1', name: '张三1', phone: '13800138011', role: '运营', status: 1, createTime: '2025-01-11' },
    { id: 12, username: 'lisi1', name: '李四1', phone: '13800138012', role: '编辑', status: 1, createTime: '2025-01-12' },
    { id: 13, username: 'wangwu1', name: '王五1', phone: '13800138013', role: '运营', status: 0, createTime: '2025-01-13' },
    { id: 14, username: 'zhaoliu1', name: '赵六1', phone: '13800138014', role: '普通用户', status: 1, createTime: '2025-01-14' },
    { id: 15, username: 'sunqi1', name: '孙七1', phone: '13800138015', role: '运营', status: 1, createTime: '2025-01-15' },
    { id: 16, username: 'zhouba1', name: '周八1', phone: '13800138016', role: '编辑', status: 0, createTime: '2025-01-16' },
    { id: 17, username: 'wujiu1', name: '吴九1', phone: '13800138017', role: '普通用户', status: 1, createTime: '2025-01-17' },
    { id: 18, username: 'zhengshi1', name: '郑十1', phone: '13800138018', role: '运营', status: 1, createTime: '2025-01-18' },
    { id: 19, username: 'fengyi1', name: '冯一1', phone: '13800138019', role: '编辑', status: 1, createTime: '2025-01-19' },
    { id: 20, username: 'chener1', name: '陈二1', phone: '13800138020', role: '普通用户', status: 0, createTime: '2025-01-20' },
]

export default [
    // 列表分页
    {
        url: '/api/user/list',
        method: 'get',
        response: ({ query }) => {
            const { page = 1, pageSize = 10 } = query
            const start = (page - 1) * pageSize
            const end = start + +pageSize
            return {
                code: 200,
                data: {
                    total: userList.length,
                    records: userList.slice(start, end),
                },
            }
        },
    },

    // 新增
    {
        url: '/api/user/add',
        method: 'post',
        response: ({ body }) => {
            const maxId = Math.max(...userList.map(u => u.id), 0)
            userList.unshift({
                id: maxId + 1,
                ...body,
                createTime: new Date().toLocaleString(),
            })
            return { code: 200, msg: '新增成功' }
        },
    },

    // 编辑
    {
        url: '/api/user/edit',
        method: 'put',
        response: ({ body }) => {
            const idx = userList.findIndex(u => u.id === body.id)
            if (idx !== -1) userList[idx] = { ...userList[idx], ...body }
            return { code: 200, msg: '修改成功' }
        },
    },

    // 删除
    {
        url: '/api/user/delete',
        method: 'delete',
        response: ({ query }) => {
            const id = +query.id
            const idx = userList.findIndex(u => u.id === id)
            if (idx !== -1) userList.splice(idx, 1)
            return { code: 200, msg: '删除成功' }
        },
    },
]