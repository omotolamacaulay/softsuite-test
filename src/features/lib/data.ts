import { NavItem } from "../../types"

type navLinksType = NavItem[]

const navlinks: navLinksType = [
  {
    title: "Payroll Activities",
    icon: "PayrollAct",
    path: "/payroll",
    iconClosed: "ArrowDown",
    iconOpen: "ArrowUp",
    subNav: [
      {
        title: "Payroll Run",
        path: "link",
      },
      {
        title: "Payroll Reversal",
        path: "link",
      },
      {
        title: "Payroll History",
        path: "link",
      },
      {
        title: "Payroll Lock",
        path: "link",
      },
      {
        title: "Payroll Payslip",
        path: "link",
      },
      {
        title: "Payroll Log",
        path: "link",
      },
      {
        title: "Payroll Approval",
        path: "link",
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
    path: "/settings",
    iconClosed: "ArrowDown",
    iconOpen: "ArrowUp",
    subNav: [
      {
        title: "Elements",
        path: "link",
      },
      {
        title: "Balances",
        path: "link",
      },
    ],
  },
  {
    title: "Employees",
    icon: "Employees",
    path: "/#",
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
        path: "link",
      },
      {
        title: "Deduction Account Setup",
        path: "link",
      },
      {
        title: "Variation Portal Period",
        path: "link",
      },
      {
        title: "Payrgroup Setup",
        path: "link",
      },
      {
        title: "Tax Setup",
        path: "link",
      },
    ],
  },
  {
    title: "My Account",
    icon: "Profile",
    path: "/#",
  },
]

export { navlinks }
