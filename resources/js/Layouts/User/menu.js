export const menuType = {
  item: 'item',
  heading: 'heading',
  dropdown: 'dropdown'
}

export var navMenuItems = [
  {
    icon: 'home',
    text: 'Dashboard',
    uri: route('user.dashboard')
  },
  {
    icon: 'folder-minus',
    text: 'Deposits',
    uri: route('user.wallet-transactions.index')
  },
  {
    icon: 'bar-chart',
    text: 'Profit Return',
    uri: route('user.profit-return')
  },
  {
    type: menuType.dropdown,
    icon: 'command',
    text: 'Investments',
    subs: [
      {
        text: 'Investment Plan',
        uri: route('user.projects.index')
      },
      {
        text: 'Investments History',
        uri: route('user.investments.index')
      }
    ]
  },
  
  {
    icon: 'phone-call',
    text: 'Supports',
    uri: route('user.supports.index')
  },
  {
    icon: 'dollar-sign',
    text: 'Payouts',
    uri: route('user.payout.index')
  },
  {
   
    icon: 'shopping-cart',
    text: 'Event Bookings History',
    uri: route('user.event-orders.index')
  },
  {
    icon: 'settings',
    text: 'Account Settings',
    uri: route('user.account-settings')
  },
  {
    icon: 'activity',
    text: 'Affiliate Program',
    uri: route('user.affiliate.index')
  },
  {
    icon: 'file',
    text: 'KYC Verification',
    uri: route('user.kyc.index'),
  },
]

export const updateActiveMenu = (uri) => {
  navMenuItems = navMenuItems.map((item) => {
    if (item.type != menuType.heading) {
      item.is_active = uri == item.uri
      if (item.subs?.length) {
        item.subs = item.subs.map((sub) => {
          if (uri === sub.uri) {
            sub.is_active = true
            item.is_active = true
          } else {
            sub.is_active = false
          }
          return sub
        })
      }
    }
    return item
  })
}

export const updateActiveSubMenu = (parentMenuKey, subMenuUri) => {
  navMenuItems = navMenuItems.map((item, key) => {
    item.is_active = key == parentMenuKey

    if (subMenuUri && item.subs?.length) {
      item.subs = item.subs.map((subItem) => {
        subItem.is_active = subItem.uri == subMenuUri
        return subItem
      })
    }
    return item
  })
}
