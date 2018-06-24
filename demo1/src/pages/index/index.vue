<template>
  <div class="container">
    <slider-nav :menuWidth="60" :currentTab.sync="currentTab" :navList="this.navList"></slider-nav>
    <swiper :current="currentTab" :style="'height:'+contentHeight" class="swiper-box" duration="300" @change="swiperChange">
      <swiper-item v-for="(item,index) in navList" :key="index">
        <content-v v-if="index===currentTab" :currentTab="item"></content-v>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import sliderNav from '@/components/SliderNav'
  import content from '@/components/Content';
  import wxp from 'minapp-api-promise';
  import {
    navList
  } from '@/utils'
  export default {
    data() {
      return {
        navList: navList,
        currentTab: 0,
        winWidth: 0,
        winHeight: 0
      };
    },
    components: {
      sliderNav,
      contentV: content
    },
    async onLoad() {
      let info = await wxp.getSystemInfo();
      this.winWidth = info.windowWidth;
      this.winHeight = info.windowHeight
    },
    computed: {
      contentHeight() {
        return this.winHeight - 62 + 'px'
      }
    },
    methods: {
      swiperChange(e) {
        let {
          current
        } = e.target;
        this.currentTab = current;
      }
    },

    async onLoad() {
      let info = await wxp.getSystemInfo();
      this.winWidth = info.windowWidth;
      this.winHeight = info.windowHeight
    }
  };

</script>

<style scoped lang='scss'>
  .container {
    height: 100%;
    background: #fff;
    .swiper-box {
      display: block;
      width: 100%;
      overflow: hidden;
      swiper-item {
        height: 100%;
        
      }
    }
  }

</style>
