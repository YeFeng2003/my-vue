<template>
  <div>
    <el-tag
      v-for="(item) in tabList"
      :key="item.path"
      :closable = 'item.name !== "home"'
      :effect = '$route.name === item.name ? "dark" : "plain"'
      @click="handleClick(item)"
      @close="handleClose(item)"
      style="cursor: pointer;"
      size="small">
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    changeTags () {
      this.tags = this.tabList.map(item => ({
        name: item.label
      }))
    },
    // 点击tag跳转
    handleClick (tag) {
      this.$router.push(tag.path)
    },
    // 点击关闭
    handleClose (item) {
      this.$store.commit('tab/closeTag', item)
      if (this.$route.name === item.name) {
        this.$router.push('home')
      }
    }
  },
  computed: {
    ...mapState('tab', ['tabList'])
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin-right: 10px;
  margin-bottom: 20px;
}
</style>
