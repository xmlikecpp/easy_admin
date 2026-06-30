import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: () => import("../pages/login/index.vue") },

    {
      path: "/data-screen",
      component: () => import("../pages/data-screen/index.vue"),
      meta: { title: "数据大屏" },
    },

    {
      path: "/home",
      component: () => import("../pages/home/index.vue"),
      redirect: "/home/dashboard",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("../pages/dashboard/index.vue"),
          meta: { title: "仪表盘", icon: "DashboardOutlined" }
        },
        {
          path: "info",
          name: "Info",
          component: () => import("../pages/login/index.vue"),
          meta: { title: "个人信息" }
        },
        {
          path: "permission",
          name: "Permission",
          meta: { title: "权限管理", icon: "LockOutlined" },
          children: [
            {
              path: "role",
              name: "Role",
              component: () => import("../pages/permission/role.vue"),
              meta: { title: "角色管理" },
            },
            {
              path: "menu",
              name: "Menu",
              component: () => import("../pages/permission/menu.vue"),
              meta: { title: "菜单管理" },
            },
            {
              path: "admin",
              name: "Admin",
              component: () => import("../pages/permission/admin.vue"),
              meta: { title: "管理员管理" },
            },
          ],
        },
      ]
    }

  ],
});










export default router;
