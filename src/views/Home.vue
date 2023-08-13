<template>
  <div>
    <!-- gutter:栅栏间隔 -->
    <el-row :gutter="20">
      <!-- 左侧 -->
      <el-col :span="8">
        <!-- 用户卡片 -->
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/user.png" alt="">
            <div class="user-info">
              <p class="name">枫叶</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2023-8-10</span></p>
            <p>上次登陆地点：<span>河南</span></p>
          </div>
        </el-card>
        <!-- 表格 -->
        <el-card style="margin-top: 20px; height: 500px;">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column v-for="(value, key) in labelData" :key="key" :prop="key" :label="value" align="center" />
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16">
        <!-- 小标签 -->
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" body-style="display: flex; padding: 0;">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px;">
          <div ref="echarts1" style="height: 280px;"></div>
        </el-card>
        <div class="graph">
          <!-- 柱形图 -->
          <el-card id="left" style="height: 300px;">
            <div ref="echarts2" style="height: 300px"></div>
          </el-card>
          <!-- 饼状图 -->
          <el-card style="height: 300px;">
            <div ref="echarts3" style="height: 280px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '@/api/index'
import * as echarts from 'echarts'
export default {
  name: 'HomeIndex',
  data () {
    return {
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
      labelData: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  mounted () {
    getData().then(({ data }) => {
      const { tableData, userData, videoData } = data.data
      console.log(videoData)
      console.log(data.data)
      this.tableData = tableData

      const { orderData } = data.data;
      // 折线图 ———— 各品牌手机销量
      (() => {
        // 基于准备好的dom，初始化echarts实例
        const echarts1 = echarts.init(this.$refs.echarts1)
        const echarts1Option = {
          title: {
            text: '各品牌手机销量详情'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
          }
        }
        // 每条线代表什么
        const legend = Object.keys(orderData.data[0])
        const legendData = {
          data: legend
        }
        echarts1Option.legend = legendData
        legendData.right = '5%'
        // X轴数据
        const xAxis = orderData.date
        const xAxisData = {
          data: xAxis
        }
        echarts1Option.xAxis = xAxisData
        // Y轴数据
        echarts1Option.yAxis = {}
        // 主要数据
        echarts1Option.series = []
        legend.forEach(key => {
          echarts1Option.series.push({
            name: key,
            data: orderData.data.map(item => item[key]),
            type: 'line'
          })
        })
        // 使用刚指定的配置项和数据显示图表。
        echarts1.setOption(echarts1Option)
      })();

      // 柱状图 ———— 会员（顾客）新增及活跃数量
      (() => {
        const echarts2 = echarts.init(this.$refs.echarts2)
        const echarts2Option = {
          title: {
            text: '各品牌手机用户量'
          },
          // 提示框
          tooltip: {
            // axis:坐标轴触发提示框
            trigger: 'axis'
          },
          legend: {
            right: '5%'
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '15%',
            containLabel: true
          },
          // 每个格子堆叠多少列
          series: [{ type: 'bar' }, { type: 'bar' }],
          xAxis: { type: 'category' },
          yAxis: {}
        }
        // 数据
        const dataset = {}
        dataset.dimensions = ['day', 'new', 'active']
        dataset.source = userData.map(item => ({
          day: item.date,
          new: item.new,
          active: item.active
        }))
        echarts2Option.dataset = dataset

        echarts2.setOption(echarts2Option)
      })();

      // 饼状图 ————
      (() => {
        const echarts3 = echarts.init(this.$refs.echarts3)
        const echarts3Option = {
          title: {
            text: '各品牌手机总销量对比'
          },
          tooltip: {
            trigger: 'item'
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series: [
            {
              type: 'pie',
              data: videoData,
              radius: '80%',
              bottom: '10%',
              top: '15%'
            }
          ]
        }
        echarts3.setOption(echarts3Option)
      })()
    })
  }
}
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .user-info {
    .name {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .access {
      font-size: 16px;
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>
