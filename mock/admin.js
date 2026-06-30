// 生成大量管理员数据
function genAdminList() {
    const list = []
    for (let i = 1; i <= 58; i++) {
        list.push({
            id: i,
            username: 'admin_' + i,
            realName: '管理员' + i,
            phone: `139${String(Math.random().toFixed(8).slice(2)).padStart(8, '0')}`,
            roleName: ['超级管理员', '系统管理员', '安全管理员', '审计管理员'][i % 4],
            status: i % 4 === 0 ? 0 : 1,
            lastLoginTime: `2025-0${(i % 12) + 1}-${(i % 28) + 1} ${(i % 22) + 1}:${(i % 50) + 1}`,
            createTime: `2025-01-${(i % 28) + 1} 08:30:00`
        })
    }
    return list
}

const adminList = genAdminList()

export default [
    {
        url: '/api/admin/page',
        method: 'get',
        response: ({ query }) => {
            const { page = 1, pageSize = 10 } = query
            const start = (page - 1) * pageSize
            const end = start + +pageSize
            const records = adminList.slice(start, end)

            return {
                code: 200,
                data: {
                    total: adminList.length,
                    records,
                    page: +page,
                    pageSize: +pageSize
                }
            }
        }
    }
]