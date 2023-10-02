import { NavItem } from "../../types"

type navLinksType = NavItem[]

const navlinks: navLinksType = [
  {
    title: "Payroll Activities",
    icon: "PayrollAct",
    path: "#/",
    iconClosed: "ArrowDown",
    iconOpen: "ArrowUp",
    subNav: [
      {
        title: "Payroll Run",
        path: "#/",
      },
      {
        title: "Payroll Reversal",
        path: "#/",
      },
      {
        title: "Payroll History",
        path: "/history",
      },
      {
        title: "Payroll Lock",
        path: "/lock",
      },
      {
        title: "Payroll Payslip",
        path: "/payslip",
      },
      {
        title: "Payroll Log",
        path: "/log",
      },
      {
        title: "Payroll Approval",
        path: "/approval",
      },
    ],
  },
  {
    title: "Salary Structure",
    icon: "SalaryStructure",
    path: "/salary",
  },
  {
    title: "Element Setup",
    icon: "Settings",
    path: "/#",
    iconClosed: "ArrowDown",
    iconOpen: "ArrowUp",
    subNav: [
      {
        title: "Elements",
        path: "/",
      },
      {
        title: "Balances",
        path: "/balances",
      },
    ],
  },
  {
    title: "Employees",
    icon: "Employees",
    path: "/employees",
  },
  {
    title: "Payroll Settings",
    icon: "Settings",
    path: "/#",
    iconClosed: "ArrowDown",
    iconOpen: "ArrowUp",
    subNav: [
      {
        title: "Payroll Options",
        path: "/options",
      },
      {
        title: "Deduction Account Setup",
        path: "/account",
      },
      {
        title: "Variation Portal Period",
        path: "/period",
      },
      {
        title: "Payrgroup Setup",
        path: "/setup",
      },
      {
        title: "Tax Setup",
        path: "/tax",
      },
    ],
  },
  {
    title: "My Account",
    icon: "Profile",
    path: "/profile",
  },
]

export { navlinks }
