import Cookie from 'js-cookie'
export default {
  namespaced: true,
  state: {
    isCollapse: false, // 控制菜单的展开和折叠
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    menu: []
  },
  mutations: {
    setIsCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu (state, val) {
      // 判断添加的数据是否为首页
      if (val.home !== 'home') {
        const index = state.tabList.findIndex(item => item.name === val.name)
        // 如果不存在
        if (index === -1) {
          state.tabList.push(val)
        }
      }
    },
    closeTag (state, item) {
      state.tabList = state.tabList.filter(tab => tab.name !== item.name)
    },
    // 设置menu数据
    setMenu (state, val) {
      state.menu = val
      // cookie传入的数据必须是字符串
      Cookie.set('menu', JSON.stringify(val))
    },
    // 动态注册路由
    addMenu (state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get('menu')) {
        const menu = JSON.parse(Cookie.get('menu'))
        state.menu = menu
      }
    }
  }
}
