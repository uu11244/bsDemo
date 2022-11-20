const sideBar = [
  { id: 999, pid: 0, authName: "首页", path: "/home/homepage" },
  { id: 1, pid: 0, authName: "用户管理", path: "" },
  { id: 11, pid: 1, authName: "用户列表", path: "/home/users" },
  { id: 2, pid: 0, authName: "区域管理", path: "" },
  { id: 21, pid: 2, authName: "外地来(返)人员", path: "/home/outsiders" },
  { id: 22, pid: 2, authName: "信息录入", path: "/home/information" },
  { id: 3, pid: 0, authName: "权限管理", path: "" },
  { id: 31, pid: 3, authName: "权限列表", path: "/home/rights" },
  { id: 32, pid: 3, authName: "角色列表", path: "/home/roles" },
  { id: 4, pid: 0, authName: "其他", path: "" },
  { id: 41, pid: 4, authName: "富文本", path: "/home/others" },
];

export default sideBar;