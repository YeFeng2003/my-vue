<template>
  <div class="header-container">
    <!-- 左侧按钮和面包屑 -->
    <div class="l-content">
      <!-- 控制按钮 -->
      <el-button @click="setIsCollapse" size="mini" icon="el-icon-menu"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
        :class="{active: $route.name === item.name}"
        v-for="item in tabList"
        :key="item.name"
        @click="clickBread(item)"
        :to="{ path: item.path }">
        {{ item.label }}
      </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧头像和下拉菜单 -->
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="../assets/user.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Cookie from 'js-cookie'

export default {
  computed: {
    ...mapState('tab', ['tabList'])
  },
  methods: {
    ...mapMutations('tab', ['setIsCollapse']),
    clickBread (item) {
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
    },
    handleCommand (command) {
      if (command === 'logout') {
        Cookie.remove('token')
        Cookie.remove('menu')
        this.$router.push('login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
        }
      }
      &.active {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
