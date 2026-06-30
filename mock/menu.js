// 大量菜单数据
const menuList = [
    { id: 1, parentId: 0, name: '控制台', path: '/dashboard', icon: 'DashboardOutlined', sort: 1 },
    { id: 2, parentId: 0, name: '权限管理', path: '/permission', icon: 'LockOutlined', sort: 2 },
    { id: 3, parentId: 2, name: '用户管理', path: '/permission/user', sort: 21 },
    { id: 4, parentId: 2, name: '角色管理', path: '/permission/role', sort: 22 },
    { id: 5, parentId: 2, name: '菜单管理', path: '/permission/menu', sort: 23 },
    { id: 6, parentId: 0, name: '系统配置', path: '/system', icon: 'SettingOutlined', sort: 3 },
    { id: 7, parentId: 6, name: '字典管理', path: '/system/dict', sort: 31 },
    { id: 8, parentId: 6, name: '参数配置', path: '/system/config', sort: 32 },
    { id: 9, parentId: 0, name: '日志管理', path: '/log', icon: 'FileTextOutlined', sort: 4 },
    { id: 10, parentId: 9, name: '操作日志', path: '/log/operate', sort: 41 },
    { id: 11, parentId: 9, name: '登录日志', path: '/log/login', sort: 42 },
]

// 转树形
function buildTree(list, parentId = 0) {
    return list
        .filter((x) => x.parentId === parentId)
        .map((x) => ({
            ...x,
            children: buildTree(list, x.id),
        }))
        .sort((a, b) => a.sort - b.sort)
}

export default [
    {
        url: '/api/menu/list',
        method: 'get',
        response: () => {
            return { code: 200, data: menuList }
        },
    },
    {
        url: '/api/menu/tree',
        method: 'get',
        response: () => {
            return { code: 200, data: buildTree(menuList) }
        },
    },
]