export default [{
  _name: 'CSidebarNav',
  _children: [
    {
      _name: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'cil-speedometer',
      badge: {
        color: 'primary',
        text: 'NEW'
      }
    },
    {
      _name: 'CSidebarNavTitle',
      _children: ['Header 1']
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Item',
      // to: '/item',
      icon: 'cil-drop'
    },
    {
      _name: 'CSidebarNavTitle',
      _children: ['Header 2']
    },
    {
      _name: 'CSidebarNavDropdown',
      name: 'Dropdown',
      route: '/dropdown',
      icon: 'cil-puzzle',
      items: [{
          name: 'First item',
          // to: '/dropdown/first',
          icon: 'cil-puzzle'
        },
        {
          name: 'Second item',
          // to: '/dropdown/second',
          icon: 'cil-puzzle'
        },
      ]
    }
  ]
}]