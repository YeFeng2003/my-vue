<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 标题 -->
      <h3>{{ isCollapse ? "后台" : "通用后台管理系统"}}</h3>
      <!-- 单级目录 -->
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <!-- 多级目录 -->
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <!-- 孩子 -->
        <el-menu-item-group>
          <el-menu-item
            @click="clickMenu(subItem)"
            v-for="subItem in item.children"
            :key="subItem.name"
            :index="subItem.name">
            {{subItem.label}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: solid 0px #e6e6e6;
  height: 110vh;
}

.el-menu h3 {
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  color: white;
  font-weight: 400;
}
</style>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex'

export default {
  name: 'CommonAside',
  data () {
    return {
      // menuData: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 'video-play',
      //     url: 'MallManage/MallManage'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: 'UserManage/UserManage'
      //   },
      //   {
      //     label: '其他',
      //     icon: 'location',
      //     children: [
      //       {
      //         path: '/page1',
      //         name: 'page1',
      //         label: '首页',
      //         icon: 'setting',
      //         url: 'Other/PageOne'
      //       },
      //       {
      //         path: '/page2',
      //         name: 'page2',
      //         label: '首页',
      //         icon: 'setting',
      //         url: 'Other/PageTwo'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    clickMenu (item) {
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
      this.$store.commit('tab/selectMenu', item)
    }
    // mounted () {
    //   console.log(this.menuData)
    // }
  },
  computed: {
    // 没有子菜单
    noChildren () {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren () {
      return this.menuData.filter(item => item.children)
    },
    ...mapState('tab', ['isCollapse']),
    menuData () {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }
  }
}
</script>
