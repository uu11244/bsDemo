const sideBar = [
  { id: 1, authName: "用户管理", children: [{ id: 11, authName: "用户列表", path: "/home/users" }] },
  { id: 2, authName: "区域管理", children: [{ id: 21, authName: "外地来(返)人员", path: "/home/outsiders" }, { id: 22, authName: "信息录入", path: "/home/information" }] },
  { id: 3, authName: "权限管理", children: [{ id: 31, authName: "权限列表", path: "/home/rights" }, { id: 32, authName: "角色列表", path: "/home/roles" }] },
  { id: 4, authName: "其他", children: [{ id: 41, authName: "富文本", path: "/home/others" }] },
];

export default sideBar;