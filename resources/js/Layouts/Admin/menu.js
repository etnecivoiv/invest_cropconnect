export const menuType = {
  item: 'item',
  heading: 'heading',
  dropdown: 'dropdown'
}

export var navMenuItems = [
  {
    icon: 'home',
    text: 'Dashboard',
    uri: route('admin.dashboard')
  },
  {
    permission: 'order',
    icon: 'shopping-cart',
    text: 'Orders',
    uri: route('admin.order.index')
  },
  {
    type: menuType.heading,
    text: 'Projects'
  },
  {
    icon: 'award',
    text: 'Projects',
    uri: route('admin.projects.index')
  },

  {
    icon: 'columns',
    text: 'Project Category',
    uri: route('admin.project-categories.index')
  },
  {
    icon: 'dollar-sign',
    text: 'Return Transactions',
    uri: route('admin.return-transaction')
  },
  {
    icon: 'shopping-bag',
    text: 'Invests',
    uri: route('admin.invest.index')
  },
  {
    type: menuType.heading,
    text: 'Others'
  },

  {
    permission: 'gateways',
    icon: 'calendar',
    text: 'Payment Gateways',
    uri: route('admin.gateways.index')
  },
  {
    permission: 'payouts',
    icon: 'briefcase',
    text: 'Payout Methods',
    uri: route('admin.payout-methods.index')
  },
  {
    permission: 'payouts',
    icon: 'credit-card',
    text: 'Payouts',
    uri: route('admin.payouts.index')
  },
  {
    permission: 'cron-job',
    icon: 'code',
    text: 'Cron Jobs',
    uri: '/admin/cron-job'
  },
  {
    permission: 'support',
    icon: 'message-square',
    text: 'Help & Support',
    uri: route('admin.support.index')
  },

  {
    type: menuType.heading,
    text: 'USER LOGS'
  },
  {
    permission: 'customers',
    icon: 'users',
    text: 'Customers',
    uri: route('admin.customers.index')
  },
  {
    permission: 'notification',
    icon: 'bell',
    text: 'Notifications',
    uri: route('admin.notification.index')
  },
  {
    permission: 'deposit-logs',
    icon: 'file',
    text: 'Deposit Logs',
    uri: route('admin.deposit-logs.index')
  },
  {
    type: menuType.heading,
    text: 'APPEARANCE'
  },
  {
    type: menuType.dropdown,
    icon: 'book',
    text: 'Blogs',
    subs: [
      {
        permission: 'blog-posts',
        text: 'Posts',
        uri: route('admin.blog-posts.index')
      },
      {
        permission: 'blog-categories',
        text: 'Categories',
        uri: route('admin.blog-categories.index')
      },
      {
        permission: 'blog-tags',
        text: 'Tags',
        uri: route('admin.blog-tags.index')
      }
    ]
  },
  {
    permission: 'faq',
    icon: 'columns',
    text: "Faq's",
    uri: route('admin.faq.index')
  },
  {
    permission: 'testimonials',
    icon: 'calendar',
    text: 'Testimonials',
    uri: route('admin.testimonials.index')
  },
  {
    permission: 'partners',
    icon: 'box',
    text: 'Partners',
    uri: route('admin.partner.index')
  },
  {
    permission: 'investors',
    icon: 'users',
    text: 'Investors',
    uri: route('admin.investors.index')
  },
  {
    permission: 'events',
    icon: 'file',
    text: 'Events',
    uri: route('admin.events.index')
  },
  {
    permission: 'event-orders',
    icon: 'shopping-cart',
    text: 'Event Bookings',
    uri: route('admin.event-orders.index')
  },
  {
    permission: 'refer-history',
    icon: 'users',
    text: 'Referral History',
    uri: route('admin.refer-histories')
  },
  {
    permission: 'commission-history',
    icon: 'dollar-sign',
    text: 'Commission History',
    uri: route('admin.commission-histories')
  },
  {
    permission: 'team',
    icon: 'user',
    text: 'Team',
    uri: route('admin.team.index')
  },
  {
    permission: 'language',
    icon: 'grid',
    text: 'Language',
    uri: route('admin.language.index')
  },
  {
    permission: 'menu',
    icon: 'menu',
    text: 'Menu',
    uri: route('admin.menu.index')
  },

  {
    permission: 'custom-page',
    icon: 'box',
    text: 'Custom Pages',
    uri: route('admin.page.index')
  },
  {
    permission: 'seo',
    icon: 'tool',
    text: 'Seo Settings',
    uri: route('admin.seo.index')
  },
  {
    type: menuType.heading,
    text: 'SITE SETTINGS'
  },

  {
    // permission: ['kyc-methods', 'kyc-requests'],
    type: menuType.dropdown,
    disable: false, // here we need to get env variable status
    icon: 'file-text',
    text: 'KYC',
    subs: [
      {
        permission: 'kyc-methods',
        text: 'Create Method',
        uri: route('admin.kyc-methods.create')
      },
      {
        permission: 'kyc-methods',
        text: 'All Methods',
        uri: route('admin.kyc-methods.index')
      },
      {
        permission: 'kyc-requests',
        text: 'KYC Requests',
        uri: route('admin.kyc-requests.index')
      }
    ]
  },

  {
    permission: 'page-settings',
    icon: 'sliders',
    text: 'Page Settings',
    uri: route('admin.page-settings.index')
  },
  {
    type: menuType.dropdown,
    icon: 'lock',
    text: 'Admin and Role',
    subs: [
      {
        permission: 'admin',
        text: 'Admin',
        uri: route('admin.admin.index')
      },
      {
        permission: 'roles',
        text: 'Roles',
        uri: route('admin.role.index')
      }
    ]
  },
  {
    permission: 'developer-settings',
    type: menuType.dropdown,
    icon: 'settings',
    text: 'Developer Settings',
    subs: [
      {
        text: 'App Setting',
        uri: route('admin.developer-settings.show', 'app-settings')
      },
      {
        text: 'Features Settings',
        uri: route('admin.developer-settings.show', 'features-settings')
      },
      {
        text: 'Newsletter Settings',
        uri: route('admin.developer-settings.show', 'newsletter-settings')
      },
      {
        text: 'Social Login Settings',
        uri: route('admin.developer-settings.show', 'social-login-settings')
      },
      {
        text: 'SMTP Setting',
        uri: route('admin.developer-settings.show', 'mail-settings')
      },
      {
        text: 'Storage Setting',
        uri: route('admin.developer-settings.show', 'storage-settings')
      }
    ]
  },

  {
    type: menuType.heading,
    text: 'MY SETTINGS'
  },
  {
    icon: 'user',
    text: 'Profile Settings',
    uri: route('admin.profile.setting')
  }
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
