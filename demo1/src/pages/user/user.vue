<style scoped lang="scss">
  .user-wrap {
    height: 100%;
    .user-head-wrap {
      transition: height $time;
      overflow: hidden;
      text-align: center;
      height: 220px;
      background-size: 100%;
      background-image: url("http://s3.music.126.net/m/s/img/hot_music_bg_2x.jpg");
      .avatar {
        width: 90px;
        margin: 20px auto 0;
      }
      .name-wrap {
        color: #ffffff;
        .name {
          font-size: 18px;
          margin-top: 8px;
        }
        .link {
          margin-top: 8px;
          text-decoration: underline;
          color: #999999;
        }
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        color: #ffffff;
        margin-top: 10px;
        font-size: 14px;
        span:last-child {
          color: $light-color;
        }
      }
    }
  }

</style>

<template>
  <div class="user-wrap">
    <div class="user-head-wrap" :style="'height:'+height+'px'">
      <div class="avatar">
        <avatar v-if="author" :user="author" :size="90"></avatar>
      </div>
      <div class="name-wrap" v-if="user">
        <div class="name">
          {{user.loginname}}
        </div>
        <div class="link">
          {{user.githubUsername}}@github.com
        </div>
      </div>
      <div class="info" v-if="user">
        <span>注册时间：{{user.create_at}}</span>
        <span>积分：{{user.score}}</span>
      </div>
    </div>
    <slider-nav :navList="navList" :currentTab.sync="currentTab"></slider-nav>
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="swiperChange" :style="'height:'+contentHeight">
      <swiper-item v-for="(item,index) in navList" :key="index">
        <scroll-view scroll-y style="height:100%;" @scroll="scrollFn" @scrolltoupper="toUp" v-if="articleList.length">
          <simple-article v-for="(item,i) in articleList" :article="item" :key="i"></simple-article>
        </scroll-view>
        <p v-else style="text-align:center">暂无数据</p>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  const navList = [{
      title: "最近回复",
      type: "reply"
    },
    {
      title: "最新发布",
      type: "topic"
    },
    {
      title: "话题收藏",
      type: "collect"
    }
  ];
  import fly from "@/api";
  import TypeBlock from "@/components/TypeBlock";
  import avatar from "@/components/Avatar";
  import wxp from "minapp-api-promise";
  import SliderNav from "@/components/SliderNav";
  import SimpleArticle from "@/components/SimpleArticle";
  import {
    pick
  } from "@/utils";

  export default {
    data() {
      return {
        height: 220,
        currentTab: 0,
        user: null,
        articleList: [],
        author: null,
        navList: navList,
        winHeight: null
      };
    },
    props: {},
    components: {
      TypeBlock,
      avatar,
      SliderNav,
      SimpleArticle
    },
    computed: {
      contentHeight() {
        if (this.winHeight) {
          return this.winHeight - 44 - this.height + "px";
        }
      }
    },
    watch: {
      currentTab(newVal, oldVal) {
        switch (newVal) {
          case 0:
            this.articleList = this.user.recent_replies;
            break;
          case 1:
            this.articleList = this.user.recent_topics;
            break
          default:
            this.getUserCollect()
        }
      }
    },
    async onLoad() {
      const info = await wxp.getSystemInfo();
      this.winHeight = info.windowHeight;
      this.userId = this.$root.$mp.query.id;
      wx.showLoading({
        title: "加载中"
      });
      this.height = 220;
      this.currentTab = 0;
      this.getUserInfo(this.userId);
      wx.hideLoading();
    },
    methods: {
      async getUserCollect() {
        wx.showLoading({
          title: '加载中...'
        })
        try {
          let res = await fly.get('/topic_collect/' + this.userId)
          if (res.success && res.data && res.data.length) {
            this.articleList = res.data.map(item => {
              item.author = pick(this.user, ['loginname', 'avatar_url'])
              return pick(item, ['title', 'id', 'last_reply_at', 'author'])
            })
            console.log(articleList);

          }
        } catch (err) {
          console.log(err);
        }
        wx.hideLoading()
      },
      async getUserInfo(id) {
        let res;
        try {
          res = await fly.get("user/" + id);
        } catch (err) {
          console.log(err);
        }
        if (res.success) {
          let {
            create_at
          } = res.data;
          create_at = this.fromNow(create_at);
          this.user = Object.assign(res.data, {
            create_at
          });
          console.log(this.user);
        }
        this.articleList = this.user.recent_replies;
        this.author = pick(this.user, ['loginname', "avatar_url"]);
      },
      swiperChange(e) {
        let {
          current
        } = e.target;
        this.currentTab = current;
      },
      scrollFn(e) {
        let top = e.mp.detail.scrollTop;
        if (top > 60) {
          this.height = 0;
        }
      },
      toUp() {
        this.height = 220
      }
    }
  };

</script>
