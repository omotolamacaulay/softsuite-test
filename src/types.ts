export type NavItem = {
  title: string
  icon: string
  path: string
  iconClosed?: string
  iconOpen?: string
  subNav?: {
    title: string
    path: string
  }[]
}
