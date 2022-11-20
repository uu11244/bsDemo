<template>
  <div class="homePage-container">
    <el-card>
      <!-- <Banner :bannerData="bannerData" :interval="3000" /> -->
      <Swiper></Swiper>
    </el-card>
    <el-card>
      <div style="height: 600px" id="main"></div>
    </el-card>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
import Swiper from '@/components/SwiperCom.vue'
export default {
  name: 'homepage',
  components: {
    Banner,
    Swiper
  },
  data() {
    return {
      myChart: null,
      bannerData: [
        {
          title: 'image-1',
          link: 'javascript:;',
          imgUrl: require('@/assets/images/img1.png')
        },
        {
          title: 'image-2',
          link: 'javascript:;',
          imgUrl: require('@/assets/images/img2.png')
        },
        {
          title: 'image-3',
          link: 'javascript:;',
          imgUrl: require('@/assets/images/img3.png')
        }
      ],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: 'Precipitation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
    }
  },
  // mounted是vue中的一个钩子函数，一般在初始化页面完成后，再对dom节点进行相关操作。
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit();
  },
  methods: {
    echartsInit() {
      this.myChart = this.$echarts.init(document.getElementById("main"));
      this.myChart.setOption(this.option);
      window.addEventListener('resize', () => {
        // 执行echart自带的resize方法，使echart涂标自适应
        this.myChart.resize();
      })
    },
    beforeDestroy() {
      /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
      容易导致内存泄漏和额外CPU或GPU占用*/
      window.removeEventListener('resize', () => {
        this.myChart.resize();
      });
    },

  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
  min-width: 800px;
}
</style>