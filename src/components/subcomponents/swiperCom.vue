<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, index) in swiperImg" :key="index">
      <img :src="item.pic" alt="" />
      <!-- <div class="banner-inner">
            <div class="banner-inner-box">
              <div class="title-box">{{ item.title }}</div>
              <div class="content-box">{{ item.introduction }}</div>
              <div class="toSeeDetail" @click="toSeeDetail(item)">
              </div>
            </div>
          </div> -->
    </swiper-slide>
    <!-- 根据情况引入控件 -->
    // 底部按钮
    <div class="swiper-pagination" slot="pagination"></div>
    // 上一张按钮
    <div class="swiper-button-prev" slot="button-prev"></div>
    // 下一张按钮
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: "Swiper",
  data() {
    return {
      swiperOption: {
        spaceBetween: 15, // 图片之间的间距
        centeredSlides: true, // 居中还是从图1开始
        slidesPerView: 'auto', // 一屏幕显示几个? 数字或者默认  auto 自动。
        notNextTick: true, // true:加载后允许触发事件 false:加载后不可以触发事件
        loop: true, // 循环吗
        initialSlide: 0, // 从第几个开始
        autoplay: {
          delay: 5000, // 等5秒下一个
          disableOnInteraction: false // 中间滑动一下，取消自动吗？
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }, // 下按钮
        speed: 800, // 滑动时候动画的速度
        paginationClickable: true, // 下面按钮让点吗
        navigation: {
          prevEl: '.swiper-button-prev', // 左侧按钮
          nextEl: '.swiper-button-next' // 右侧按钮
        },
        effect: 'fade', // 渐入效果
        watchSlidesProgress: true, // 开启这个参数来计算每个slide的progress
        watchSlidesVisibility: true,  // 先要开启watchSlidesProgress参数，如果开启watchSlidesVisibility，则会在每个slide增加一个指示该slide的progress值得classname
        autoHeight: true  // 图片高度自适应
      },
      swiperImg: [
        { pic: require('@/assets/images/img1.png') },
        { pic: require('@/assets/images/img2.png') },
        { pic: require('@/assets/images/img3.png') }
      ],
    }
  },

}
</script>

<style lang="less" scoped>
.swiper-slide {
  width: 100%;
  height: 579px;

  img {
    width: 100%;
    height: 100%;
    min-height: 310px;
    transform: scale(1);
    transition: ease all 1.8s;
    object-fit: cover;
  }
}
</style>